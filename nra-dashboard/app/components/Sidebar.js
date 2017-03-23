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
