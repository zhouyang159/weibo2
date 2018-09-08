import React, { Component } from 'react';
import './index.css';

import axios from 'axios';

import Card from '../Card';

import EventBus from '../../EventBus';


class Body extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};

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
            }).catch(err => console.log(err));

            setTimeout(() => {
                axios({
                    url: '/api/container/getIndex',
                    params: {
                        containerid: containerid,
                        openApp: 0,
                        since_id: 1
                    }
                }).then(res => {
                    let cards2 = res.data.data.cards

                    let cards1 = this.state.cards;

                    let cards3 = cards1.concat(cards2);
                    
                    this.setState({
                        cards: cards3
                    });
                }).catch(err => console.log(err));
            },10000);
        });
    }

    componentWillMount() {
        //当打开页面的时候，自动请求热门标签的数据
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
        }).catch(err => console.log(err));
    }

    //===================================

    // componentWillMount(){
    //     window.addEventListener('scroll', function(){
    //         console.log(9999);
    //     });
    // }

    componentDidMount() {
        // console.log(this);
        // let list = this.list;

        window.addEventListener('scroll', function () {
            console.log(1212121);
        });

        // list.onscroll = function(){
        //     console.log(34343434);
        // }

    }

    //=================================================================================

    render() {
        return (
            <div className="Body">
                <ul ref={node => this.list = node} onScroll={() => { console.log(888888); }}>
                    {this.state.cards ? this.state.cards.map((item, index) => <Card key={index} mblog={item.mblog}></Card>) : null}
                </ul>
            </div>
        )
    }
}

export default Body;
