var React = require('react');

import { Media } from 'reactstrap';
var SearchHits = require('./SearchHits')
var ResultDetails = require('./ResultDetails')
var Sort = require('../filters/Sort')

class Results extends React.Component {

  render () {
    return (
      <div>
        <div className="results-top-bar">
          <ResultDetails/>
          <Sort/>
        </div>
        <SearchHits/>
      </div>
    )
  }

}

module.exports = Results;
