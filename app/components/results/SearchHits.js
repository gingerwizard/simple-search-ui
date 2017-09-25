var React = require('react');

var SearchHit = require('./SearchHit')
class SearchHits extends React.Component {

  render () {

    return (
      <div className="search-hits">
        <div className="search-hits-row">
          <SearchHit/>
          <SearchHit/>
          <SearchHit/>
        </div>
        <div className="search-hits-row">
          <SearchHit/>
          <SearchHit/>
          <SearchHit/>
        </div>
        <div className="search-hits-row">
          <SearchHit/>
          <SearchHit/>
          <SearchHit/>
        </div>
        <div className="search-hits-row">
          <SearchHit/>
          <SearchHit/>
          <SearchHit/>
        </div>
      </div>

    )
  }



}


module.exports = SearchHits;
