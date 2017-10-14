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
        "director":{
          "field": "director",
          "type": "value_listing",
          "label": "Directors",
          "size":10,
          "order":3
        },
        "actors":{
          "field": "actors",
          "type": "value_listing",
          "label": "Actors",
          "size":10,
          "order":4
        },
        "genre":{
          "field": "genre",
          "type": "value_listing",
          "label": "Genres",
          "size":10,
          "order":5
        },
        "metascore":{
          "field": "metascore",
          "type": "numeric_range",
          "label": "Metascore",
          "min":0,
          "max":100,
          "step":1,
          "order":0
        },
        "imdbvotes": {
          "field": "imdbvotes",
          "type": "numeric_histogram",
          "label": "Number of IMDB Votes",
          "interval": 100,
          "order":1
        },
        "year_released": {
          "field": "year",
          "type": "date_histogram",
          "label": "Year Released",
          "interval": "year",
          "order":1
        },
        "country_genre": {
          "type":"correlation_matrix",
          "x_field": "genre",
          "y_field": "country",
          "label": "Country vs Genre",
          "use_signficance": false,
          "x_size": 12,
          "size": 10
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
