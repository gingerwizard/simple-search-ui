var React = require('react');
var PropTypes = require('prop-types');

import { Media } from 'reactstrap';
var SearchHits = require('./SearchHits')
var ResultDetails = require('./ResultDetails')
var Sort = require('../filters/Sort')


function Results (props) {
  return (
    <div>
      <div className="results-top-bar">
        <ResultDetails query={props.results.query} numHits={props.results.numHits}/>
        <Sort/>
      </div>
      <SearchHits results={props.results.results}/>
    </div>
  )

}

module.exports = Results;
