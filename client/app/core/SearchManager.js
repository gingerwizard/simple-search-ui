var axios = require('axios');

function search(query){
  return axios.post('/api/search',{
    query: query.get('text'),
    sort: query.get('sort'),
    from: query.get('from'),
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
