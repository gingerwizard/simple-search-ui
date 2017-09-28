var React = require('react');
var PropTypes = require('prop-types');
import {
  KuiButton,
  KuiContextMenu,
  KuiFormRow,
  KuiIcon,
  KuiPopover,
  KuiSwitch,
} from '../../ui_framework/components';


function convertPanelTreeToMap(panel, map = {}) {
  if (panel) {
    map[panel.id] = panel;

    if (panel.items) {
      panel.items.forEach(item => convertPanelTreeToMap(item.panel, map));
    }
  }
  return map;
}

function extractPreviousIds(panels) {
  const idToPreviousPanelIdMap = {};

  Object.keys(panels).forEach(panelId => {
    const panel = panels[panelId];
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
        const isCloseable = Boolean(item.panel);
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel.id] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

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
    const panelTree = { 0: {
        id: 0,
        items: this.props.sortOptions.entrySeq().map(function(sort_option,key){
            return {
                name: sort_option[1].get('label'),
                onClick: this.setSort.bind(this,sort_option[0],this.props.onSortChange)
            }
        }.bind(this))
      }
    };
    this.idToPanelMap = panelTree;
    this.idToPreviousPanelIdMap = extractPreviousIds(this.idToPanelMap);

    const button = (
      <KuiButton iconType="arrowDown" iconSide="right" onClick={this.onButtonClick.bind(this)} className="sort">
        {this.props.sortOptions.get(this.state.selected_item).get('label')}
      </KuiButton>
    );

    return (
        <KuiPopover
          button={button}
          isOpen={this.state.isPopoverOpen}
          closePopover={this.closePopover.bind(this)}
          panelPaddingSize="none"
          withTitle
        >
        <KuiContextMenu
          initialPanelId={0}
          isVisible={this.state.isPopoverOpen}
          idToPanelMap={this.idToPanelMap}
          idToPreviousPanelIdMap={this.idToPreviousPanelIdMap}
        />
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
