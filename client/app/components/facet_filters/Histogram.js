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
import HistogramBar from './HistogramBar';

class Histogram extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSelecting = this.handleSelecting.bind(this);
    this.identify_bounds = this.identify_bounds.bind(this)
    this.state = {
      'tool_tip': null
    }
  }

  identify_bounds(selectedKeys){
    let lower_facet = selectedKeys[0].props.facet_value;
    let upper_facet = selectedKeys[selectedKeys.length - 1].props.facet_value;
    //neccessary if the user drags right to left
    let lower_label = lower_facet.get('lower_key') < upper_facet.get('lower_key') ? lower_facet.get('lower_label') : upper_facet.get('lower_label');
    //if the upper bound is not defined on either we assume its the extremity i.e. last right most bucket
    let upper_label = upper_facet.get('upper_key') && lower_facet.get('upper_key') ? (
      upper_facet.get('upper_key') > lower_facet.get('upper_key') ? upper_facet.get('upper_label'): lower_facet.get('upper_label')
    ) : null;
    return [lower_label,upper_label]
  }

  handleSelection(selectedKeys) {
    if (selectedKeys[0]) {
      let bounds = this.identify_bounds(selectedKeys)
      this.props.onSelectRange({id:this.props.facet_id,type:this.props.facet_filter.get('type'),
        label:this.props.facet_filter.get('label'),field:this.props.facet_filter.get('field'),
        values:[bounds[0],bounds[1]]});
      this.setState({
        'tool_tip':null
      })
    }
  }


  handleSelecting(selectedKeys) {
    if (selectedKeys[0]) {
      let bounds = this.identify_bounds(selectedKeys)
      this.setState({
        'tool_tip': bounds[1] ? bounds[0] +' - '+bounds[1] : '> '+bounds[0]
      })
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
                  var unique_id = this.props.facet_id+'_'+value.get('lower_key')+'_'+value.get('upper_key');
                var height = (value.get('count')/total)*100;
                return (
                    <HistogramBar tool_tip={this.state.tool_tip} facet_value={value} height={height} width={bar_width} key={unique_id}/>
                )
          }.bind(this))}

        </SelectableGroup>
      </KuiSideNav>

    )
  }
}


Histogram.propTypes = {
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object,
  onSelectRange: PropTypes.func.isRequired,
};

module.exports = Histogram;
