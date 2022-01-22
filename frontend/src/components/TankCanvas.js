import React from 'react';
import ReactDOM from 'react-dom';
import CV from '../elements/ConstVariable';

class TankCanvas extends React.Component{

		
	constructor (props){
		super(props);
		let ctx;
	}



	componentDidMount() {
		this.ctx = ReactDOM.findDOMNode(this).getContext('2d');
		this.props.startMenu(this.ctx);
		//this.props.drawAll(this.ctx);
		
	}
	
	componentDidUpdate() {
	
	}

	componentWillReceiveProps(nextProps) {
		//nextProps.drawAll(this.ctx);


	}

	componentWillUpdate(nextProps, nextState) {
		
	}

	
	render(){
		return(
				<canvas id="tankgame" width="512" height="448"> 
				</canvas>
			);
	}


}

	
TankCanvas.propTypes = {
	
	startMenu:React.PropTypes.func.isRequired,
	
	
	
	
}

export default TankCanvas;