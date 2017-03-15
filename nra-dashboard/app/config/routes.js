var React = require('react');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var Root = require('../components/Root');

var routes = (
    <Router history={hashHistory}>
		<Route path='/' component = {Root}>
		</Route>
	</Router>
);

module.exports = routes;
