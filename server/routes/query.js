var express = require('express');
var router = express.Router();
var SearchManager = require('../SearchManager')
var validate = require('express-jsonschema').validate;
const sort_options = ['relevance','oldest','newest']
const default_sort = 'relevance'

const config = SearchManager.config()
var _ = require('lodash');


const query_schema = {
  type: 'object',
  properties: {
    query: { type: 'string',required: true },
    sort: { type: 'string', enum: Object.keys(config['sort_options']) },
    currentPage: { type: 'integer', minimum: 0, maximum: config['max_page']},
    results_per_page: { type: 'integer', minimum: 0, maximum: config['max_results_per_page'] },
    filters: {  type: 'array', 'items': {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            required: true
          },
          value: {
            type: 'string',
            required: true
          }
        }
      }
    }
  }
};


/* Search ES */
router.post('/',validate({body: query_schema}),function(req, res, next) {
  var sort_details = req.body.sort ? config['sort_options'][req.body.sort] : config['sort_options'][config['default_sort']]
  var results_per_page = req.body.results_per_page ? req.body.results_per_page: config['default_results_per_page']
  var params = {
      "query_string": req.body.query,
      "size": results_per_page,
      "sort_field": sort_details.field,
      "sort_order": sort_details.order,
      "from": req.body.currentPage ? req.body.currentPage * results_per_page : 0,
      "filters": req.body.filters ? req.body.filters.map(function(filter,_){
        return {
          "term": {
            [filter.field]:filter.value
          }
        }
      }): [],
      "facets": _.mapValues(config['facets'],function(facet){ return {"terms":{"field":facet.field,"size":facet.size}}})
  }
  //TODO: we could cache the facets later maybe. Generating them each time seems unneccesary
  //TODO: Currently filters and facets don't respect the type - they will need to
  SearchManager.search(config['query_template'],params).then(function(resp){
    //console.log(JSON.stringify(resp.hits.hits))
    res.json({
      "numHits":resp.hits.total,
      "facets": _.transform(resp.aggregations, function(result, value, key){
        result[key] = {
          "field":config['facets'][key].field,
          "type":"string_drilldown",
          "label":config['facets'][key].label,
          "values":value.buckets.map(function(value){
            return {
              "key":value.key,
              "count":value.doc_count
            }
          })
        }
      },{}),
      "results": resp.hits.hits.map(function(hit){
        return {
          "id":hit._source[config['id_field']],
          "title":hit._source[config['title_field']],
          "img":hit._source[config['img_field']],
          "description":hit._source[config['description_field']]
        }
      })
    })
  });
});

module.exports = router;
