var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Chart = require('./c3Chart.js')
var Modal = require('react-modal')
var MyModal = require('../utils/Modal')

require("../styles/styles.css")

// Load Components var Nav = require('./Nav') var MyMap = require('./Maps')

require("../styles/styles.css")

var customStyles = {
    content: {
        bottom     : 'auto',
        left       : '50%',
        marginRight: '-50%',
        right      : 'auto',
        top        : '50%',
        transform  : 'translate(-50%, -50%)',
        width      : '50%'
    }
};

var Insights = React.createClass({
    render: function () {
        return (
            <div className="row-fluid ">

                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="row-fluid bar-header">Surveys Submitted</div>
                    <div className="row-fluid total-surveys">{this.props.data.total_surveys}</div>
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12 ">
                    <div className="row-fluid bar-header">status of construction</div>
                    <a className="more">Learn More >></a>
                    <div className="row-fluid  "><Chart.Bar id="chart1" data={this.props.data.construction_status}/></div>
                </div>

                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="row-fluid bar-header">Applied for second installment?</div>
                    <a className="more">Learn More >>
                    </a>
                    <div className="row-fluid ">
                    <Chart.Bar id="chart2" data={this.props.data.installment_status}/>
                    </div>
                </div>

            </div>

            )
	}
})

module.exports = Insights;