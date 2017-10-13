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
    if (!this.props.facet_value) {
      console.log(JSON.stringify(this.props.facet_value))
    }

    return (
      <div onMouseLeave={this.onMouseLeave} onMouseEnter={this.onMouseEnter} ref={this.props.selectableRef} className={'histogram-bar '+ (this.props.selecting || this.state.isPopoverOpen ? 'bar-select' : 'bar-unselected')} style={{'width': this.props.width+'%'}}>
        <div className="bar-fill" style={{'height':this.props.height+'%','width':'100%'}}/>
        <div className="tooltip">
          <div style={{'display':this.state.isPopoverOpen ? 'inline-block': 'none'}} className="tooltip-body">
            <span>{this.props.tool_tip ? this.props.tool_tip: (this.props.facet_value.get('upper_label') ? this.props.facet_value.get('lower_label') + ' - '+ this.props.facet_value.get('upper_label') : '> '+this.props.facet_value.get('lower_label')) }</span>
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
};


export default createSelectable(HistogramBar);
