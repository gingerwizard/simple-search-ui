var React = require('react');
var ValueListing = require('./ValueListing')
var NumericRange = require('./NumericRange')
var Histogram = require('./Histogram')
var PropTypes = require('prop-types');
var { List, Map } = require('immutable');
import {
  KuiPanel,
} from '../../ui_framework/components';
import _ from 'lodash';

function FacetFilters (props) {

  //TODO: Right now we dont use props.filters - we might if we have  a multi select facet
  return (
    <div className="filters">
      {
        props.facets.entrySeq().toArray().sort((a, b) => a[1].get('order') > b[1].get('order') ).map(function(facet){
          switch(facet[1].get('type')){
            case 'value_listing': {                //needs a query from the frontend
                return (
                  <KuiPanel key={facet[0]} className="filter-box">
                      <ValueListing facet_id={facet[0]} facet_filter={facet[1]} onClick={props.onFilterApply}/>
                  </KuiPanel>
                )
              break;
            }
            case 'numeric_range': {
              return (
                <KuiPanel key={facet[0]} className="filter-box">
                    <NumericRange value={ props.filters.has(facet[0]) ? props.filters.get(facet[0]).values : [facet[1].get('min'),facet[1].get('max')] }
                    is_filtered={props.filters.has(facet[0])} facet_id={facet[0]} facet_filter={facet[1]} onSlideChange={props.onFilterApply}
                    onSlideReset={props.onFilterRemove}/>
                </KuiPanel>
              )
              break;
            }
            case 'date_histogram':
            case 'numeric_histogram': {
                return (
                  <KuiPanel key={facet[0]} className="filter-box">
                    <Histogram onSelectRange={props.onFilterApply} facet_id={facet[0]} facet_filter={facet[1]}/>
                  </KuiPanel>
                )
            }
          }
      }
    )}

    </div>

  )
}


FacetFilters.propTypes = {
  facets: PropTypes.object.isRequired,
  filters: PropTypes.object,
  onFilterApply: PropTypes.func.isRequired,
  onFilterRemove: PropTypes.func.isRequired,
};


FacetFilters.defaultProps = {
  facets: Map({}),
  filters: Map()
}


module.exports = FacetFilters;
