
var axios = require('axios');


function execute(query){

  var filterString = query.filters.reduce(function(filterString,filter){
    return filterString + "&filters="+filter.field + ":" + filter.value;
  },"") || "";

  var encodedURI = window.encodeURI('/api/search?query='+query.query+'&sort='+query.sort+filterString);

  return axios.get(encodedURI).then(function(response){
    return response.data;
  });
}


const SearchManager = { search : execute };
module.exports = SearchManager;
