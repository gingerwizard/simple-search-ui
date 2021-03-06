var express = require('express');
var router = express.Router();
var SearchManager = require('../SearchManager')
var validate = require('express-jsonschema').validate;
var clone = require('clone');
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
          values: {
            type: 'array',
            required: true,
            'minItems': 1
          },
          type: {
            type: 'string',
            required: true,
            enum: ['value_listing','numeric_range','numeric_histogram','date_histogram','correlation_matrix']
          }
        }
      }
    }
  }
};

function buildFilter(filter){
  switch(filter.type){
    case 'value_listing':
      return {
        'term': {
          [filter.field]:filter.values[0]
        }
      }
    default:
      var range_filter = {
        'gte':filter.values[0]
      }
      if (filter.values.length > 1 && filter.values[1]) {
        range_filter['lte'] = filter.values[1]
      }
      return {
        'range': {
          [filter.field]:range_filter
        }
      }
    }
}

function buildFacet(facet){
  switch(facet.type){
    case 'value_listing':
      return {
        'terms':{
          'field':facet.field,
          'size':facet.size
        }
      }
    case 'numeric_histogram':
      return {
        'histogram':{
          'field': facet.field,
          'interval': facet.interval
        }
      }
    case 'numeric_range':
      return {
        'stats':{
          'field':facet.field
        }
      }
    case 'date_histogram':
      return {
        'date_histogram':{
          'field':facet.field,
          'interval': facet.interval
        }
      }
    case 'correlation_matrix':
      return {
        'terms':{
          'field':facet.x_field,
          'size':facet.x_size ? facet.x_size : facet.size
        },
        'aggs':{
            'y_axis':{
              [facet.use_signficance ? 'significant_terms' : 'terms']:{
                'field':facet.y_field,
                'size':facet.y_size ? facet.y_size : facet.size
              }
            }
        }
      }
    }
}


function parseFacetResponse(config,key,values){
  let type = config['type'];
  switch(type){
    case 'numeric_range':
      return {
          //TODO: This needs to check if the min or max should be used or
      }
    case 'numeric_histogram':
    case 'date_histogram':
      return {
        'values':values.buckets.map(function(value,i){
          let upper_bound = i+1 < values.buckets.length ? values.buckets[i+1] : null;
          return {
            'upper_key': upper_bound ? upper_bound.key : null,
            'upper_label': upper_bound ? (upper_bound.key_as_string ? upper_bound.key_as_string : upper_bound.key.toString()): null,
            'lower_label': value.key_as_string ? value.key_as_string : value.key.toString(),
            'lower_key':value.key,
            'count':value.doc_count
          }
        })
      }
    case 'correlation_matrix':
      //collect all the keys
      var inner_keys = values.buckets.reduce(function(current,value){
        value.y_axis.buckets.forEach(function(sub_val){ current[sub_val.key] = current[sub_val.key] != null ? current[sub_val.key] + 1 : 1; });
        return current;
      },{});
      console.log(inner_keys)
      //take the Top N most commonly occuring keys
      inner_keys = Object.keys(inner_keys).sort(function(a, b) { return inner_keys[b] - inner_keys[a] }).slice(0,config['y_axis'] ? config['y_axis'] : config['size']);
      console.log(inner_keys)
      //expand into a base response
      var inner_buckets = inner_keys.map(function(value,_){ return { 'key':value, 'count':0 }});
      return {
        'values':values.buckets.map(function(value,_){
          //not the most efficient
          let values = clone(inner_buckets);
          console.log(values)
          value.y_axis.buckets.forEach(function(sub_value,_){
            console.log(sub_value.doc_count)
            let p = inner_keys.indexOf(sub_value.key);
            if (p >= 0){
              values[p]['count'] = sub_value.doc_count;
            }
          })
          console.log(values)

          return {
            'key':value.key,
            'count':value.doc_count,
            'values':values
          }
        })
      }
    default:
      return {
        'values':values.buckets.map(function(value){
          return {
            'key':value.key,
            'count':value.doc_count
          }
        })
      }
  }
}


/* Search ES */
router.post('/',validate({body: query_schema}),function(req, res, next) {
  var sort_details = req.body.sort ? config['sort_options'][req.body.sort] : config['sort_options'][config['default_sort']]
  var results_per_page = req.body.results_per_page ? req.body.results_per_page: config['default_results_per_page']
  var params = {
      'query_string': req.body.query,
      'size': results_per_page,
      'sort_field': sort_details.field,
      'sort_order': sort_details.order,
      'from': req.body.currentPage ? req.body.currentPage * results_per_page : 0,
      'filters': req.body.filters ? req.body.filters.map(function(filter,_){
          return buildFilter(filter)
      }): [],
      'facets': _.mapValues(config['facets'],function(facet){
          return buildFacet(facet);})

  }
  console.log(JSON.stringify(params))
  //TODO: we could cache the facets later maybe. Generating them each time seems unneccesary
  //TODO: Currently filters and facets don't respect the type - they will need to
  SearchManager.search(config['query_template'],params).then(function(resp){
    //console.log(JSON.stringify(resp))
    res.json({
      'numHits':resp.hits.total,
      'facets': _.transform(resp.aggregations, function(result, value, key){
        result[key] = Object.assign({}, config['facets'][key], parseFacetResponse(config['facets'][key],key,value))
      },{}),
      'results': resp.hits.hits.map(function(hit){
        return {
          'id':hit._source[config['id_field']],
          'title':hit._source[config['title_field']],
          'img':hit._source[config['img_field']],
          'description':hit._source[config['description_field']]
        }
      })
    })
  }).catch (function(error){
    console.error(error);
  });
});

module.exports = router;
