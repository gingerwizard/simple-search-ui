var React = require('react');

var SearchBox = require('./search/SearchBox')
var FacetFilters = require('./facet_filters/FacetFilters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')
var SearchManager = require('../core/SearchManager')
var { List, Map } = require('immutable');

const HITS_PER_PAGE = 10;
class SearchPage extends React.Component {



  constructor(props) {
    super(props);

    this.state = {
      query: Map ({
        text:null,
        sort:'Relevance',
        filters: List(),
        from: 0
      }),
      results: [
      ],
      numHits: 0,
      pageCount: 10,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFilterApply = this.handleFilterApply.bind(this);
    this.handleFilterRemove = this.handleFilterRemove.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleQueryChange(query){
    this.handleSearch(this.state.query.set('text',query));
  }

  handleSortChange(sort_id){
    return new Promise(function(resolve, reject){
      this.handleSearch(this.state.query.set('sort',sort_id));
      resolve();
    }.bind(this));
  }

  handleFilterApply(type,facet_filter){
    //TODO: Ignoring type here - willl need to handle in future
    this.handleSearch(this.state.query.set('filters',this.state.query.get('filters').push(facet_filter)));
  }

  handleFilterRemove(field,value){
    var new_filters = this.state.query.get('filters').filter(function(filter){
      return filter.field != field || filter.value != value;
    });
    this.handleSearch(this.state.query.set('filters',new_filters));
  }

  handlePageChange(page) {
    this.handleSearch(this.state.query.set('from',HITS_PER_PAGE*page))
  }

  handleSearch(query) {
    SearchManager.search(query).then(function(results){
      this.setState(function() {
        var newState = {};
        newState['query'] = query;
        newState['numHits'] = results.numHits;
        newState['results'] = results.results;
        newState['facets'] = results.facets;
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
            <SearchBox onSubmit={this.handleQueryChange}/>
          </div>
          <div className="app-label-right"/>
        </div>
        <div className="main-panel">
          <div className="left-panel">
            <FacetFilters facets={this.state.facets} filters={this.state.query.get('filters')} onFilterApply={this.handleFilterApply}/>
          </div>
          <div className="center-panel">
            <Results results={this.state.results} pageCount={this.state.pageCount} query={this.state.query} numHits={this.state.numHits} onPageChange={this.handlePageChange} onSortChange={this.handleSortChange} removeFilter={this.handleFilterRemove}/>
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
