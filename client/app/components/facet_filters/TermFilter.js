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
          {this.props.facet_filter.get('label')}
        </KuiSideNavTitle>
        { this.props.facet_filter.get('values').map(function(value,i){
            var unique_id = this.props.facet_id+'-'+value.get('key');
            return (
              <KuiSideNavItem key={value.get('key')}>
                <button onClick={() => this.props.onClick({id:unique_id,type:this.FACET_FILTER_TYPE,label:this.props.facet_filter.get('label'),field:this.props.facet_filter.get('field'),values:[value.get('key')]})}>
                  {value.get('key')}
                  <KuiBadge className="term_filter" type="default">
                    {value.get('count')}
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
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object,
  onClick: PropTypes.func.isRequired,
};


module.exports = TermFilter;
