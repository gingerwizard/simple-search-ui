var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText
} from '../../ui_framework/components';


function SearchHit (props) {
    return (
      <KuiText className="search-hit">
          <div className="search-hit-image" style={{'backgroundImage': `url("${props.hit.get('img')}")`}}/>
          <div className="search-image-details">
            <h3>{props.hit.get('title')}</h3>

            {props.hit.get('description')}
          </div>
      </KuiText>
    )
}


SearchHit.propTypes = {
  hit: PropTypes.object.isRequired
};
module.exports = SearchHit;
