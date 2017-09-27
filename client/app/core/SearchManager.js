
var axios = require('axios');


function execute(query){

  var filterString = query.get('filters').reduce(function(filterString,filter){
    return filterString + "&filters="+filter.field + ":" + filter.value;
  },"") || "";

  var encodedURI = window.encodeURI('/api/search?query='+query.get('text')+'&from='+query.get('from')+'&sort='+query.get('sort')+filterString);

  return axios.get(encodedURI).then(function(response){
    return response.data;
  });
}


const SearchManager = { search : execute };
module.exports = SearchManager;
