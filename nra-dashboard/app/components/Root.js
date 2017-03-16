var React = require('react');
var ReactRouter = require('react-router');
var Link=ReactRouter.Link;
var Nav = require('../components/Nav.js')
var Body = require('../components/Body.js')
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
			filterParams: {
				id:30
			},
			header:"ALL DISTRICTS",
			isSideBarOpen:false,
			chartData: [["a","b","c","d","e","f"],["yaxis",62.28452945,57.92606443,75.47298675,197.0648713,78.8836633,113.04584]]
		}
	},
	onParameterChange(params){
		FetchData.getChart(params).then(function(response){
			console.log("My response", response)
			this.setState({
				data:response
			})
		}.bind(this))		
	},
	componentWillMount: function() {
		this.onParameterChange(this.state.filterParams);
	},
	sidebarOpener: function(isSideBarOpen) {
		this.setState({
			isSideBarOpen: !isSideBarOpen
		})
	},
	onSelectionUpdate:function(code,level,name,district) {
		
		var newParams = {id: code};
		this.onParameterChange(newParams);
		console.log(code,level,name,district)
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
					<Body onSelectionUpdate={this.onSelectionUpdate} sidebarOpener={this.sidebarOpener}> <Sidebar data={this.state.data} header={this.state.header}/> </Body>
				</div>
			)
				
	}
})

module.exports = Root;