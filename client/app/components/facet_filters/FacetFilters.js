var React = require('react');
var TermFilter = require('./TermFilter')
var RangeFilter = require('./RangeFilter')
var PropTypes = require('prop-types');
var { List, Map } = require('immutable');


function FacetFilters (props) {


  //TODO: Right now we dont use props.filters - we might if we have  a multi select facet
  return (
    <div className="filters">
      {
        props.facets.entrySeq().map(function(facet,key){
          switch(facet[1].get('type')){
            case 'string_drilldown': {
              if (props.facetValues.get(facet[0])) {
                //needs a query from the frontend
                return (
                  <div key={facet[0]} className="filter-box">
                      <TermFilter facet_filter={props.facetValues.get(facet[0])} onClick={props.onFilterApply}/>
                  </div>
                )
              }
              break;
            }
            case 'range_drilldown': {
              return (
                <div key={facet[0]} className="filter-box">
                    <RangeFilter facet_filter={facet[1]} onSlideChange={props.onFilterApply}/>
                </div>
              )
              break;
            }
          }
      }
    )}

    </div>

  )
}


FacetFilters.propTypes = {
  facets: PropTypes.object.isRequired,
  facetValues: PropTypes.object.isRequired,
  filters: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
};


FacetFilters.defaultProps = {
  facets: Map({}),
  facetValues: Map({}),
  filters: List()
}


module.exports = FacetFilters;
