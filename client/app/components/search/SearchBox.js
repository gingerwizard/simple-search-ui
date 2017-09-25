var React = require('react');
import { Input } from 'reactstrap';
var SearchIcon = require('react-icons/lib/fa/search')
var PropTypes = require('prop-types');

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
        <form className="search-form" onSubmit={this.handleSubmit}>
            <button className="search-button">
                <SearchIcon className="search-icon"/>
            </button>
            <input placeholder="search movies" className="search-input" type="text" onChange={this.handleChange}/>
        </form>
    )
  }

}

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired
}




module.exports = SearchBox;
