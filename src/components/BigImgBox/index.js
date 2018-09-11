import React, { Component } from 'react';
import './index.css';

import Swiper from 'swiper';


class BigImgBox extends Component {

	componentDidMount() {
		let mySwiper = new Swiper('.bigImgBox-swiper-container', {
			autoHeight: true, //enable auto height
			spaceBetween: 20,
		});
	}


	render() {
		let { pics } = this.props;
		return (
			<div className="BigImgBox" onClick={this.props.hideBigPic}>

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
