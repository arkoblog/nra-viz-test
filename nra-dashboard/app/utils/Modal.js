var React = require('react');


var Modal = React.createClass({
	close: function (e) {
		e.preventDefault()
		if (this.props.onClose) {
			this.props.onClose()
		}
	},
	render: function() {

    	if (this.props.isOpen === false) {return null}


	    var modalStyle = {
	      position: 'absolute',
	      width:'80%',
	      top: '50%',
	      left: '50%',
	      padding: '15px',
	      transform: 'translate(-50%, -50%)',
	      zIndex: '9999',
	      background: 'rgb(245,245,245)'
	    }

	    var backdropStyle = {
	      position: 'absolute',
	      width: '100%',
	      height: '100%',
	      top: '0px',
	      left: '0px',
	      zIndex: '9998',
	      background: 'rgba(0, 0, 0, 0.3)'
	    }


		return (
		      <div>
		        <div style={modalStyle}>{this.props.children}</div>
		        <div style={backdropStyle} onClick={e => this.close(e)}></div>
		      </div>
		)
	}
})

module.exports = Modal 