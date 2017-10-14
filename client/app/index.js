var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
require('./index.scss');
require('./ui_framework/src/theme_light.scss');

require('rc-slider/assets/index.css');

var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
