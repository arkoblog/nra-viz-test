var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var Body = require('../components/Body.js')
var Insights = require('../components/Insights.js')
var Chart = require('./c3Chart.js')

require("../styles/styles.css")

var Root = React.createClass({
	getInitialState: function() {
		return null
	},
	render: function(){
		return(
				<div>

					<Nav/>
					<Body/>

				</div>
		)			
	}
})

module.exports = Root;