import React, { Component } from 'react';
import './index.css';

import { NavBar, Icon, Button, Popover } from 'antd-mobile';
import axios from 'axios';
import Card from '../Card';
import CommentsBox from '../CommentsBox';
import IScroll from 'iscroll';

const Item = Popover.Item;

class Detail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			mblog: props.location.mblog,
			visible: false,
			selected: '',
		}
	}

	onSelect = (opt) => {
		// console.log(opt.props.value);
		this.setState({
			visible: false,
			selected: opt.props.value,
		});
	};

	//向服务器请求此条微博的评论数据
	componentWillMount() {
		axios({
			url: 'http://localhost:3000/comments/hotflow',
			params: {
				id: 4282729749231613,
				mid: 4282729749231613,
				max_id_type: 0
			}
		}).then(res => {
			let commentsArr = res.data.data.data;
			this.setState({
				commentsArr
			});
		}).catch(err => console.log(err));
	}

	componentDidUpdate() {
		this.DetailScroll = new IScroll('.wrapper');
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, {
			capture: false,
			passive: false
		});
		this.DetailScroll.refresh();
	}

	render() {
		console.log('render Detail');
		let { commentsArr } = this.state;
		return (
			<div className="Detail">
				<div className="navbar">
					<NavBar
						mode="light"
						onLeftClick={() => this.props.history.go(-1)}
						leftContent={<Icon type="left" />}
						rightContent={
							<Popover
								mask
								visible={this.state.visible}
								overlay={[
									(<Item key="1" value="copyLink">复制链接</Item>),
									(<Item key="2" value="cancel">取消</Item>),
								]}
								align={{
									overflow: { adjustY: 0, adjustX: 0 },
									offset: [-10, 0],
								}}
								onSelect={this.onSelect}
							>
								<Icon type="ellipsis" />
							</Popover>
						}
					>
						微博正文
					</NavBar>
				</div>

				<div className="wrapper">
					<div className="scroller">
						<Card mblog={this.state.mblog}></Card>
						{commentsArr && <CommentsBox commentsArr={commentsArr} id={this.state.id}></CommentsBox>}
					</div>
				</div>
			</div>
		)
	};
}

export default Detail;
