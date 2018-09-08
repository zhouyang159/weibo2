import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

import axios from 'axios';

import Swiper from 'swiper';

import EventBus from '../../EventBus';

class TabCard extends React.Component {
    
    render() {
        return (
            <div ref={ el => this.TabCard = el } className="TabCard animated fadeIn">
                <ul>
                    {this.props.categoryArr ? this.props.categoryArr.map(item => {
                        return <li key={item.gid} onClick={() => { this.props.changeCategory(item.gid) }} className={this.props.activeTabId === item.gid ? "active_li" : ""}>{item.name}</li>
                    }) : null}
                </ul>
            </div>
        )
    }
}


let isTransition = false;

class Header extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryArr: null,
            showTabCard: false,
            activeTabId: null//这个属性控制选中标签的高亮，包括下来列表里边的高亮也是这里控制
        }

        this.hideTabCard = this.hideTabCard.bind(this);
        this.changeCategory = this.changeCategory.bind(this);
        this.toggleDownIcon = this.toggleDownIcon.bind(this);
        this.toggleTabCard = this.toggleTabCard.bind(this);
        this.upTheDownIcon = this.upTheDownIcon.bind(this);
        this.downTheDownIcon = this.downTheDownIcon.bind(this);
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

    changeCategory(id) {
        EventBus.emit('changeCategory', id)
        this.hideTabCard();
        this.downTheDownIcon();
        this.setState({activeTabId: id});
    }

    hideTabCard() {
        this.setState({ showTabCard: false });
    }

    toggleTabCard() {
        console.log("isTransition",isTransition);
        
        if(isTransition) return;

        if(this.state.showTabCard){
            isTransition = true;
            //拿到真实dom节点,然后修改类名
            this.TabCard.TabCard.setAttribute("class", "TabCard animated fadeOut");
            this.toggleDownIcon();
            
            setTimeout(() => {
                this.setState({
                    showTabCard: !this.state.showTabCard
                })
                isTransition = false;
            },800);

        }else{
            isTransition = true;
            this.setState({
                showTabCard: !this.state.showTabCard
            })
            this.toggleDownIcon();
            isTransition = false;
        }
    }

    upTheDownIcon() {
        this.iconDown.style.transform = "rotateZ(180deg)";
        this.iconDown.style.transition = "all 0.5s";
    }

    downTheDownIcon() {
        this.iconDown.style.transform = "rotateZ(0deg)";
        this.iconDown.style.transition = "all 0.5s";
    }

    toggleDownIcon() {
        let flag = this.state.showTabCard;
        if (!flag) {
            this.iconDown.style.transform = "rotateZ(180deg)";
            this.iconDown.style.transition = "all 0.5s";
        } else {
            console.log(2);
            this.iconDown.style.transform = "rotateZ(0deg)";
            this.iconDown.style.transition = "all 0.5s";
        }
    }


    render() {
        //做一下tabCard的淡入淡出
        let { activeTabId } = this.state;
        return (
            <div className="Header">
                <div className="searchBar">
                    <div><i className="iconfont icon-xinlang"></i></div>
                    <div>
                        <Link to={{pathname: "/search_page"}}>
                            <div className="input"><i className="iconfont icon-sousuo" style={{fontSize: "14px"}}></i> 大家都在搜：京东</div>
                        </Link>
                    </div>
                    <div><i className="iconfont icon-bianji-"></i></div>
                    <div><i className="iconfont icon-renwu"></i></div>

                </div>
                
                <div className="category">

                    <div className="slider_item center">
                        <div className="header-category-swiper-container">
                            <div className="swiper-wrapper">
                                {this.state.categoryArr ?
                                    this.state.categoryArr.map(item => {
                                        return <div key={item.gid} data-id={item.gid} onClick={this.changeCategory.bind(this, item.gid)} className={item.gid === activeTabId ? "swiper-slide active-slide" : "swiper-slide" }>{item.name}</div>
                                    }) : null}
                            </div>
                        </div>
                    </div>

                    <div id="icon-jiangtouDown" ref={node => this.iconDown = node} className="slider_item icon_block" onClick={this.toggleTabCard}>
                        <i className="iconfont icon-jiantou"></i>
                    </div>

                </div>

                {this.state.showTabCard ? <TabCard ref={ el => this.TabCard = el } activeTabId={this.state.activeTabId} changeCategory={this.changeCategory} categoryArr={this.state.categoryArr}></TabCard> : null}
            </div>
        )
    }
}

export default Header;
