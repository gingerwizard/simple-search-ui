var React = require('react');
var PropTypes = require('prop-types');
import { createSelectable } from 'react-selectable-fast';
import {
  KuiBadge,
} from '../../ui_framework/components';

//style={{'backgroundImage': `url("${}")`}}

class HistogramBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isPopoverOpen: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({
      isPopoverOpen: true
    });
  }

  onMouseLeave() {
    this.setState({
      isPopoverOpen: false
    });
  }


  render () {
    return (
      <div onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} ref={this.props.selectableRef} className={'histogram-bar '+ (this.props.selecting || this.state.isPopoverOpen ? 'bar-select' : 'bar-unselected')} style={{'width': this.props.width+'%'}}>
        <div className="bar-fill" style={{'height':this.props.height+'%','width':'100%'}}/>
        <div className="tooltip">
          <div style={{'display':this.state.isPopoverOpen ? 'inline-block': 'none'}} className="tooltip-body">
            <span>{this.props.tool_tip ? this.props.tool_tip: this.props.range.lower + ' - '+ this.props.range.upper}</span>
          </div>

        </div>
      </div>
    )
  }

}

HistogramBar.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  tool_tip: PropTypes.string,
  range: PropTypes.shape({
    lower: PropTypes.number.isRequired,
    upper: PropTypes.number.isRequired
  }).isRequired,
};


export default createSelectable(HistogramBar);
