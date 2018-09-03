import React, { Component } from 'react';
import './index.css';

import axios from 'axios';

import BigImgBox from './BigImgBox';

import EventBus from '../../EventBus';
 


class Card extends React.Component {

    state = {
        showBigPic : false,
        bigPicUrl : undefined
    }

    showBigPic(){
        let pics = this.props.item.mblog.pics
        this.setState({
            showBigPic: !this.state.showBigPic,
            pics: pics
        });

    }


    componentDidMount(){
        this.cardBodyText.innerHTML = this.props.item.mblog.text;
    }

    render(){
        let { item } = this.props
        return(
            <div className="Card">
                <div className="card_header">
                    <div className="avatar">
                        <img src={item.mblog.user.avatar_hd}/>
                    </div>
                    <div className="card_header_content">
                        <div>
                            {item.mblog.user.screen_name}
                        </div>
                        <div>
                            {item.mblog.created_at} 来自 {item.mblog.source}
                        </div>
                    </div>
                    <div>
                        <button>关注</button>
                    </div>
                </div>
                <div className="card_body">
                    <div ref={ node => this.cardBodyText = node}>

                    </div>
                    {
                        item.mblog.pics ? 
                        <div className="pics">
                            <ul>
                                {item.mblog.pics.map( (item, index) => {
                                    return  <li key={index} style={{width: "32%"}} onClick={this.showBigPic.bind(this)} >
                                                <img style={{width: '100%'}} src={item.url}></img>
                                            </li>
                                })}
                            </ul>
                        </div>
                        : null
                    }
                </div>
                <div className="card_footer">
                    <div className="footer_left_buttons">
						<ul>
							<li>
                                <i className="iconfont icon-zhuanfa"></i>
                                &nbsp;{item.mblog.reposts_count}
                            </li>
							<li>
                                <i className="iconfont icon-pinglun"></i>
                                &nbsp;{item.mblog.comments_count}
                            </li>
							<li>
                                <i className="iconfont icon-zan1-copy"></i>
                                &nbsp;{item.mblog.attitudes_count}
                            </li>
						</ul>
					</div>
                    <div>
                        <i className="iconfont icon-more_iconx"></i>
					</div>
                </div>

                {this.state.showBigPic ? <BigImgBox pics={this.state.pics} hideBigPic={() => this.setState({showBigPic: !this.state.showBigPic}) }></BigImgBox> : null}
                
            </div>
        )
    }
}


class Body extends React.Component {


    constructor(props){
        super(props);
        this.state = {};

        EventBus.addListener('changeCategory', (containerid) => {
            axios({
                url: '/api/container/getIndex',
                params: {
                    containerid: containerid,
                    openApp: 0
                }
            }).then( res => {
                let cards = res.data.data.cards
                this.setState({
                    cards: cards
                });
            }).catch( err => console.log(err));
        
        });
    }

    componentWillMount(){
        //当打开页面的时候，自动请求热门标签的数据
        axios({
            url: '/api/container/getIndex',
            params:{
                containerid: '102803_ctg1_4388_-_ctg1_4388',
                openApp: 0
            }
        }).then( res => {
            let cards = res.data.data.cards
            this.setState({
                cards: cards
            });
        }).catch( err => console.log(err));
    }

    //===================================

    // componentWillMount(){
    //     window.addEventListener('scroll', function(){
    //         console.log(9999);
    //     });
    // }

    componentDidMount(){
        // console.log(this);
        // let list = this.list;

        window.addEventListener('scroll', function(){
            console.log(1212121);
        });

        // list.onscroll = function(){
        //     console.log(34343434);
        // }

    }

    //=================================================================================

    render(){
        return(
            <div className="Body">
                <ul ref={ node => this.list = node} onScroll={() => {console.log(888888);}}>
                    {this.state.cards ? this.state.cards.map( item => <Card key={item.itemid} item={item}></Card> ) : null}
                </ul>
            </div>
        )
    }
}

export default Body;
