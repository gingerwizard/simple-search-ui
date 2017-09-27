
var axios = require('axios');


function search(query){

  var filterString = query.get('filters').reduce(function(filterString,filter){
    return filterString + "&filters="+filter.field + ":" + filter.value;
  },"") || "";

  var encodedURI = window.encodeURI('/api/search?query='+query.get('text')+'&from='+query.get('from')+'&sort='+query.get('sort')+filterString);

  return axios.get(encodedURI).then(function(response){
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
