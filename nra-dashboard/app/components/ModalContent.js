var React=require('react');
var Chart = require('./c3Chart.js')
var FetchData = require('../utils/FetchData')
var Update = require('../utils/Update');
var Loading = require('react-loading');

require('../styles/styles.css')


var ModalContent = React.createClass({
    getInitialState: function() {
        // console.log(this.props)
        return {
            modalParams: {id:1,type:"construction", district:this.props.locationParams.district, vdc:this.props.locationParams.vdc},
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
            }
        }
    },
    onParameterChange: function(params) {
        FetchData.fetchModalData(params)
            .then(function(response){
                // console.log(response.data[0])
                if (this.props.modalType == "construction") {
                    // console.log(response.data[0])
                    this.setState({
                        secondaryData: response.data[0],
                        primaryPercentageData: this.props.primaryData.percentageStats.construction_status,
                        primaryValues: this.props.primaryData.stats.construction_status,
                        updaterConfig: { opacity: 1, allowPointer: "auto" }

                    })
                } else if (this.props.modalType == "installment") {
                    this.setState({
                        secondaryData: response.data[0].data,
                        primaryPercentageData: this.props.primaryData.percentageStats.installment_status,
                        primaryValues: this.props.primaryData.stats.installment_status,
                        updaterConfig: { opacity: 1, allowPointer: "auto" }

                    })
                }
            }.bind(this))

    },
    componentWillMount: function() {
        console.log(this.state.modalParams)
        this.onParameterChange(this.state.modalParams);        // console.log(this.props.primaryData)
    },
    _handleChange: function(e) {
        var params = JSON.parse(e.target.value);
        params.district=this.props.locationParams.district;
        params.vdc=this.props.locationParams.vdc;
        // console.log(params)
        this.setState({
            modalParams: params,
            updaterConfig: { opacity: 0, allowPointer: "none" },            
        }, this.onParameterChange(params))
    },
    render: function() {
        if (this.state.secondaryData.success == 0) {
            return( <div className = "center-div"><Loading type='bars' color='#4484ce' /></div>)
        } else {

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
                             <select onChange={this._handleChange}className="col-md-12 ">
                              <option value='{"type":"construction", "id":0}'>Type of house design followed</option>
                              <option value='{"type":"construction", "id":1}'>Type of building foundation</option>
                              <option value='{"type":"construction", "id":0}'>Superstructure of the house</option>
                              <option value='{"type":"construction", "id":1}'>Roof design</option>
                            </select>
                            </div> 
                        <Update config ={this.state.updaterConfig}>
                        <div className="chart-container ">
                        <Chart.modalMultipleBar data= {this.state.secondaryData.data} id="chart12"/>
                        </div>
                        </Update>
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
    }
})


module.exports = ModalContent