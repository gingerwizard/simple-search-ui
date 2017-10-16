var React = require('react');
var PropTypes = require('prop-types');
import { object, node } from 'prop-types'
import {
  KuiSideNav,
  KuiSideNavItem,
  KuiSideNavTitle,
  KuiFlexGroup,
  KuiFlexItem,
} from '../../ui_framework/components';
import ReactTooltip from 'react-tooltip'

class CorrelationMatrix extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelection = this.handleSelection.bind(this);
  }


  handleSelection(selectedKeys) {

  }



  render() {
    var box_width = 100/(this.props.facet_filter.get('x_size') ? this.props.facet_filter.get('x_size'): this.props.facet_filter.get('size'));
    var box_height = 100/(this.props.facet_filter.get('y_size') ? this.props.facet_filter.get('y_size'): this.props.facet_filter.get('size'));
    var max_weight = this.props.facet_filter.get('values').reduce(function(max,value){
      return value.get('values').reduce(function(max,val){return val.get('count') > max ? val.get('count') : max;}, max)
    },0);
    return (

      <KuiSideNav>
        <ReactTooltip class='correlation-tooltip' id='matrix-tooltip'/>
        <KuiSideNavTitle>
          {this.props.facet_filter.get('label')}
        </KuiSideNavTitle>
        <div className="correlation-matrix" style={{'display':'flex','flex-direction':'row'}}>
          {
            this.props.facet_filter.get('values').map(function(bucket,_) {
              return (
                <MatrixRow box_width={box_width} box_height={box_height} row={bucket} max_weight={max_weight}/>
              )
            })
          }
        </div>
      </KuiSideNav>

    )
  }
}

function MatrixRow (props) {
  return (
    <KuiFlexGroup style={{'width':props.box_width+'%','flex-direction':'column'}}>
      {
        props.row.get('values').map(function(value) {
          let min_weight = 0.2;
          let weight = ((value.get('count')/(props.max_weight > 0 ? props.max_weight : 1))*(1-min_weight))+min_weight;
          return (
            <div data-for='matrix-tooltip' data-tip={props.row.get('key')+':'+value.get('key')} className="correlation-box" style={{'height':props.box_height+'%','opacity':weight == min_weight ? 0 : weight}}/>
          )
        })
      }
    </KuiFlexGroup>
  )
}

MatrixRow.propTypes = {
  row: PropTypes.object.isRequired,
  box_width: PropTypes.number.isRequired,
  box_height:PropTypes.number.isRequired,
  max_weight: PropTypes.number.isRequired,
}

CorrelationMatrix.propTypes = {
  facet_id: PropTypes.string.isRequired,
  facet_filter: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
};

module.exports = CorrelationMatrix;
