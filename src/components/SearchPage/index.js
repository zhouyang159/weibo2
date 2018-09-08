import React, { Component } from 'react';
import './index.css';

import { SearchBar } from 'antd-mobile';

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.handleBack = this.handleBack.bind(this);

	}


	handleBack() {
		console.log('back');
		console.log(this);
		this.props.history.go(-1);
	}

	render() {
		return (
			<div className="SearchPage">
				<div className="input">
					<div onClick={this.handleBack}>
						<i className="iconfont icon-jiantou"></i>
					</div>
					<div className="search_bar">
						<SearchBar></SearchBar>
					</div>
				</div>
				<div className="hot_key">

				</div>
				
      		</div>
		)
	};
}

export default SearchPage;