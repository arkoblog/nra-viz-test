var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var Body = require('../components/Body.js')
var Insights = require('../components/Insights.js')
var Chart = require('./c3Chart.js')
var Sidebar = require('./Sidebar.js')
var $ = require('jquery');

require("../styles/styles.css")

var Root = React.createClass({
	getInitialState: function() {
		return {
			large:false
		}
	},
	render: function(){
		return(
				<div>

					<Nav/>
					<Body>
					</Body>

				</div>
		)			
	}
})

module.exports = Root;