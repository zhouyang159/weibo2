import React, { Component } from 'react';
import './index.css';

import axios from 'axios';

import BigImgBox from './BigImgBox';


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
                    <div>
                        华为Mate20，无语了！ ​​​
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

    state = {}

    changeCards(containerId){
        console.log(containerId);
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

    componentWillReceiveProps(nextProps){
        axios({
            url: '/api/container/getIndex',
            params: {
                containerid: nextProps.containerId,
                openApp: 0
            }
        }).then( res => {
            let cards = res.data.data.cards
            this.setState({
                cards: cards
            });
        }).catch( err => console.log(err));
    }

    render(){
        return(
            <div className="Body">
                <ul>
                    {this.state.cards ? this.state.cards.map( item => <Card key={item.itemid} item={item}></Card> ) : null}
                </ul>
            </div>
        )
    }
}



export default Body;
