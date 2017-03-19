var React = require('react');
var Insights = require('../components/Insights.js')
require('leaflet-sidebar-v2')
require('../styles/leaflet-sidebar.css')

var Sidebar = React.createClass({
    componentDidUpdate: function() {},
    render: function() {
        return (
            <div>	

			 <div id="sidebar" className="sidebar collapsed ">
			        <div className="sidebar-tabs ">
			            <ul role="tablist">
			                <li><a href="#home" role="tab"><i className="fa fa-area-chart"></i></a></li>
			            </ul>


			        </div>

			        <div className="sidebar-content">
			            <div className="sidebar-pane" id="home">
			                <h1 className="sidebar-header">
			                    <span className="sidebar-close"><i className="fa fa-remove"></i></span>
			                	{this.props.header}
			                </h1>
								<Insights  data={this.props.data}/>
			            </div>

			        </div>
			</div>
			</div>
        )

    }
})

module.exports = Sidebar;
