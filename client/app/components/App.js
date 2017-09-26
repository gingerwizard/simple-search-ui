var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var SearchPage = require('./SearchPage');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='main-container'>
          <Switch>
            <Route path='/' component={SearchPage} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
