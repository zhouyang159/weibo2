import React, { Component } from 'React';
import './App.css'

import Header from './components/Header';
import Body from './components/Body';
import BigImgBox from './components/BigImgBox';
import EventBus from './EventBus';

import userContext from './userContext';


class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			showBigImgBox: false
		}

		EventBus.addListener('showCardImgs', (pics) => {
			this.setState({
				showBigImgBox: true,
				pics: pics
			});
		});
	}

	render() {
		let { showBigImgBox, pics } = this.state;
		return (
			<div className="App">
				<Header></Header>
				<userContext.Consumer>
					{(value) => <Body login={value}></Body>}
				</userContext.Consumer>
				{showBigImgBox && <BigImgBox hide={() => this.setState({ showBigImgBox: false })} pics={pics}></BigImgBox>}
			</div>
		)
	}
}

export default App
