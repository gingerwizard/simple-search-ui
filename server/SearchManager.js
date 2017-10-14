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
      "default_sort": "relevance",
      "relevance_controls":{
          "operator":{
            "order":0,
            "label":"Query Operator",
            "type":"drop_down",
            "values":[
              {
                "value":"and",
                "text":"AND"
              },
              {
                "value":"or",
                "text":"OR"
              },
              {
                "value":"phrase",
                "text":"Phrase"
              }
            ]
          },
          "min_should_match":{
            "order":1,
            "label":"Min Should Match",
            "type":"slider",
            "min":0,
            "max":100,
            "step":1,
            "default":100
          },
          "year_boost":{
            "order":2,
            "label":"Recency Weight",
            "type":"counter",
            "min":0,
            "max":10,
            "default":1
          },
          "rating_weight":{
            "order":3,
            "label":"Rating Weight",
            "type":"counter",
            "min":0,
            "max":10,
            "default":1
          },
          "score_mode":{
            "order":4,
            "label":"Score Mode",
            "type":"drop_down",
            "values":[
              {
                "value":"sum",
                "text":"Sum"
              },
              {
                "value":"max",
                "text":"Max"
              },
              {
                "value":"min",
                "text":"Min"
              },
              {
                "value":"avg",
                "text":"Average"
              },
              {
                "value":"multiply",
                "text":"Multiply"
              },
              {
                "value":"replace",
                "text":"Replace"
              }
            ]
          },
          "fields":{
            "order":1,
            "type":"check_group",
            "include_counter": true,
            "label":"Fields to Search",
            "values":[
              {
                "id":"title",
                "label":"title"
              },
              {
                "id":"description",
                "label":"description"
              },
              {
                "id":"actors",
                "label":"actors"
              },
              {
                "id":"directors",
                "label":"directors"
              },
              {
                "id":"genre",
                "label":"genre"
              }
            ]
          },
          "random":{
            "type":"switch",
            "label":"Enable Random",
            "default":false,
            "order":6
          }

      }
  }
}

const SearchManager = { search : search, config : config };
module.exports = SearchManager;
