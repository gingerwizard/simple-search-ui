var React = require('react');

import { Media } from 'reactstrap';
var image = require('./placeholder.png');

function SearchHit (props) {
    return (
      <div className="search-hit">
        <Media className="search-hit-contents">
          <Media left href="#">
            <Media object src={image} data-src={image} className="search-hit-image"/>
          </Media>
          <Media body>
            <Media heading className="search-image-title">
              Result Title
            </Media>
            Something about the result.
          </Media>
        </Media>
      </div>
    )
}

module.exports = SearchHit;
