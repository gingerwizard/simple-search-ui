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
    var min = this.props.facet_filter.get('min');
    var max = this.props.facet_filter.get('max');
    var step = this.props.facet_filter.get('step');
    return (
      <KuiSideNav>
        <KuiSideNavTitle>
          Metascore
        </KuiSideNavTitle>
        <div className="range-slider">
          <Range onAfterChange={this.slideChange} tipProps={{placement: 'bottom'}} handleStyle={[{ borderColor: '#007BA7' },{ borderColor: '#007BA7' }]} trackStyle={[{ backgroundColor: '#14A7DF' }]} count={3} step={step} allowCross={false} min={min} max={max} defaultValue={[min, max]}/>
        </div>
      </KuiSideNav>
    )
  }

}


RangeFilter.propTypes = {
  facet_filter: PropTypes.object.isRequired,
  onSlideChange: PropTypes.func.isRequired,
};


module.exports = RangeFilter;
