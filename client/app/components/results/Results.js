var React = require('react');
var PropTypes = require('prop-types');

var SearchHits = require('./SearchHits')
var ResultDetails = require('./ResultDetails')
var FilterBar = require('./FilterBar')
var Sort = require('../facet_filters/Sort')
var ResultPagination = require('./ResultPagination')
import {
  KuiFlexGroup,
  KuiFlexItem,
} from '../../ui_framework/components';


function Results (props) {
  return (
    <div>
      <KuiFlexGroup alignItems="center" className="results-top-bar">
        <KuiFlexItem grow={false}>
          <ResultDetails query={props.query.get('text')} numHits={props.numHits}/>
        </KuiFlexItem>
        <KuiFlexItem>
          <FilterBar filters={props.query.get('filters')} removeFilter={props.removeFilter}/>
        </KuiFlexItem>
        <KuiFlexItem grow={false}>
          <Sort defaultSort={props.defaultSort} onSortChange={props.onSortChange} sortOptions={props.sortOptions}/>
        </KuiFlexItem>
      </KuiFlexGroup>
      <KuiFlexGroup alignItems="center">
        <SearchHits results={props.results}/>
      </KuiFlexGroup>
      <ResultPagination onPageChange={props.onPageChange} pageCount={props.pageCount} currentPage={props.query.get('currentPage')}/>
    </div>
  )

}

Results.propTypes = {
  query: PropTypes.object.isRequired,
  pageCount: PropTypes.number.isRequired,
  results: PropTypes.object.isRequired,
  onSortChange: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  numHits: PropTypes.number.isRequired,
  sortOptions: PropTypes.object.isRequired,
  defaultSort: PropTypes.string.isRequired,
};

module.exports = Results;
