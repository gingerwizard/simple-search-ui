var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiBadge,
  KuiFlexGroup,
  KuiFlexItem,
  KuiText
} from '../../ui_framework/components';


function FilterBar (props) {
  return (
    <div className="filter-bar">
    {
      props.filters.entrySeq().map(function(filter,key){
        return (
          <div key={filter[0]} className="filter">
            <KuiBadge iconType="cross" size="medium" className="filter-button" onClick={() => props.removeFilter(filter[0])}>
              <KuiText>
                <span className="filter-label">{filter[1].label}:</span> {filter[1].values.length > 1 ? filter[1].values[0]+'-'+filter[1].values[1] : filter[1].values[0] }
              </KuiText>
            </KuiBadge>
          </div>
        )
      })
    }
    </div>
  )
}

FilterBar.propTypes = {
  filters: PropTypes.object.isRequired,
  removeFilter: PropTypes.func.isRequired,
};

module.exports = FilterBar;
