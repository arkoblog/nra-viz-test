var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Nav = require('../components/Nav.js')

require("../styles/styles.css")

var Nav = React.createClass({
    getInitialState: function() {
        return {}
    },
    render: function() {
        return (
            <nav className="navbar navbar-custom">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="#"><span className= "bold">Housing Reconstruction Assessment |</span> <span className="dashboard-text"> Dashboard</span></a>
					</div>
				</div>
			</nav>
        )
    }
})

module.exports = Nav;
