var React = require('react');
var Chart = require('./c3Chart.js')
var FetchData = require('../utils/FetchData')
var Update = require('../utils/Update');
var Loading = require('react-loading');
var axios = require('axios')

require('../styles/styles.css')


var ModalContent = React.createClass({
    getInitialState: function() {
        // console.log(this.props)
        return {
            modalParams: { "assessmentId": "1", district: this.props.locationParams.district, vdc: this.props.locationParams.vdc, type: this.props.modalType },
            updaterConfig: { opacity: 0, allowPointer: "none" },
            secondaryData: {
                "id": 0,
                "success": 0,
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
            },

        }
    },
    onParameterChange: function(params) {
        var fetchInitial = FetchData.fetchModalData(params);
        var fetchInstallment1 = FetchData.fetchModalData({ type: "installment", "assessmentId": "1", district: this.props.locationParams.district, vdc: this.props.locationParams.vdc });
        var fetchInstallment2 = FetchData.fetchModalData({ type: "installment", "assessmentId": "2", district: this.props.locationParams.district, vdc: this.props.locationParams.vdc });
        axios.all([fetchInitial, fetchInstallment1, fetchInstallment2]).then(function(response) {
            this.setState({
                secondaryData: response[0].data.assessmentStats,
                primaryPercentageData: this.props.primaryData.percentageStats.construction_status,
                primaryValues: this.props.primaryData.stats.construction_status,
                primaryInstallmentPercentageData: this.props.primaryData.percentageStats.installment_status,
                primaryInstallmentValues: this.props.primaryData.stats.construction_status,
                chartDataYes: response[1].data.assessmentStats,
                chartDataNo: response[2].data.assessmentStats,
                updaterConfig: { opacity: 1, allowPointer: "auto" }


            })

        }.bind(this))



    },
    componentWillMount: function() {
        this.onParameterChange(this.state.modalParams); // console.log(this.props.primaryData)
    },
    _formatNumber: function(data) {
        var format = d3.format(",");
        return format(data)
    },
    _handleChange: function(e) {
        var params = JSON.parse(e.target.value);
        var newParams = {}
        // console.log("Current Myparams", params)

        newParams.type = params.type;
        newParams.assessmentId = params.assessmentId;
        newParams.district = this.props.locationParams.district;
        newParams.vdc = this.props.locationParams.vdc;
        this.setState({
            modalParams: newParams,
            updaterConfig: { opacity: 0, allowPointer: "none" },
        }, this.onParameterChange(newParams))
    },
    render: function() {
        // console.log(this.props.modalType)
        if (this.state.secondaryData.success == 0) {
            return (<div className = "center-div"><Loading type='bars' color='#4484ce' /></div>)
        } else {

            if (this.props.modalType == "construction") {
                return (
                    <div>
                <div className="row-fluid modal-header">
                    <div className = "row-fluid modal-header">
                        <div className=" col-md-12 col-lg-12 col-sm-12 modal-title modal-header">
                                            {this.props.header} / {this.props.primaryData.stats.survey_status.surveys} beneficiaries surveyed / {((this.props.primaryData.stats.survey_status.surveys/this.props.primaryData.stats.survey_status.beneficiaries)*100).toFixed(0)}% of total
                                            <a className="close-button pull-right" onClick={() => this.props.closeModal()}><i className="fa fa-close"></i></a>
                            
                        </div>
                    </div>

                    <div className="col-md-4 col-lg-4 col-sm-4">
                        <div className="modal-header col-md-12 col-lg-12 col-sm-12">
                        STATUS OF CONSTRUCTION *
                        <div className="chart-container single-chart">
                        <Chart.modalSingleBar heightRatio={0.6} percentageData = {this.state.primaryPercentageData} values = {this.state.primaryValues} id="chart11"/>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-8 secondary-chart">
                             <div className="styled-select blue semi-square">
                             <select onChange={this._handleChange}className="col-md-12 ">
                              <option value='{"assessmentId" : "1", "type": "construction"}'>Type of house design followed</option>
                              <option value='{"assessmentId" : "2", "type": "construction"}'>Type of building foundation</option>
                              <option value='{"assessmentId" : "3", "type": "construction"}'>Superstructure of the house</option>
                              <option value='{"assessmentId" : "4", "type": "construction"}'>Roof design</option>

                              <option value='{"assessmentId" : "5", "type": "construction"}'>Source of funding?</option>
                              <option value='{"assessmentId" : "6", "type": "construction"}'>Were the building codes followed?</option>
                              <option value='{"assessmentId" : "7", "type": "construction"}'>Why weren't the buiding codes followed?</option>
                              <option value='{"assessmentId" : "8", "type": "construction"}'>Why has construction not started yet?</option>
                            </select>
                            </div> 
                        <Update config ={this.state.updaterConfig}>
                            <div className="chart-container ">
                            <Chart.modalMultipleBar heightRatio={0.6} data= {this.state.secondaryData} id="chart12"/>
                        </div>
                        </Update>


                    </div>
                    <div className="col-md-12 col-lg-12 col-sm-12">
                        <span className="row-fluid footnote">* Percentage distribution is based on the total beneficiaries surveyed till date. (i.e. 100% = {this._formatNumber(this.props.primaryData.stats.survey_status.surveys)} beneficiaries.)</span>
                    </div>

                </div>

                </div>
                )
            } else if (this.props.modalType == "installment") {
                return (
                    <div>
                <div className="row-fluid modal-header">
                    <div className = "row-fluid modal-header">
                        <div className=" col-md-12 col-lg-12 col-sm-12 modal-title modal-header">
                                            {this.props.header} / {this.props.primaryData.stats.survey_status.surveys} beneficiaries surveyed / {((this.props.primaryData.stats.survey_status.surveys/this.props.primaryData.stats.survey_status.beneficiaries)*100).toFixed(0)}% of total
                                            <a className="close-button pull-right" onClick={() => this.props.closeModal()}><i className="fa fa-close"></i></a>
                            
                        </div>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-4">
                        <div className="modal-header col-md-12 col-lg-12 col-sm-12">
                        
                        <div className="chart-container single-chart-installment">
                            <Chart.modalSingleBar2 heightRatio={0.20} validity = "applied" percentageData = {this.state.primaryInstallmentPercentageData} values = {this.state.primaryInstallmentValues} id="chart11"/>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-8 secondary-chart">
                        When did you apply for the installment?
                        <div className="chart-container ">
                        <Chart.modalMultipleApplyBar  heightRatio={0.20} validity = "applied" data= {this.state.chartDataYes} id="chart12"/>
                        </div>
                    </div>
                </div>
                <div className="row-fluid modal-header">
                    <div className="col-md-4 col-lg-4 col-sm-4">
                        <div className="modal-header col-md-12 col-lg-12 col-sm-12">
                        
                        <div className="chart-container single-chart-installment">
                            <Chart.modalSingleBar2  heightRatio={0.20}  validity = "not applied" percentageData = {this.state.primaryInstallmentPercentageData} values = {this.state.primaryInstallmentValues} id="chart13"/>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-8 col-lg-8 col-sm-8 secondary-chart">
                        Why couldn't you apply for the installment?
                        <div className="chart-container ">
                        <Chart.modalMultipleApplyBar  heightRatio={0.20} validity = "not applied" data= {this.state.chartDataNo} id="chart14"/>
                        </div>
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
    }
})


module.exports = ModalContent
