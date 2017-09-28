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


class RangeFilter extends React.Component {

  FACET_FILTER_TYPE = "range_drilldown"

  constructor(props) {
    super(props);
    this.state = {

    };
    this.slideChange = this.slideChange.bind(this);
  }

  slideChange(values){
    this.props.onSlideChange({type:this.FACET_FILTER_TYPE,label:'Metascore',field:'metascore',values:values})
  }

  render() {
    return (

      <KuiSideNav>
        <KuiSideNavTitle>
          Metascore
        </KuiSideNavTitle>
        <div className="range-slider">
          <Range onAfterChange={this.slideChange} tipProps={{placement: 'bottom'}} handleStyle={[{ borderColor: '#007BA7' },{ borderColor: '#007BA7' }]} trackStyle={[{ backgroundColor: '#14A7DF' }]} count={3} step={this.props.step} allowCross={false} min={this.props.min} max={this.props.max} defaultValue={[this.props.min, this.props.max]}/>
        </div>
      </KuiSideNav>
    )
  }



}


RangeFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  marks: PropTypes.array,
  onSlideChange: PropTypes.func.isRequired,
};


module.exports = RangeFilter;
