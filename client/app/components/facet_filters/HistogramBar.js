var React = require('react');
var PropTypes = require('prop-types');
import { createSelectable } from 'react-selectable-fast';



//style={{'backgroundImage': `url("${}")`}}
function HistogramBar (props) {
  return (
    <div ref={props.selectableRef} className={'histogram-bar '+ (props.selecting ? 'bar-select' : 'bar-unselected')} style={{'width': props.width+'%'}}>
      <div style={{'height':props.height+'%','width':'100%'}} />
    </div>
  )

}

HistogramBar.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  range: PropTypes.shape({
    lower: PropTypes.number.isRequired,
    upper: PropTypes.number.isRequired
  }).isRequired,
};


export default createSelectable(HistogramBar);
