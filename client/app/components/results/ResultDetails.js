var React = require('react');
var PropTypes = require('prop-types');


function ResultDetails (props) {

  return (
    <div className="result-details">
      {props.query &&
        <span>{props.numHits} results found for {props.query}</span>
      }
    </div>
  )

}

ResultDetails.propTypes = {
  numHits: PropTypes.number,
  query: PropTypes.string,
};

module.exports = ResultDetails;
