import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import axios from 'axios';
import IScroll from 'iscroll';

import Card from '../Card';

import EventBus from '../../EventBus';


class Body extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        };

        this.loadMore = this.loadMore.bind(this);
        this.toTop = this.toTop.bind(this);

        EventBus.addListener('changeCategory', (containerid) => {
            axios({
                url: '/api/container/getIndex',
                params: {
                    containerid: containerid,
                    openApp: 0
                }
            }).then(res => {
                let cards = res.data.data.cards
                this.setState({
                    cards: cards
                });
                this.toTop();
            }).catch(err => console.log(err));
        });
    }

    //当打开页面的时候，自动请求热门标签的数据
    componentWillMount() {
        axios({
            url: '/api/container/getIndex',
            params: {
                containerid: '102803_ctg1_4388_-_ctg1_4388',
                openApp: 0
            }
        }).then(res => {
            let cards = res.data.data.cards
            this.setState({
                cards: cards
            });

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, {
                capture: false,
                passive: false
            });

        }).catch(err => console.log(err));
    }

    componentDidUpdate() {

        //这里要注意，一定要render以后，再执行这个构造函数
        if (!this.BodyScroll) {
            this.BodyScroll = new IScroll('.wrapper', {
                scrollbars: true
            });

            this.BodyScroll.refresh();

            this.BodyScroll.on('scrollEnd', () => {
                let a = this.BodyScroll.maxScrollY;
                let b = this.BodyScroll.y;
                if (a === b) {
                    this.loadMore();
                }

                //topIcon的显示与隐藏
                if (b < -1000) {
                    this.topIcon.style.display = 'block';

                } else {
                    this.topIcon.style.display = 'none';
                }
            });
        } else {
            //重新刷新一下IScroll,让它知道新DOM的高度
            this.BodyScroll.refresh();
        }
    }

    loadMore() {
        axios({
            url: '/api/container/getIndex',
            params: {
                containerid: '102803_ctg1_4388_-_ctg1_4388',
                openApp: 0,
                since_id: 1
            }
        }).then(res => {
            let cards1 = this.state.cards;

            let cards2 = res.data.data.cards

            let cards3 = cards1.concat(cards2);

            this.setState({
                cards: cards3
            });
        }).catch(err => console.log(err));
    }

    toTop() {
        this.BodyScroll.scrollTo(0, 0);
        this.topIcon.style.display = 'none';
    }

    render() {
        return (
            <div className="Body wrapper">
                <div className="scroller">
                    {this.state.cards.map((item, index) => <Card key={index} mblog={item.mblog}></Card>)}
                </div>
                <div ref={el => this.topIcon = el} className="Top" onClick={this.toTop}>Top</div>
            </div>
        )
    }
}

export default Body;
