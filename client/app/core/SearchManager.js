
var axios = require('axios');

function execute(query){
  var encodedURI = window.encodeURI('/api/search?query='+query.query);
  return axios.get(encodedURI).then(function(response){
    return response.data;
  });
}


const SearchManager = { search : execute };
module.exports = SearchManager;
