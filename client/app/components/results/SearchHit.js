var React = require('react');
var PropTypes = require('prop-types');
function SearchHit (props) {
    return (
      <div className="search-hit">
          <div className="search-hit-image" style={{'backgroundImage': `url("${props.hit.img}")`}}/>
          <div>
            <div className="search-image-title">
              <h3>{props.hit.title}</h3>
            </div>
            {props.hit.description}
          </div>
      </div>
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
