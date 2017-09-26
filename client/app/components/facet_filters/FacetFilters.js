var React = require('react');
var TermFilter = require('./TermFilter')
var PropTypes = require('prop-types');
var { List } = require('immutable');

function FacetFilters (props) {

  //TODO: Right now we dont use props.filters - we might if we have  a multi select facet
  let facets = props.facets;

  return (
    <div className="filters">
      {facets.map(function(facet,i){
          return (
            <div key={facet.field} className="filter-box">
                <TermFilter facet_filter={facet} onClick={props.onFilterApply}/>
            </div>
          )
      })}
      <div className="filter-box">
      </div>
      <div className="filter-box">
      </div>

    </div>

  )
}


FacetFilters.propTypes = {
  facets: PropTypes.array,
  filters: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
};


FacetFilters.defaultProps = {
  facets: [],
  filters: List()
}


module.exports = FacetFilters;
