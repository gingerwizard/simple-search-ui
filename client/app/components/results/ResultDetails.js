var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText,
} from '../../ui_framework/components';

function ResultDetails (props) {

  return (
      <KuiText className="result-details">
        {props.query &&
          <h3>{props.numHits} results found for {props.query}</h3>
        }
      </KuiText>
  )

}

ResultDetails.propTypes = {
  numHits: PropTypes.number,
  query: PropTypes.string,
};

module.exports = ResultDetails;
