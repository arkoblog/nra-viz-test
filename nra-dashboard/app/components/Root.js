var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var NepalMap = require('../components/Map.js')
var axios = require ('axios')
// var Insights = require('../components/Insights.js')
// var Chart = require('./c3Chart.js')
var Sidebar = require('./Sidebar')
var FetchData = require('../utils/FetchData')

// Load Components
// var Nav = require('./Nav')

// var MyMap = require('./Maps')

require("../styles/styles.css")

var Root = React.createClass({
	getInitialState: function() {
		return {
			data: {
			    "success": 1,
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
			        "grant_status" : {
			        	"Received": "20256",
			        	"Not Received": "1107"
			        },
			        "installment_status" : {
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
			header:"ALL DISTRICTS",
			isSideBarOpen:false
		}
	},
	onParameterChange(params){
		// console.log("Hi")
		FetchData(params).then(function(response){
			console.log("updated data", response)
			this.setState({
				data: response.data
			})
		}.bind(this))

		// var getChartData = FetchData.getChart(params.chartParams);
		// var getMapData = FetchData.getMapAttributes(params.mapParams);

		// axios.all([getChartData,getMapData]).then(function(response){
		// 	console.log(response)
		// 	var newMapData = {data: response[1]}
		// 	// console.log("MapData", this.state.mapData)
		// 	// console.log("NewMapData", newMapData)

		// 	this.setState({
		// 		chartData:response[0],
		// 		mapData: newMapData
		// 	})
		// }.bind(this))
		// console.log(params.chartParams)
		// FetchData.getChart(params.chartParams).then(function(response){
		// 	// console.log("My response", response)
		// 	this.setState({
		// 		chartData:response
		// 	})
		// }.bind(this))		
	},
	componentWillMount: function() {
		this.onParameterChange(this.state.filterParams);
	},
	sidebarOpener: function(isSideBarOpen) {
		this.setState({
			isSideBarOpen: !isSideBarOpen
		})
	},
	onSelectionUpdate:function(newParams) {
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
			district : newParams.district,
			vdc : newParams.vdc
		}

		this.onParameterChange(params)
	},

	render: function(){
		return(
				<div>

					<Nav/>
					<NepalMap data = {this.state.data} onSelectionUpdate={this.onSelectionUpdate} sidebarOpener={this.sidebarOpener}> 
					<Sidebar data={this.state.data} header={this.state.header}/> </NepalMap>
				</div>
			)
				
	}
})

module.exports = Root;