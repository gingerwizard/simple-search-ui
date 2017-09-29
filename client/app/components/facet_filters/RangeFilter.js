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
      filter_id: this.props.facet_id,
      is_filtered: false,
    };
    this.slideChange = this.slideChange.bind(this);
  }

  slideChange(values){
    if (values[0] != this.props.facet_filter.get('min') || values[1] != this.props.facet_filter.get('max')) {
      this.props.onSlideChange({id:this.props.facet_id,type:this.FACET_FILTER_TYPE,label:'Metascore',field:'metascore',values:values})
    }
    this.setState(function(){
      this.is_filtered = true;
    });
  }

  render() {
    var min = this.props.facet_filter.get('min');
    var max = this.props.facet_filter.get('max');
    var step = this.props.facet_filter.get('step');
    var start = min;
    var end = max;
    alert('here')
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
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object.isRequired,
  onSlideChange: PropTypes.func.isRequired,
  is_filtered: PropTypes.bool.isRequired,
};


module.exports = RangeFilter;
