var React = require('react');

var SearchBox = require('./search/SearchBox')
var Filters = require('./filters/Filters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')


class SearchPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: null,
      results: [

      ]
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(query) {
    this.setState(function() {
      var newState = {};
      //TODO: get results from ES
      newState['query'] = query;
      newState['results'] = [
        {
          'title':'Rocky 1',
          'img':'',
          'body': 'Some text about the rocky film. Rocky is an entertaining but probably not a very good film.'
        },
        {
          'title':'Rocky 2',
          'img':'',
          'body': 'Some text about the rocky film. Rocky is an entertaining but probably not a very good film.'
        },
        {
          'title':'Rocky 3',
          'img':'',
          'body': 'Some text about the rocky film. Rocky is an entertaining but probably not a very good film.'
        },
        {
          'title':'Rocky 4',
          'img':'',
          'body': 'Some text about the rocky film. Rocky is an entertaining but probably not a very good film.'
        }
      ]
      return newState;
    });

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
            <Results/>
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
