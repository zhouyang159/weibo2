import React, { Component } from 'react';
import './index.css';

import { NavBar, Icon, Button } from 'antd-mobile';
import axios from 'axios';
import IScroll from 'iscroll';


import BigImgBox from '../BigImgBox';
import Card from '../Card';

class Profile_header extends React.Component {

	render() {
		let user = this.props.user
		return (
			<div className="profile_header">
				<div className="top">
					<div className="avatar">
						<img style={{ width: "100%" }} src={user.avatar_hd}></img>
					</div>
					<div className="title_box">
						<h3>{user.screen_name}</h3>
						<p>微博认证：{user.verified_reason}</p>
					</div>
				</div>
				<ul className="footer">
					<li>
						<p>{user.follow_count}</p>
						<p>关注</p>
					</li>
					<li>
						<p>{(user.followers_count/10000).toFixed(1)}万</p>
						<p>粉丝</p>
					</li>
					<li style={{ width: '130px' }}>
						<Button size="small">已关注</Button>
					</li>
					<li style={{width: '30px', textAlign: 'center', paddingTop: '10px'}}>
						<i className="iconfont icon-Group-"></i>
					</li>
				</ul>
			</div>
		);
	}
}

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	componentDidMount() {
		let id = this.props.match.params.id;
		axios({
			url: `http://localhost:3000/profile/info?uid=${id}`
		}).then(res => {
			this.setState({
				data: res.data.data
			});
		}).catch(err => console.log(err));
	}

	componentDidUpdate() {
		let myScroll = new IScroll('.wrapper');
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, {
            capture: false,
            passive: false
        });
	}


	render() {
		console.log(this.state.data);
		return (
			<div className="Profile">
				<NavBar
					mode="light"
					icon={<Icon type="left" />}
					onLeftClick={() => this.props.history.go(-1)}
				></NavBar>
				{
					this.state.data &&
					<div className="wrapper">
						<div className="scroll">
							<Profile_header user={this.state.data.user}></Profile_header>
							<div className="profile_content">
								{this.state.data.statuses.map( ( item, index) => <Card key={index} mblog={item}></Card>)}
							</div>
						</div>
					</div>
				}

			</div>
		)
	};
}

export default Profile;
