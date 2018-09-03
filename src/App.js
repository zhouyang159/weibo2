import React, { Component } from 'React';
import './App.css'

import Header from './components/Header';
import Body from './components/Body';

class App extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="App">
                <Header></Header>
                <Body></Body>
			</div>
        )
    }
}

export default App
