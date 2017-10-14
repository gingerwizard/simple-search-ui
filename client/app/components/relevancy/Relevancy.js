var React = require('react');
import { Input } from 'reactstrap';
var PropTypes = require('prop-types');
var Immutable = require('immutable');
import {
  KuiPanel,
  KuiCheckboxGroup,
  KuiFormRow,
  KuiRange,
  KuiSelect,
  KuiFieldNumber,
} from '../../ui_framework/components';

function Relevancy (props) {
  return (
      <div className="relevancy">
        {
          props.controls.entrySeq().toArray().sort((a, b) => a[1].get('order') > b[1].get('order')).map(function(control){
              switch(control[1].get('type')){
                  case 'check_group': {
                      return (
                          <RelevancyBox key={control[0]} id={control[0]} label={control[1].get('label')} >
                              <KuiCheckboxGroup options={control[1].get('values').toJS()} onChange={props.changeRelevancy}/>
                          </RelevancyBox>
                      )
                  }
                  case 'switch':{
                      return (
                        <RelevancyBox key={control[0]} id={control[0]} label={control[1].get('label')} >
                          <KuiSelect options={control[1].get('values').toJS()} style={{height:40}}/>
                        </RelevancyBox>
                      )
                  }
                  case 'counter':{
                    return (
                      <RelevancyBox key={control[0]} id={control[0]} label={control[1].get('label')} >
                        <KuiFieldNumber min={control[1].get('min')} max={control[1].get('max')} placeholder={control[1].get('default')}></KuiFieldNumber>
                      </RelevancyBox>
                    )

                  }
              }
          }
        )}
      </div>
  )

}

function RelevancyBox(props) {
  return (
    <KuiPanel key={props.id} className="relevancy-box" >
      <KuiFormRow id={props.id} label={props.label}>
        {props.children}
      </KuiFormRow>
    </KuiPanel>

  )

}

Relevancy.propTypes = {
  controls: PropTypes.object.isRequired,
  changeRelevancy: PropTypes.func,
}

RelevancyBox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}




module.exports = Relevancy;
