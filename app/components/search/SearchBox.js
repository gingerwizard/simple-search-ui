var React = require('react');
import { Input } from 'reactstrap';
var SearchIcon = require('react-icons/lib/fa/search')
class SearchBox extends React.Component {

  render () {
    return (
        <div>
          <form className="search-form">
            <SearchIcon className="search-icon"/>
            <Input placeholder="search movies" className="search-input" />
            <button className="search-button"/>
          </form>
        </div>
    )
  }

}

module.exports = SearchBox;
