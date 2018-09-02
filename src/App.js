import React, { Component } from 'React';
import './App.css'

import Header from './components/Header';
import Body from './components/Body';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {}
        this.changeContainerId = this.changeContainerId.bind(this);
    }

    changeContainerId(containerId){
        this.setState({
            containerId: containerId
        });
    }

    render() {
        return (
            <div className="App">
                <Header changeContainerId={(containerId) => this.changeContainerId(containerId)} ></Header>
                <Body containerId={this.state.containerId}></Body>
			</div>
        )
    }
}

export default App
