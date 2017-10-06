var React = require('react');
var PropTypes = require('prop-types');
import { object, node } from 'prop-types'
import {
  KuiSideNav,
  KuiSideNavItem,
  KuiSideNavTitle,
  KuiBadge,
} from '../../ui_framework/components';

import { SelectableGroup } from 'react-selectable-fast';

import HistogramBar from './HistogramBar'
class NumericHistogram extends React.Component {

  FACET_FILTER_TYPE = "numeric_range"

  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
  }


  handleSelection(selectedKeys) {
    //selectedKeys[0].selectable.clearSelection;
    var lower_bound = selectedKeys[0];
    if (selectedKeys[0]) {
      let lower_bound = selectedKeys[0].props.range;
      let upper_bound = selectedKeys[selectedKeys.length - 1].props.range;
      //neccessary if the user drags right to left
      let lower_val = lower_bound.lower < upper_bound.lower ? lower_bound.lower : upper_bound.lower;
      let upper_val = upper_bound.upper > lower_bound.upper ? upper_bound.upper: lower_bound.upper;
      this.props.onSelectRange({id:this.props.facet_id,type:this.props.facet_filter.get('type'),
        label:this.props.facet_filter.get('label'),field:this.props.facet_filter.get('field'),
        values:[lower_val,upper_val]});
    }
  }

  render() {
    var bar_width = 100/this.props.facet_filter.get('values').size;
    var total = this.props.facet_filter.get('values').reduce(function(max,value){
      return value.get('count') > max ? value.get('count') : max ;
    },0);
    return (
      <KuiSideNav>
        <KuiSideNavTitle>
          {this.props.facet_filter.get('label')}
        </KuiSideNavTitle>
        <SelectableGroup resetOnStart={true} tolerance={0} className="histogram" clickClassName="histogram-bar" allowClickWithoutSelected={true}  duringSelection={this.handleSelecting} onSelectionFinish={this.handleSelection}>
          {

              this.props.facet_filter.get('values').map(function(value,i){
              var unique_id = this.props.facet_id+'-'+value.get('key');
              var height = (value.get('count')/total)*100;
              return (
                <HistogramBar range={{'lower':value.get('key'),'upper':value.get('key')+this.props.facet_filter.get('interval')}} height={height} width={bar_width} key={value.get('key')} />
              )
          }.bind(this))}
        </SelectableGroup>
      </KuiSideNav>

    )
  }
}


NumericHistogram.propTypes = {
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object,
  onSelectRange: PropTypes.func.isRequired,
};

module.exports = NumericHistogram;
