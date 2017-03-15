var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var Maps = require('../components/Maps.js')
var Insights = require('../components/Insights.js')
var Chart = require('./c3Chart.js')
var MyModal = require('../utils/Modal')



require('leaflet-sidebar-v2')
require('../styles/leaflet-sidebar.css')
require('../styles/styles.css')

// Load Components
// var Nav = require('./Nav')

// var MyMap = require('./Maps')

require("../styles/styles.css")

var Sidebar = React.createClass({
	getInitialState: function() {
		return {
			chartData: [["a","b","c"],["yaxis",62.28452945,57.92606443,75.47298675]],
			modalIsOpen: false
		}
	},
 	openModal: function () {
        this.setState({modalIsOpen: true});
    },

    afterOpenModal: function () {
    },

    closeModal: function () {
        this.setState({modalIsOpen: false});
    },

	render: function(){
		return(
			<div>	

					<MyModal isOpen={this.state.modalIsOpen} onClose={() => this.closeModal()}>
						<div className="row-fluid modal-wrapper">
							<div className="col-md-12 col-lg-12 col-sm-12">
								<h3 className="modal-header">Deep Dive</h3>
							</div>
							
							<div className="col-md-3 col-lg-3 col-sm-3">
								<div className="chart-container ">
								<p className="bar-header">Status of construction</p>
								<Chart.ClusteredColumn data = {[['data1', 25,24, 34 ]]}  id="chart4" chartType="bar"/>
								</div>
								
							</div>
							<div className="col-md-9 col-lg-9 col-sm-9 right-column">
							 <div className="styled-select blue semi-square">
							 <select className="col-md-12 ">
							  <option value="volvo">Type of house design followed</option>
							  <option value="saab">Type of building foundation</option>
							  <option value="mercedes">Superstructure of the house</option>
							  <option value="audi">Roof design</option>
							</select>
							</div> 
								<div className="slight-padding">
								<Chart.ClusteredColumn data = {[['data1', 25,54, 34 ],['data2', 65,66,11 ],['data12', 65,66,11 ],['data42', 65,66,11 ],['data3', 10,11,54]]} id="chart3" chartType="bar"/>
								</div>
							</div>

						</div>
						<p><button onClick={() => this.closeModal()}>Close</button></p>
					</MyModal>

			 <div id="sidebar" className="sidebar collapsed ">
			        <div className="sidebar-tabs ">
			            <ul role="tablist">
			                <li><a href="#home" role="tab"><i className="fa fa-area-chart"></i></a></li>
			            </ul>


			        </div>

			        <div className="sidebar-content">
			            <div className="sidebar-pane" id="home">
			                <h1 className="sidebar-header pull-right">
			                    <span className="sidebar-close"><i className="fa fa-remove"></i></span>
			                </h1>
								<Insights modalOpener={this.openModal} large= {this.props.large} />
			            </div>

			            <div className="sidebar-pane" id="profile">
			                <h1 className="sidebar-header">Profile<span className="sidebar-close"><i className="fa fa-caret-left"></i></span></h1>
			            </div>

			            <div className="sidebar-pane" id="messages">
			                <h1 className="sidebar-header">Messages<span className="sidebar-close"><i className="fa fa-caret-left"></i></span></h1>
			            </div>

			            <div className="sidebar-pane" id="settings">
			                <h1 className="sidebar-header">Settings<span className="sidebar-close"><i className="fa fa-caret-left"></i></span></h1>
			            </div>
			        </div>
			</div>
			</div>
			)
				
	}
})

module.exports = Sidebar;