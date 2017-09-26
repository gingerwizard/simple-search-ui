var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText
} from '../../ui_framework/components';


function SearchHit (props) {
    return (
      <KuiText className="search-hit">
          <div className="search-hit-image" style={{'backgroundImage': `url("${props.hit.img}")`}}/>
          <div className="search-image-details">
            <h3>{props.hit.title}</h3>

            {props.hit.description}
          </div>
      </KuiText>
    )
}


SearchHit.propTypes = {
  hit: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })
};
module.exports = SearchHit;
