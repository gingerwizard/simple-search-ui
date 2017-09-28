var elasticsearch = require('elasticsearch');

const index = 'movies'
const doc_type = 'doc'

const elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'info',
    httpAuth: 'elastic:changeme',
    protocol: 'http',
    apiVersion: "5.5"
});


function search(template_id,params){
  return elasticClient.searchTemplate({
    index: index,
    type: doc_type,
    body: {
        "id": template_id,
        "params": params
    }
  })
}

//Returns app config from the .simple-search-config index
function config(){
  return {
      "default_results_per_page": 12,
      "max_results_per_page":100,
      "max_page":100,
      "id_field":"imdbid",
      "title_field":"title",
      "img_field":"poster",
      "description_field":"plot",
      "facets": {
        "writers":{
          "field": "writer",
          "type": "string_drilldown",
          "label": "Writers",
          "size":10
        },
        "actors":{
          "field": "actors",
          "type": "string_drilldown",
          "label": "Actors",
          "size":10
        },
        "genre":{
          "field": "genre",
          "type": "string_drilldown",
          "label": "Genres",
          "size":10
        },
        "metascore":{
          "field": "metascore",
          "type": "range_drilldown",
          "label": "Metascore",
          "min":0,
          "max":100,
          "step":1
        }
      },
      "query_template": "simple_search_ui",
      "sort_options": {
        "relevance":{
          "label":"Relevance",
          "field":"_score",
          "order":"desc"
        },
        "oldest":{
          "label":"Oldest",
          "field":"released",
          "order":"asc"
        },
        "newest":{
          "label":"Newest",
          "field":"released",
          "order":"desc"
        }
      },
      "default_sort": "relevance"
  }
}

const SearchManager = { search : search, config : config };
module.exports = SearchManager;
