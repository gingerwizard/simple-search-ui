var React = require('react');

var SearchBox = require('./search/SearchBox')
var Filters = require('./filters/Filters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')
var SearchManager = require('../core/SearchManager')

class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      results: [
      ],
      numHits: 0
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    SearchManager.search({query:query}).then(function(results){
      this.setState(function() {
        var newState = {};
        newState['query'] = query;
        newState['numHits'] = results.numHits;
        newState['results'] = results.results
        return newState;
      });
    }.bind(this));
  }

  render () {
    return (
      <div>
        <div className="nav-bar">
        </div>
        <div className="nav-bar-contents">
          <div className="app-label-left"/>
          <div className="search-box">
            <SearchBox onSubmit={this.handleSearch}/>
          </div>
          <div className="app-label-right"/>
        </div>
        <div className="main-panel">
          <div className="left-panel">
            <Filters/>
          </div>
          <div className="center-panel">
            <Results results={this.state}/>
          </div>
          <div className="right-panel">
            <div className="App">
            </div>
          </div>
        </div>
      </div>


    )
  }
}

module.exports = SearchPage;
