var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiText,KuiFlexItem,KuiFlexGroup,
  KuiPanel,
  KuiDescriptionList,
  KuiDescriptionListTitle,
  KuiDescriptionListDescription,
} from '../../ui_framework/components';
import Img from 'react-image'
import noImage from './no_image.png'

//style={{'backgroundImage': `url("${}")`}}
function SearchHit (props) {
    return (
      <KuiFlexGroup>
        <KuiPanel className="search-hit">
          <KuiFlexItem className="search-hit-image">
            <Img src={[props.hit.get('img'),noImage]}/>
          </KuiFlexItem>
          <KuiFlexItem className="search-image-details">
            <KuiDescriptionList>
              <KuiDescriptionListTitle>{props.hit.get('title')}</KuiDescriptionListTitle>
              <KuiDescriptionListDescription className="description-text">{props.hit.get('description')}</KuiDescriptionListDescription>
            </KuiDescriptionList>
          </KuiFlexItem>
        </KuiPanel>
      </KuiFlexGroup>
    )
}


SearchHit.propTypes = {
  hit: PropTypes.object.isRequired
};
module.exports = SearchHit;
