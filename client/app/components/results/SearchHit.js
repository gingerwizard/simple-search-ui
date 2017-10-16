var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText,KuiFlexItem,KuiFlexGroup,
  KuiPanel,
  KuiDescriptionList,
  KuiDescriptionListTitle,
  KuiDescriptionListDescription,
  KuiLoadingSpinner,
} from '../../ui_framework/components';
import Img from 'react-image'
import noImage from './no_image.png'

//style={{'backgroundImage': `url("${}")`}}
function SearchHit (props) {
    return (
      <KuiFlexGroup>
        <KuiPanel className="search-hit">

          <div className="search-image-details">
              <h2 className="title">{props.hit.get('title')}</h2>
              <Img className="search-hit-image" src={[props.hit.get('img'),noImage]} loader={<KuiLoadingSpinner size="xLarge"/>}/>

              <p className="description-text">{props.hit.get('description')}</p>
          </div>
        </KuiPanel>
      </KuiFlexGroup>
    )
}


SearchHit.propTypes = {
  hit: PropTypes.object.isRequired
};
module.exports = SearchHit;
