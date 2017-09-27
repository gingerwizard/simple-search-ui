var express = require('express');
var router = express.Router();
var SearchManager = require('../SearchManager')
var validate = require('express-jsonschema').validate;
const sort_options = ['relevance','oldest','newest']
const default_sort = 'relevance'

const config = SearchManager.config()

const query_schema = {
  type: 'object',
  properties: {
    query: { type: 'string',required: true },
    sort: { type: 'string', enum: Object.keys(config['sort_options']) },
    from: { type: 'integer'},
    filters: {  type: 'array', 'items': {
        type: 'object',
        properties: {
          field: {
            type: 'string',
            required: true,
            enum: Object.keys(config['facets'])
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
  console.log(req.body)
  var sort_details = req.body.sort ? config['sort_options'][req.body.sort] : config['sort_options'][config['default_sort']]
  var filters = req.body.filters ? req.body.filters.map(function(filter,_){
    return {
      "term": {
        [filter.field]:filter.value
      }
    }
  }): [];
  var params = {
      "query_string": req.body.query,
      "results_per_page": config["results_per_page"],
      "sort_field": sort_details.field,
      "sort_order": sort_details.order,
      "from": req.body.from ? req.body.from : 0,
      "filters": filters
  }
  SearchManager.search(config['query_template'],params).then(function(resp){
    //console.log(JSON.stringify(resp.hits.hits))
    res.json({
      "numHits":resp.hits.total,
      "results": resp.hits.hits.map(function(hit){
        return {
          "id":1,
          "title":"Rocky 1",
          "img":"",
          "description":""
        }
      })
    })
  });
});

module.exports = router;
