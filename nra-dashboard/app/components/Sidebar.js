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
			                	ABOUT THIS TOOL
			                </h1>
			                <div className="row-fluid ">
			                <div className="content-row info-text col-md-12 col-lg-12 col-sm-12 ">
			                <div className="row-fluid bar-header">WELCOME</div>
			                <div className="row-fluid info-content">
			                <p>Nullam vel vulputate massa, vitae mollis tellus. Praesent tristique est id massa consectetur, sed finibus velit cursus. 
			                	Sed rutrum consectetur vestibulum. Aenean elit leo, placerat imperdiet tincidunt et, efficitur eu lorem. 
			                	Pellentesque scelerisque, erat ac accumsan vestibulum, mi odio pretium ipsum, at varius diam ante eget augue. Duis quis lacinia libero. 
			                	Vivamus urna tortor, ultricies et libero ac, pharetra gravida mi. Praesent scelerisque eu libero in congue.</p>
			                <p>Sed in hendrerit purus. Nam ultrices volutpat leo non rhoncus. Aliquam mollis sem non neque feugiat, facilisis porttitor sem luctus. 
			                Etiam risus diam, efficitur et erat nec, vulputate tincidunt arcu. Ut in pulvinar mauris, quis placerat lorem. 
			                Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque varius, nulla eget rhoncus dapibus, lectus velit ultrices tortor, non cursus lorem nulla ut justo.</p>
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
