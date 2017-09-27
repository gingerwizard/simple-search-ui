var React = require('react');
var TermFilter = require('./TermFilter')
var PropTypes = require('prop-types');
var { List } = require('immutable');

function FacetFilters (props) {

  //TODO: Right now we dont use props.filters - we might if we have  a multi select facet
  let facets = props.facets;

  return (
    <div className="filters">
      {Object.keys(facets).map(function(key){
          return (
            <div key={key} className="filter-box">
                <TermFilter facet_filter={facets[key]} onClick={props.onFilterApply}/>
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
  facets: PropTypes.object,
  filters: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
};


FacetFilters.defaultProps = {
  facets: {},
  filters: List()
}


module.exports = FacetFilters;
