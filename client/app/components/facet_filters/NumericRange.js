var React = require('react');
var PropTypes = require('prop-types');

import Slider from 'rc-slider';

import {
  KuiSideNav,
  KuiSideNavTitle,
  KuiBadge,
} from '../../ui_framework/components';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);


class NumericRange extends React.Component {

  FACET_FILTER_TYPE = "numeric_range"

  constructor(props) {
    super(props);
    this.slideChange = this.slideChange.bind(this);
    this.slideAfterChange = this.slideAfterChange.bind(this);
  }

  slideChange(values){
    this.props.onSlideChange({ id:this.props.facet_id,
      type:this.props.facet_filter.get('type'),
      label:this.props.facet_filter.get('label'),
      field:this.props.facet_filter.get('field'),
      values:values,
      value_label: values[0] +' - '+ values[1]
    },false);
  }

  slideAfterChange(values){
    if (values[0] != this.props.facet_filter.get('min') || values[1] != this.props.facet_filter.get('max')){
      this.props.onSlideChange({id:this.props.facet_id,type:this.props.facet_filter.get('type'),label:this.props.facet_filter.get('label'),field:this.props.facet_filter.get('field'),values:values,value_label: values[0] +' - '+ values[1]});
    } else {
      this.props.onSlideReset(this.props.facet_id);
    }

  }
  render() {
    return (
      <KuiSideNav>
        <KuiSideNavTitle>
          {this.props.facet_filter.get('label')}
        </KuiSideNavTitle>
        <div className="range-slider">
          <Range value={this.props.value} onAfterChange={this.slideAfterChange} onChange={this.slideChange} tipProps={{placement: 'bottom'}}
            handleStyle={[{ borderColor: '#007BA7' },{ borderColor: '#007BA7' }]} trackStyle={[{ backgroundColor: '#14A7DF' }]} count={3}
            step={this.props.facet_filter.get('step')} allowCross={false} min={this.props.facet_filter.get('min')}
            max={this.props.facet_filter.get('max')}/>
        </div>
      </KuiSideNav>
    )
  }
}


NumericRange.propTypes = {
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object.isRequired,
  onSlideChange: PropTypes.func.isRequired,
  //called when the slider returns to its min and max
  onSlideReset: PropTypes.func.isRequired,
  is_filtered: PropTypes.bool.isRequired,
  value: PropTypes.array,
};


module.exports = NumericRange;
