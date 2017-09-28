var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText
} from '../../ui_framework/components';
import Img from 'react-image'
import noImage from './no_image.png'

//style={{'backgroundImage': `url("${}")`}}
function SearchHit (props) {
    return (
      <KuiText className="search-hit">
          <div className="search-hit-image">
            <Img src={[props.hit.get('img'),noImage]}/>
          </div>
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
