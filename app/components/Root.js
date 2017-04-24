var React = require('react');
var Nav = require('../components/Nav.js')
var NepalMap = require('../components/Map.js')
var axios = require('axios')
var Sidebar = require('./Sidebar')
var FetchData = require('../utils/FetchData')
var Loading = require('react-loading');
var Update = require('../utils/Update');
require("../styles/styles.css")

var Root = React.createClass({
    getInitialState: function() {
        return {
            updaterConfig: { opacity: 1, allowPointer: "auto" },
            data: {
                "success": 0,
                "stats": {
                    survey_status: {
                        "surveys": "21363",
                        "surveyors": "200",
                        "beneficiaries":312232
                    },
                    "construction_status": {
                        "Completed": "3001",
                        "In Progress": "3773",
                        "Not Started": "14589"
                    },
                    "grant_status": {
                        "Received": "20256",
                        "Not Received": "1107"
                    },
                    "installment_status": {
                        "Applied": "2159",
                        "Not Applied": "19204"
                    }
                },
                "percentageStats": {
                    construction_status: {
                        "Completed": 14,
                        "In Progress": 18,
                        "Not Started": 68
                    },
                    grant_status: {
                        "Received": 95,
                        "Not Received": 5
                    },
                    installment_status: {
                        "Applied": 10,
                        "Not Applied": 90
                    },
                    survey_status: {
                        "surveys": 70,
                        "surveyors": 33
                    },
                    "regionalStats": {
                        "dolakha$22": 8,
                        "sindhupalchowk$23": 9,
                        "nuwakot$28": 12,
                        "dhading$30": 8,
                        "gorkha$36": 7
                    }

                },
                "message": "Stats fetched successfully"
            },
            filterParams: {
                district: "*",
                vdc: "*"
            },
            header: "ALL DISTRICTS",
            isSideBarOpen: false
        }
    },
    onParameterChange(params, callback) {
        FetchData.fetchData(params).then(function(response) {
            // console.log("Fetched Data", response)

            this.setState({
                updaterConfig: { opacity: 1, allowPointer: "auto" },
                data: response.data

            }, callback)
        }.bind(this))
    },
    componentWillMount: function() {
        this.onParameterChange(this.state.filterParams);

        // FetchData(this.state.fil).then(function(response) {
        //     console.log("Fetched Data", response)
        //     this.setState({
        //         data: response.data
        //     })
        // }.bind(this))
    },
    sidebarOpener: function(isSideBarOpen) {
        this.setState({
            isSideBarOpen: !isSideBarOpen
        })
    },
    onSelectionUpdate: function(newParams, callback) {
        // console.log("Updated Parameters",newParams);
        var params = {
            district: newParams.district,
            vdc: newParams.vdc
        }


        if (newParams.district == "*") {
            this.setState({
                header: "All Districts".toUpperCase(),
                updaterConfig: { opacity: 0.4, allowPointer: "none" },
                filterParams:params

            }, this.onParameterChange(params, callback))
        } else {
            this.setState({
                header: (newParams.name).toUpperCase(),
                updaterConfig: { opacity: 0.4, allowPointer: "none" },
                filterParams:params
            }, this.onParameterChange(params, callback))
        }



    },

    render: function() {
        if (this.state.data.success != 1) {
            return( <div className = "center-div"><Loading type='bars' color='#4484ce' /></div>)
        } else {

            return (
                <div>
                        <Nav/>
                        <Update config ={this.state.updaterConfig}>
                        <NepalMap config = {this.state.updaterConfig} header = {this.state.header} data = {this.state.data} onSelectionUpdate={this.onSelectionUpdate} sidebarOpener={this.sidebarOpener}> 
                        <Sidebar locationParams = {this.state.filterParams} data={this.state.data} header={this.state.header}/> </NepalMap>
                        </Update>
                </div>
            )
        }

    }
})

module.exports = Root;
