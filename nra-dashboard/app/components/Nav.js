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
						<a className="navbar-brand" href="#"><strong>Housing Reconstruction Assessment</strong> | Dashboard</a>
					</div>
				</div>
			</nav>
        )
    }
})

module.exports = Nav;
