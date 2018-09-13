import React, { Component } from 'react';
import './index.css';

import axios from 'axios';

const Comment = (props) => {
	let comment = props.comment;
	let time = new Date(comment.created_at).toLocaleString();

	return (
		<div className="Comment">
			<div>
				<div className="avatar">
					<img
						style={{ width: '100%' }}
						src={comment.user.avatar_hd}
					></img>
				</div>
			</div>
			<div className="right_content">
				<h4>{comment.user.screen_name}</h4>
				<div className="content" dangerouslySetInnerHTML={{__html: comment.text}}></div>
				<footer><span>{time}</span><span className="fr">{comment.like_count} <i className="iconfont icon-zan1-copy"></i></span></footer>
			</div>
		</div>
	);
}

class CommentsBox extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div className="CommentsBox">
				{this.props.commentsArr.map((comment,index) => <Comment key={index} comment={comment}></Comment>)}
			</div>
		)
	};
}

export default CommentsBox;