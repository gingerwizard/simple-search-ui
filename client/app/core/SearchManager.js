var axios = require('axios');

function search(query){
  return axios.post('/api/search',{
    query: query.get('text'),
    sort: query.get('sort'),
    currentPage: query.get('currentPage'),
    results_per_page: query.get('results_per_page'),
    filters: query.get('filters')
  }).then(function(response){
    return response.data;
  });
}

function config(){
  return axios.get('/api/config').then(function(response){
    return response.data;
  });
}

const SearchManager = { search : search, config : config };
module.exports = SearchManager;
