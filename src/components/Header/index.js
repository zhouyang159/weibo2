import React, { Component } from 'react';
import './index.css';

import axios from 'axios';

import Swiper from 'swiper'

class TabCard extends React.Component {

    render() {
        return (
            <div className="TabCard">
                <ul>
                    {this.props.categoryArr ? this.props.categoryArr.map(item => {
                        return <li key={item.gid} onClick={this.props.changeContainerId.bind(this, item.gid)}>{item.name}</li>
                    }) : null}
                </ul>
            </div>
        )
    }
}

class Header extends React.Component {

    state = {
        showTabCard: false
    }

    componentWillMount = () => {
        axios({
            url: 'http://localhost:3000/api/config/list'
        }).then(res => {
            let categoryArr = res.data.data.channel
            this.setState({
                categoryArr: categoryArr
            });
        }).catch(err => console.log(err));
    }

    componentDidUpdate() {
        let mySwiper = new Swiper('.header-category-swiper-container', {
            slidesPerView: 5,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }


    render() {
        return (
            <div className="Header">
                <div className="searchBar">
                    <div><i className="iconfont icon-renwu"></i></div>
                    <div><input /></div>
                    <div><i className="iconfont icon-renwu"></i></div>
                    <div><i className="iconfont icon-renwu"></i></div>

                </div>
                <div className="category">
                    <div className="slider_item center">
                        <div className="header-category-swiper-container">
                            <div className="swiper-wrapper">
                                {this.state.categoryArr ? this.state.categoryArr.map(item =>
                                    <div key={item.gid} onClick={this.props.changeContainerId.bind(this, item.gid)} className="swiper-slide">{item.name}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="slider_item icon_block" onClick={() => { this.setState({ showTabCard: !this.state.showTabCard }) }}>
                        <i className="iconfont icon-jiantou"></i>
                    </div>
                </div>

                {this.state.showTabCard ? <TabCard changeContainerId={this.props.changeContainerId} categoryArr={this.state.categoryArr}></TabCard> : null}
            </div>
        )
    }
}

export default Header;
