var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiButton,
  KuiButtonEmpty,
  KuiFormRow,
  KuiIcon,
  KuiPopover,
  KuiHorizontalRule,
} from '../../ui_framework/components';


class Sort extends React.Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.toggle = this.toggle.bind(this);
    this.state = {
      isPopoverOpen: false,
      selected_item: props.defaultSort
    };

    this.handleChange = this.closePopover.bind(this);
  }

  setSort(selected_item,onSortChange) {
    onSortChange(selected_item).then(function (){
      this.setState({
        selected_item: selected_item
      });
    }.bind(this))
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onButtonClick() {
    this.setState({
      isPopoverOpen: !this.state.isPopoverOpen,
    });
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }


  render () {
    const button = (
      <KuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick.bind(this)} className="sort">
        {this.props.sortOptions.get(this.state.selected_item).get('label')}
      </KuiButton>
    );

    return (
        <KuiPopover
          panelPaddingSize="none"
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}
          panelPaddingSize="none"
          withTitle
        >

          {
            this.props.sortOptions.entrySeq().map(function(sort_option,key){
                return (
                  <KuiButtonEmpty className="sort-button" key={sort_option[0]} onClick={this.setSort.bind(this,sort_option[0],this.props.onSortChange)}>
                    {sort_option[1].get('label')}
                  </KuiButtonEmpty>
                )
            }.bind(this))
          }


      </KuiPopover>
    );
  }
}

Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  sortOptions: PropTypes.object.isRequired,
  defaultSort: PropTypes.string.isRequired,
};



module.exports = Sort;
