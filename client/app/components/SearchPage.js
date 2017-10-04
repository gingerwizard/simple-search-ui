var React = require('react');

var SearchBox = require('./search/SearchBox')
var FacetFilters = require('./facet_filters/FacetFilters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')
var SearchManager = require('../core/SearchManager')
var { List, Map } = require('immutable');
var Immutable = require('immutable');
import _ from 'lodash';


class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: Map ({
        text:null,
        sort:'relevance',
        filters: Map(),
        currentPage: 0,
        results_per_page: 12
      }),
      results: List(),
      pageCount: 0,
      numHits: 0,
      facets: List(),
      config: Map(),
      isReady: false
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFilterApply = this.handleFilterApply.bind(this);
    this.handleFilterRemove = this.handleFilterRemove.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleQueryChange(query){
    //reset paging as well
    var newState = this.state.query.set('text',query).set('currentPage',0);
    this.handleSearch(newState);
  }

  handleSortChange(sort_id){
    return new Promise(function(resolve, reject){
      this.handleSearch(this.state.query.set('sort',sort_id));
      resolve();
    }.bind(this));
  }

  handleFilterApply(facet_filter,update_query=true){
    if (update_query) {
      //reset paging as well
      this.handleSearch(this.state.query.setIn(['filters',facet_filter.id],facet_filter).set('currentPage',0));
    } else {
      //just adds the filter but doesn't update the query
      this.setState(function(state){
        state.query = this.state.query.setIn(['filters',facet_filter.id],facet_filter);
        return state;
      });
    }
  }

  handleFilterRemove(filter_id){
    //we also reset paging - maybe not desired
    this.handleSearch(this.state.query.deleteIn(['filters',filter_id]).set('currentPage',0));
  }

  handlePageChange(page) {
    this.handleSearch(this.state.query.set('currentPage',page))
  }

  handleSearch(query) {
    SearchManager.search(query).then(function(response){
      this.setState(function(state) {
        state.query = query;
        state.numHits = response.numHits;
        state.results = Immutable.fromJS(response.results);
        state.facets = Immutable.fromJS(response.facets);
        let num_pages = Math.ceil(response.numHits/state.query.get('results_per_page'));
        state.pageCount = num_pages <= state.config.get('max_page') ? num_pages : state.config.get('max_page');
        return state;
      });
    }.bind(this));
  }

  componentDidMount() {
    SearchManager.config().then(function(response){
      this.setState(function(state){
        state.config = Immutable.fromJS(response);
        state.query.set('results_per_page',state.config.get('default_results_per_page'));
        state.isReady = true;
        return state;
      });
    }.bind(this));
  }

  render () {
    if (this.state.isReady) {
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
              <FacetFilters facets={this.state.config.get('facets')} facetValues={this.state.facets} filters={this.state.query.get('filters')} onFilterApply={this.handleFilterApply} onFilterRemove={this.handleFilterRemove}/>
          </div>
            <div className="center-panel">
              <Results defaultSort={this.state.config.get('default_sort')} sortOptions={this.state.config.get('sort_options')} results={this.state.results} pageCount={this.state.pageCount} query={this.state.query} numHits={this.state.numHits} onPageChange={this.handlePageChange} onSortChange={this.handleSortChange} removeFilter={this.handleFilterRemove}/>
            </div>
            <div className="right-panel">
              <div className="App">
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (<div></div>)
    }
  }
}

module.exports = SearchPage;
