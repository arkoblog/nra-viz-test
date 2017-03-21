var React = require('react');
var Insights = require('../components/Insights.js')
var Modal = require('../utils/Modal')
var Chart = require('./c3Chart.js')

require('leaflet-sidebar-v2')
require('../styles/leaflet-sidebar.css')
require('../styles/styles.css')

var ModalContent = React.createClass({
	getInitialState: function() {
		return {
			secondaryData:{
            "id": 0,
            "data": {

  "construction completed": {

    "stats": {

      "Prototype Design (NRA Catalog)": 2400,

      "Old traditional design (non engineered)": 1000,

      "Technical Support from Architect/Engineer (engineered)": 3000,

      "Building code norms followed without engineer": 2000,

      "Other": 2600

    },

    "percentageStats": {

      "Prototype Design (NRA Catalog)": 24,

      "Old traditional design (non engineered)": 10,

      "Technical Support from Architect/Engineer (engineered)": 30,

      "Building code norms followed without engineer": 20,

      "Other": 26

    }

  },

  "construction in progress": {

    "stats": {

      "Prototype Design (NRA Catalog)": 3200,

      "Old traditional design (non engineered)": 1400,

      "Technical Support from Architect/Engineer (engineered)": 4300,

      "Building code norms followed without engineer": 1200,

      "Other": 3100

    },

    "percentageStats": {

      "Prototype Design (NRA Catalog)": 24,

      "Old traditional design (non engineered)": 14,

      "Technical Support from Architect/Engineer (engineered)": 43,

      "Building code norms followed without engineer": 12,

      "Other": 31

    }

  },

  "not started": {

    "stats": {

      "Prototype Design (NRA Catalog)": 3400,

      "Old traditional design (non engineered)": 1200,

      "Technical Support from Architect/Engineer (engineered)": 1000,

      "Building code norms followed without engineer": 1200,

      "Other": 3200

    },

    "percentageStats": {

      "Prototype Design (NRA Catalog)": 34,

      "Old traditional design (non engineered)": 12,

      "Technical Support from Architect/Engineer (engineered)": 10,

      "Building code norms followed without engineer": 12,

      "Other": 32

    }

  }

}
        }  
		}
	},
	componentWillMount: function() {
		console.log(this.props.primaryData)
		if(this.props.modalType == "construction") {
			this.setState({
				primaryPercentageData:this.props.primaryData.percentageStats.construction_status,
				primaryValues: this.props.primaryData.stats.construction_status 
			})
		} else if(this.props.modalType == "installment") {
			this.setState({
				primaryPercentageData:this.props.primaryData.percentageStats.installment_status,
				primaryValues: this.props.primaryData.stats.installment_status 
			})
		}
	},
	render: function() {
		if (this.props.modalType == "construction") {
			return (
				<div>
				<div className="row-fluid modal-header">

					<div className="col-md-4 col-lg-4 col-sm-4">
						<div className="modal-header col-md-12 col-lg-12 col-sm-12">
						STATUS OF CONSTRUCTION
						<div className="chart-container ">
						<Chart.modalSingleBar percentageData = {this.state.primaryPercentageData} values = {this.state.primaryValues} id="chart11"/>
						</div>
						</div>
					</div>
					<div className="col-md-8 col-lg-8 col-sm-8 secondary-chart">
							 <div className="styled-select blue semi-square">
							 <select className="col-md-12 ">
							  <option value="volvo">Type of house design followed</option>
							  <option value="saab">Type of building foundation</option>
							  <option value="mercedes">Superstructure of the house</option>
							  <option value="audi">Roof design</option>
							</select>
							</div> 
						<div className="chart-container ">
						<Chart.modalMultipleBar data= {this.state.secondaryData.data} id="chart12"/>
						</div>
					</div>

				</div>
				<div className="row-fluid modal-header">
					<div className="col-md-12 col-lg-12 col-sm-12">
						<p><button className="btn btn-sm btn-primary pull-right " onClick={() => this.props.closeModal()}>Close</button></p>
					</div>
				</div>
				</div>
			)
		} else if (this.props.modalType == "installment") {
			return (
				<div>
				<div className="row-fluid modal-header">
					<div className="modal-header col-md-12 col-lg-12 col-sm-12">
						Deep Dive
					</div>
					<div className="col-md-4 col-lg-4 col-sm-4 ">
						<div className="chart-container ">
						<Chart.modalSingleBar percentageData = {this.state.primaryPercentageData} values = {this.state.primaryValues} id="chart11"/>
						</div>
					</div>
					<div className="col-md-8 col-lg-8 col- secondary-chartsm-8">
						<div className="chart-container ">
						<Chart.modalSingleBar percentageData = {this.state.primaryPercentageData} values = {this.state.primaryValues} id="chart12"/>
						</div>
					</div>

				</div>
				<div className="row-fluid modal-header">
					<div className="col-md-12 col-lg-12 col-sm-12">
						<p><button className="btn btn-sm btn-primary pull-right " onClick={() => this.props.closeModal()}>Close</button></p>
					</div>
				</div>
				</div>
			)			
		} else {
			return (
				<div>
				<h1>None selected</h1>
				<p><button onClick={() => this.props.closeModal()}>Close</button></p>
				</div>
			)				
		}
	}
})

var Sidebar = React.createClass({
	getInitialState: function() {
		return {
			isModalOpen: false,
			modalType: "construction"
		}
	},
    componentDidUpdate: function() {},
    _openModal: function (type) {
        this.setState({
        	modalType: type,
        	isModalOpen: true
        });
    },

    _afterOpenModal: function () {
    },

    _closeModal: function () {
        this.setState({isModalOpen: false});
    },

    render: function() {
        return (
            <div>

            <Modal isOpen={this.state.isModalOpen} onClose={() => this._closeModal()}>
            	<ModalContent primaryData= {this.props.data} closeModal={this._closeModal} modalType = {this.state.modalType} />
            </Modal>

			 <div id="sidebar" className="sidebar collapsed ">
			        <div className="sidebar-tabs ">
			            <ul role="tablist">
			                <li><a href="#home" role="tab"><i className="fa fa-area-chart"></i></a></li>
			            </ul>


			        </div>

			        <div className="sidebar-content">
			            <div className="sidebar-pane " id="home">
			                <h1 className="sidebar-header">
			                    <span className="sidebar-close"><i className="fa fa-remove"></i></span>
			                	{this.props.header}
			                </h1>
								<Insights modalOpener={this._openModal} data={this.props.data}/>
			            </div>

			        </div>
			</div>
			</div>
        )

    }
})

module.exports = Sidebar;
