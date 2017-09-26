var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiSideNav,
  KuiSideNavItem,
  KuiSideNavTitle,
  KuiBadge,
} from '../../ui_framework/components';

class TermFilter extends React.Component {

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
          {this.props.label}
        </KuiSideNavTitle>
        { this.props.values.map(function(value,i){
            return (
              <KuiSideNavItem key={value.value}>
                <button onClick={() => window.alert('Button clicked')}>
                  {value.value}
                  <KuiBadge className="term_filter" type="default">
                    {value.count}
                  </KuiBadge>
                </button>
              </KuiSideNavItem>
            )
        })}
      </KuiSideNav>

    )
  }
}


TermFilter.propTypes = {
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  values: PropTypes.array.isRequired
};

module.exports = TermFilter;
