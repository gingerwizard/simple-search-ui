var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiSideNav,
  KuiSideNavItem,
  KuiSideNavTitle,
  KuiBadge,
} from '../../ui_framework/components';

class TermFilter extends React.Component {

  FACET_FILTER_TYPE = "string_drilldown";

  constructor(props) {
    super(props);

    this.state = {
      isOpen: true,
    };
  }

  toggleOpenOn() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    return (
      <KuiSideNav>
        <KuiSideNavTitle>
          {this.props.facet_filter.label}
        </KuiSideNavTitle>
        { this.props.facet_filter.values.map(function(value,i){
            return (
              <KuiSideNavItem key={value.value}>
                <button onClick={() => this.props.onClick(this.FACET_FILTER_TYPE,{label:this.props.facet_filter.label,field:this.props.facet_filter.field,value:value.value})}>
                  {value.value}
                  <KuiBadge className="term_filter" type="default">
                    {value.count}
                  </KuiBadge>
                </button>
              </KuiSideNavItem>
            )
        }.bind(this))}
      </KuiSideNav>

    )
  }
}

TermFilter.propTypes = {
  facet_filter: PropTypes.shape({
    label: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
  }),
  onClick: PropTypes.func.isRequired,
};


module.exports = TermFilter;
