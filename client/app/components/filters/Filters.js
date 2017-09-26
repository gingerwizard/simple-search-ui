var React = require('react');
var TermFilter = require('./TermFilter')
var PropTypes = require('prop-types');
function Filters (props) {

  let facets = props.facets;

  return (
    <div className="filters">
      {Object.keys(facets).map(function(field,i){
          return (
            <div key={field} className="filter-box">
                <TermFilter key={field} label={facets[field].label} values={facets[field].values} field={field}/>
            </div>
          )
      })}
      <div className="filter-box">
      </div>
      <div className="filter-box">
      </div>
      //TODO: We need to switch on facet type here

    </div>

  )
}


Filters.propTypes = {
  facets: PropTypes.shape({
  })
};


Filters.defaultProps = {
  facets: {},
}


module.exports = Filters;
