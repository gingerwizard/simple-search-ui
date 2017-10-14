var React = require('react');
import { Input } from 'reactstrap';
var PropTypes = require('prop-types');
import {
  KuiFieldSearch,
  KuiForm,
  KuiFlexGroup,
  KuiFlexItem,
  KuiButton,
} from '../../ui_framework/components';

class SearchBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query : ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(
      this.state.query
    );
  }

  handleChange(event) {
    var value = event.target.value;
    this.setState(function () {
      return {
        query: value
      }
    });
  }

  render () {
    return (
      <form  onSubmit={this.handleSubmit}>
      <KuiFlexGroup className="search-form">
        <KuiFlexItem>
          <KuiFieldSearch className="search-input" fullWidth placeholder="Search..." onChange={this.handleChange} />
        </KuiFlexItem>
        <KuiFlexItem grow={false}>
          <KuiButton fill>Search</KuiButton>
        </KuiFlexItem>
     </KuiFlexGroup>
      </form>
    )
  }

}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired
}




module.exports = SearchBox;
