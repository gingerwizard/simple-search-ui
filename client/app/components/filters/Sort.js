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

    this.toggle = this.toggle.bind(this);
    this.state = {
      isPopoverOpen: false,
      selected_item: 'Relevancy'
    };

    const panelTree = { 0: {
        id: 0,
        items: [{
          name: 'Relevancy',
          onClick: this.setSort.bind(this,'Relevancy'),
        }, {
          name: 'Oldest',
          onClick: this.setSort.bind(this,'Oldest'),
        }, {
          name: 'Newest',
          onClick: this.setSort.bind(this,'Newest'),
        }]
      }
    };

    this.handleSubmit = this.onButtonClick.bind(this);
    this.handleChange = this.closePopover.bind(this);
    this.idToPanelMap = panelTree;
    this.idToPreviousPanelIdMap = extractPreviousIds(this.idToPanelMap);
  }

  setSort(selected_item) {
    this.setState({
      selected_item: selected_item
    });
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
        {this.state.selected_item}
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

module.exports = Sort;
