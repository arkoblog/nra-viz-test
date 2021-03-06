var React = require('react');
var Insights = require('../components/Insights.js')
var Modal = require('../utils/Modal')
var Chart = require('./c3Chart.js')
var ModalContent = require('../components/ModalContent')

require('leaflet-sidebar-v2')
require('../styles/leaflet-sidebar.css')
require('../styles/styles.css')


var Sidebar = React.createClass({
    getInitialState: function() {
        return {
            isModalOpen: false,
            modalType: "construction"
        }
    },
    componentDidUpdate: function() {},
    _openModal: function(type) {
        this.setState({
            modalType: type,
            isModalOpen: true
        });
    },

    _afterOpenModal: function() {},

    _closeModal: function() {
        this.setState({ isModalOpen: false });
    },

    render: function() {
        return (
            <div>

            <Modal isOpen={this.state.isModalOpen} onClose={() => this._closeModal()}>
            	<ModalContent header = {this.props.header} locationParams = {this.props.locationParams} primaryData= {this.props.data} closeModal={this._closeModal} modalType = {this.state.modalType} />
            </Modal>

			 <div id="sidebar" className="sidebar collapsed ">
			        <div className="sidebar-tabs ">
			            <ul role="tablist">
			                <li><a href="#home" role="tab"><i className="fa fa-area-chart"></i></a></li>
			                <li id = "nolink"><a  href="#info" role="tab"><i className="fa fa-info-circle"></i></a></li>
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
			            <div className="sidebar-pane " id="info">
			                <h1 className="sidebar-header">
			                    <span className="sidebar-close"><i className="fa fa-remove"></i></span>
			                	WELCOME
			                </h1>
			                <div className="row-fluid sidebar-info-text">
			                <div className="content-row info-text col-md-12 col-lg-12 col-sm-12 ">
			                	<div className="row-fluid bar-header">About this website</div>
			                	<div className="row-fluid info-content">
			                		<p>This website shows the latest statistics of the Housing Reconstruction Assessment survey being conducted by the National Reconstruction Authority (NRA) of Nepal.
									</p>
									<p>To view the statistics, click on the following icon located at the top right corner:  <br/><i className="fa fa-area-chart click-icon"></i> <br/></p>

			                	</div>
			                </div>
			                <div className="content-row info-text col-md-12 col-lg-12 col-sm-12 ">
			                	<div className="row-fluid bar-header">About the survey</div>
			                	<div className="row-fluid info-content">
			                		<p>The National Reconstruction Authority (NRA) has deployed volunteers to assess the status of housing reconstruction in the earthquake-affected districts of Nepal. These volunteers go to field and interview the house owners identified as beneficiaries by the National Housing Reconstruction Program survey (also read Earthquake Housing Reconstruction Programme). The main objectives of this survey are as follows:</p>
			                		<p>
			                			<ol>
			                				<li>To ascertain the number of reconstructed houses, i.e. how many houses have been reconstructed, how many are being reconstructed and how many are yet to be reconstructed?</li>
			                				<li>To ascertain the status of reconstructed houses. For example, what percentage of the reconstructed houses have followed the building codes? </li>
			                				<li>To identify the actual issues, if any, which are impeding the reconstruction efforts on field (for example, issues like lack of skilled labor, lack of construction materials, etc.).</li>

			                			</ol>
									</p>
									<p>In its current phase, about 1,000 volunteers (final year engineering students from Pokhara University) are conducting this survey in five districts (Dolakha, Dhading, Gorkha, Nuwakot and Sindhupalchowk) in the first three weeks of March 2017.</p>
								

			                	</div>
			                </div>
			                </div>
			            </div>

			        </div>
			</div>
			</div>
        )

    }
})

module.exports = Sidebar;
