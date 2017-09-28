var React = require('react');

var SearchBox = require('./search/SearchBox')
var FacetFilters = require('./facet_filters/FacetFilters')
//var Relevancy = require('./filters/Relevancy')
var Results = require('./results/Results')
var SearchManager = require('../core/SearchManager')
var { List, Map } = require('immutable');
var Immutable = require('immutable');

class SearchPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      query: Map ({
        text:null,
        sort:'relevance',
        filters: List(),
        currentPage: 0,
        results_per_page: 12
      }),
      results: List(),
      pageCount: 0,
      numHits: 0,
      facets: List(),
      config: Map({
        'sort_options':Map({
          'relevance':Map({
            'label':'Relevance',
            'field':'_score',
            'order':'desc'
          })
        }),
        'default_sort':'relevance'
      })
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

  handleFilterApply(type,facet_filter){
    //TODO: Ignoring type here - willl need to handle in future
    //reset paging as well
    this.handleSearch(this.state.query.set('filters',this.state.query.get('filters').push(facet_filter)).set('currentPage',0));
  }

  handleFilterRemove(field,value){
    var new_filters = this.state.query.get('filters').filter(function(filter){
      return filter.field != field || filter.value != value;
    });
    //we also reset paging - maybe not desired
    this.handleSearch(this.state.query.set('filters',new_filters).set('currentPage',0));
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
        state.pageCount = Math.ceil(response.numHits/state.query.get('results_per_page'));
        return state;
      });
    }.bind(this));
  }

  componentDidMount() {
    SearchManager.config().then(function(response){
      this.setState(function(state){
        state.config = Immutable.fromJS(response);
        state.query.set('results_per_page',state.config.get('default_results_per_page'));
        return state;
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
            <Results defaultSort={this.state.config.get('default_sort')} sortOptions={this.state.config.get('sort_options')} results={this.state.results} pageCount={this.state.pageCount} query={this.state.query} numHits={this.state.numHits} onPageChange={this.handlePageChange} onSortChange={this.handleSortChange} removeFilter={this.handleFilterRemove}/>
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
