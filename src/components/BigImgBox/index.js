import React, { Component } from 'react';
import './index.css';

import Swiper from 'swiper';
import { Icon } from 'antd-mobile';

class BigImgBox extends Component {

	componentDidMount() {
		let mySwiper = new Swiper('.bigImgBox-swiper-container', {
			autoHeight: true, //enable auto height
			spaceBetween: 20,
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction'
			}
		});
	}


	render() {
		let { pics } = this.props;
		return (
			<div className="BigImgBox" onClick={this.props.hide}>

				<div className="header">
					<span className="swiper-pagination">yeshu</span>
					<span className="fr"><Icon type="cross"/></span>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<div className="bigImgBox-swiper-container">
					<div className="swiper-wrapper">
						{pics.map((item,index) => {
							return <div key={index} className="swiper-slide">
								<img style={{width: '100%'}} src={item.url}></img>
							</div>
						})}
					</div>
				</div>

			</div>
		)
	};
}

export default BigImgBox;
