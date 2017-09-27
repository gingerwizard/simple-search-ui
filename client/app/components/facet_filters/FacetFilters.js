var React = require('react');
var TermFilter = require('./TermFilter')
var PropTypes = require('prop-types');
var { List, Map } = require('immutable');

function FacetFilters (props) {
  //TODO: Right now we dont use props.filters - we might if we have  a multi select facet
  return (
    <div className="filters">
      {props.facets.entrySeq().map(function(facet,key){
          return (
            <div key={facet[0]} className="filter-box">
                <TermFilter facet_filter={facet[1]} onClick={props.onFilterApply}/>
            </div>
          )
      })}

    </div>

  )
}


FacetFilters.propTypes = {
  facets: PropTypes.object,
  filters: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
};


FacetFilters.defaultProps = {
  facets: Map({}),
  filters: List()
}


module.exports = FacetFilters;
