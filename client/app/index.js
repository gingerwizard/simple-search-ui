var React = require('react');
var ReactDOM = require('react-dom');
require('./index.css');
require('./ui_framework/src/theme_light.scss');
var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
