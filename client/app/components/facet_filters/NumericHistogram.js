var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiSideNav,
  KuiSideNavItem,
  KuiSideNavTitle,
  KuiBadge,
} from '../../ui_framework/components';

class NumericHistogram extends React.Component {

  FACET_FILTER_TYPE = "numeric_range"

  constructor(props) {
    super(props);
    this.selectRange = this.selectRange.bind(this);
  }

  selectRange() {

  }

  render() {
    return (
      <KuiSideNav>
        <KuiSideNavTitle>
          {this.props.facet_filter.get('label')}
        </KuiSideNavTitle>
        <div className="date-histogram">
          {
              this.props.facet_filter.get('values').map(function(value,i){
              var unique_id = this.props.facet_id+'-'+value.get('key');
              return (
                <div key={i}/>
              )
          }.bind(this))}
        </div>
      </KuiSideNav>

    )
  }
}


NumericHistogram.propTypes = {
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object,
  onSelectRange: PropTypes.func.isRequired,
};

module.exports = NumericHistogram;
