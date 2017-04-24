
var React = require('react');
var PropTypes = React.PropTypes;
var Loading = require('react-loading');


var Update = React.createClass({
	getColor: function() {
		if (this.props.config.opacity == 1) {
			return 'rgba(66, 134, 244,0)'
		} else  {
			return 'rgba(66, 134, 244,1)'
		}
	},
    render: function() {
        return (
        	<div className="clearfix row-fluid" >

		            <div className="clearfix row-fluid" style = {{opacity:this.props.config.opacity, pointerEvents: this.props.config.allowPointer}}>
							{this.props.children}
					</div>
            		<div className = "center-div"><Loading type='bars' style = {{pointerEvents:"none"}}color={this.getColor()} /></div>
        	</div>
        );
    }
})

module.exports = Update;