var React = require('react');
var Nav = require('../components/Nav.js')
var NepalMap = require('../components/Map.js')
var axios = require('axios')
var Sidebar = require('./Sidebar')
var FetchData = require('../utils/FetchData')
var Loading = require('react-loading');
require("../styles/styles.css")

var Root = React.createClass({
    getInitialState: function() {
        return {
            data: {
                "success": 0,
                "stats": {
                    survey_status: {
                        "surveys": "21363",
                        "surveyors": "200"
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
                        "dolakha$22": 51,
                        "sindhupalchowk$23": 33,
                        "nuwakot$28": 45,
                        "dhading$30": 72,
                        "gorkha$36": 27
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
        FetchData(params).then(function(response) {
            console.log("Fetched Data", response)
            this.setState({
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
        if (newParams.district == "*") {
            this.setState({
                header: "All Districts".toUpperCase()
            })
        } else {
            this.setState({
                header: (newParams.name).toUpperCase()
            })
        }

        var params = {
            district: newParams.district,
            vdc: newParams.vdc
        }

        this.onParameterChange(params, callback)
    },

    render: function() {
        if (this.state.data.success != 1) {
            return( <div className = "center-div"><Loading type='bars' color='#31BF9A' /></div>)
        } else {

            return (
                <div>
    					<Nav/>
                        <NepalMap data = {this.state.data} onSelectionUpdate={this.onSelectionUpdate} sidebarOpener={this.sidebarOpener}> 
                        <Sidebar data={this.state.data} header={this.state.header}/> </NepalMap>
                </div>
            )
        }

    }
})

module.exports = Root;
