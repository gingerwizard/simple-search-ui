var React = require('react');
var PropTypes = require('prop-types');
var SearchHit = require('./SearchHit')
import {
  KuiFlexGrid,
} from '../../ui_framework/components';
function SearchHits (props) {

    return (
      <KuiFlexGrid columns={3} gutterSize="small" className="search-hit-grid">
        {props.results.map(function(hit,hit_num){
            return (
                <SearchHit key={hit.get('id')} hit={hit}/>
            )
        })}
      </KuiFlexGrid>
  )
}


SearchHits.propTypes = {
  results: PropTypes.object.isRequired,
};

module.exports = SearchHits;
