var React = require('react');

var SearchBox = require('./search/SearchBox')
var Filters = require('./filters/Filters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')


class SearchPage extends React.Component {
  render () {
    return (
      <div>
        <div className="nav-bar">

        </div>
        <div className="nav-bar-contents">
          <div className="app-label-left"/>
          <div className="search-box">
            <SearchBox/>
          </div>
          <div className="app-label-right"/>
        </div>
        <div className="main-panel">
          <div className="left-panel">
            <Filters/>
          </div>
          <div className="center-panel">
            <Results/>
          </div>
          <div className="right-panel">
          </div>
        </div>
      </div>


    )
  }
}

module.exports = SearchPage;
