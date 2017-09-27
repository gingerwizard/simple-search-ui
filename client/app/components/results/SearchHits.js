var React = require('react');
var PropTypes = require('prop-types');
var SearchHit = require('./SearchHit')
function SearchHits (props) {

    const hits_per_row = 3;
    return (
      <div>
        {props.results.map(function(e,i){ return i%hits_per_row ===0 && props.results.slice(i,i+hits_per_row)}).filter(function(e){return e; }).map(function(row,row_num){
            return (
              <SearchRow key={row_num} row={row}/>
            )
        })}
    </div>
  )
}


SearchHits.propTypes = {
  results: PropTypes.object.isRequired,
};

function SearchRow (props) {
  return (
    <div className="search-hits-row">
      { props.row.map(function(hit,_){
        return (
          <SearchHit key={hit.get('id')} hit={hit}/>
        )
      })}
    </div>
  )
}



module.exports = SearchHits;
