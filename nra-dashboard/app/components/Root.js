var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var Body = require('../components/Body.js')
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
			chartData: {
				total_surveys: 71615,
				construction_status: [
					
                {"title": "under_construction", "value":20},
                {"title": "construction", "value":30},
                {"title": "no_construction", "value":45}
				
			],
				installment_status: [
					
                {"title": "yes", "value":30},
                {"title": "no", "value":70}
			],
			},
			mapData: {"data":{"districts":[{"id":28,"completion":31},{"id":36,"completion":56},{"id":22,"completion":30},{"id":23,"completion":10},{"id":30,"completion":97}],"vdcs":[
            {"id":300001,"completion":65},
            {"id":300002,"completion":25},
            {"id":300003,"completion":54},
            {"id":300004,"completion":34},
            {"id":300005,"completion":21},
            {"id":300006,"completion":11},
            {"id":300007,"completion":54},
            {"id":300008,"completion":30},
            {"id":300009,"completion":100},
            {"id":300010,"completion":50},
            {"id":300011,"completion":10},
            {"id":300012,"completion":20},
            {"id":300013,"completion":70},
            {"id":300014,"completion":49},
            {"id":300015,"completion":57},
            {"id":300016,"completion":17},
            {"id":300017,"completion":80},
            {"id":300018,"completion":50},
            {"id":300019,"completion":62},
            {"id":300020,"completion":50},
            {"id":300021,"completion":20},
            {"id":300022,"completion":70},
            {"id":300023,"completion":33},
            {"id":300024,"completion":42},
            {"id":300025,"completion":50},
            {"id":300026,"completion":10},
            {"id":300027,"completion":20},
            {"id":300028,"completion":30},
            {"id":300029,"completion":42},
            {"id":300030,"completion":50},
            {"id":300031,"completion":10},
            {"id":300032,"completion":20},
            {"id":300033,"completion":30},
            {"id":300034,"completion":42},
            {"id":300035,"completion":50},
            {"id":300036,"completion":10},
            {"id":300037,"completion":20},
            {"id":300038,"completion":30},
            {"id":300039,"completion":42},
            {"id":300040,"completion":50},
            {"id":300041,"completion":10},
            {"id":300042,"completion":20},
            {"id":300043,"completion":30},
            {"id":300044,"completion":42},
            {"id":300045,"completion":50},
            {"id":300046,"completion":10},
            {"id":300047,"completion":20},
            {"id":300048,"completion":30},
            {"id":300049,"completion":42},
            {"id":300050,"completion":50}   
			]}},
			filterParams: {
				chartParams: {id:0},
				mapParams: {id:0}
			},
			header:"ALL DISTRICTS",
			isSideBarOpen:false
		}
	},
	onParameterChange(params){

		var getChartData = FetchData.getChart(params.chartParams);
		var getMapData = FetchData.getMapAttributes(params.mapParams);

		axios.all([getChartData,getMapData]).then(function(response){
			console.log(response)
			var newMapData = {data: response[1]}
			// console.log("MapData", this.state.mapData)
			// console.log("NewMapData", newMapData)

			this.setState({
				chartData:response[0],
				mapData: newMapData
			})
		}.bind(this))
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
	onSelectionUpdate:function(code,level,name,district, dist_code) {
		console.log(code,level,name,district,dist_code)
		var newParams = {chartParams:{id: code}, mapParams:{id:dist_code}};
		this.onParameterChange(newParams);
		if (level=="district") {
			this.setState({
				header: name.toUpperCase()  
			})
		} else if (level=="vdc") {
			this.setState({
				header: name.toUpperCase() + ", " + district.toUpperCase() 
			})			
		} else {
			this.setState({
				header: "All districts"
			})
		}
	},

	render: function(){
		return(
				<div>

					<Nav/>
					<Body mapData = {this.state.mapData} onSelectionUpdate={this.onSelectionUpdate} sidebarOpener={this.sidebarOpener}> <Sidebar data={this.state.chartData} header={this.state.header}/> </Body>
				</div>
			)
				
	}
})

module.exports = Root;