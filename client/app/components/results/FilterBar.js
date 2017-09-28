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
      props.filters.map(function(filter){
        return (
          <div key={filter.field +'-'+ filter.value} className="filter">
            <KuiBadge iconType="cross" size="medium" className="filter-button" onClick={() => props.onClick(filter.field,filter.value)}>
              <KuiText>
                <span className="filter-label">{filter.label}:</span> {filter.values.length > 1 ? filter.values[0]+'-'+filter.values[1] : filter.values[0] }
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
  onClick: PropTypes.func.isRequired,
};

module.exports = FilterBar;
