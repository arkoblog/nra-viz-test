var React = require('react');
var Chart = require('./c3Chart.js')
var MyModal = require('../utils/Modal')

var customStyles = {
    content: {
        bottom: 'auto',
        left: '50%',
        marginRight: '-50%',
        right: 'auto',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%'
    }
};

var Insights = React.createClass({
    componentWillMount: function() {
        // console.log("My data",this.props.data.stats.survey_status)
    },
    _formatNumber: function(data) {
        var format = d3.format(",");
        return format(data)
    },
    render: function() {
        return (
            <div className="row-fluid sidebar-info-insights ">

                <div className="content-row col-md-12 col-lg-12 col-sm-12">
                    <div className="row-fluid bar-header">total beneficiaries surveyed</div>
                    <div className="row-fluid total-surveys">{this._formatNumber(this.props.data.stats.survey_status.surveys)} ({((this.props.data.stats.survey_status.surveys/this.props.data.stats.survey_status.beneficiaries)*100).toFixed(0)}%)</div>
                    <div className="row-fluid proportion-surveys">out of <span className="bold">{this._formatNumber(this.props.data.stats.survey_status.beneficiaries)}</span></div>
                </div>

                <div className="content-row col-md-12 col-lg-12 col-sm-12 ">
                    <span className="row-fluid bar-header">status of reconstructed houses *</span><br/>
                    <span className="row-fluid more"><a onClick={() => this.props.modalOpener("construction")}  className="details-link"> View details</a></span>
                    <div className="row-fluid  "><Chart.Bar id="chart1" percentageData = {this.props.data.percentageStats.construction_status} values = {this.props.data.stats.construction_status}/></div>
                </div>
                <div className="content-row col-md-12 col-lg-12 col-sm-12">

                    <div className="row-fluid bar-header">Received the first installment? *</div>

                    <div className="row-fluid ">
                    <Chart.Bar id="chart3" percentageData= {this.props.data.percentageStats.grant_status} values = {this.props.data.stats.grant_status}/>
                    </div>
                </div>


                <div className="content-row col-md-12 col-lg-12 col-sm-12">
                    <span className="row-fluid bar-header">Applied for second installment? *</span><br/>
                    <span className="row-fluid more"><a onClick={() => this.props.modalOpener("installment")}  className="details-link"> View details</a></span>
                    <div className="row-fluid ">
                    <Chart.Bar id="chart2" percentageData= {this.props.data.percentageStats.installment_status} values = {this.props.data.stats.installment_status}/>
                    </div>
                </div>

                <div className="content-row col-md-12 col-lg-12 col-sm-12">
                    <span className="row-fluid footnote"><b style = {{fontWeight:700, fontSize:15}}>*</b> Percentage distribution is based on the total beneficiaries surveyed till date. (i.e. 100% = {this._formatNumber(this.props.data.stats.survey_status.surveys)} beneficiaries.)</span>
                </div>

            </div>

        )
    }
})

module.exports = Insights;
