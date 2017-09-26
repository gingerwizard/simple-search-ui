var React = require('react');
var PropTypes = require('prop-types');
var SearchHit = require('./SearchHit')
function SearchHits (props) {

    const hits_per_row = 3;
    return (
      <div>
        {props.results.map(function(e,i){ return i%hits_per_row ===0 && props.results.slice(i,i+hits_per_row)}).filter(function(e){return e; }).map(function(row,i){
            return (
              <SearchRow key={i} row={row}/>
            )
        })}
    </div>
  )
}


SearchHits.propTypes = {
  results: PropTypes.array.isRequired,
};

function SearchRow (props) {
  return (
    <div className="search-hits-row">
      { props.row.map(function(hit,_){
        return (
          <SearchHit key={hit.id} hit={hit}/>
        )
      })}
    </div>
  )
}



module.exports = SearchHits;
