import React, { Component } from 'react';
import './index.css';

import { Link } from 'react-router-dom';

import BigImgBox from '../BigImgBox';


class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showBigPic: false,
            bigPicUrl: undefined
        }
        // this.a = this.a.bind(this);
    }

    showBigPic() {
        let pics = this.props.mblog.pics
        this.setState({
            showBigPic: !this.state.showBigPic,
            pics: pics
        });
    }
    render() {
        let { mblog } = this.props;
        let pathname = `/profile/${mblog.user.id}`;

        return (
            <div className="Card">
                <div className="card_header">
                    <div className="avatar">
                        <img src={mblog.user.avatar_hd} />
                    </div>
                    <div className="card_header_content">
                        <Link to={{ pathname: pathname }}>
                            <div>
                                {mblog.user.screen_name}
                            </div>
                        </Link>
                        <div>
                            {mblog.created_at} 来自 {mblog.source}
                        </div>
                    </div>
                    <div>
                        <button>关注</button>
                    </div>
                </div>
                <div className="card_body">
                    <Link to={{ pathname: `/detail/${mblog.id}`, mblog: mblog }}>
                        <div dangerouslySetInnerHTML={{ __html: this.props.mblog.text }} ></div>
                    </Link>

                    {
                        mblog.pics &&
                        <div className="pics">
                            <ul>
                                {mblog.pics.map((item, index) => {
                                    return (<li key={index} style={{ width: "32%" }}>
                                                {/* <Link> */}
                                                    <img style={{ width: '100%' }} src={item.url}></img>
                                                {/* </Link> */}
                                            </li>)
                                })}
                            </ul>
                        </div>
                    }
                </div>
                <div className="card_footer">
                    <div className="footer_left_buttons">
                        <ul>
                            <li>
                                <i className="iconfont icon-zhuanfa"></i>
                                &nbsp;{mblog.reposts_count}
                            </li>
                            <li>
                                <i className="iconfont icon-pinglun"></i>
                                &nbsp;{mblog.comments_count}
                            </li>
                            <li>
                                <i className="iconfont icon-zan1-copy"></i>
                                &nbsp;{mblog.attitudes_count}
                            </li>
                        </ul>
                    </div>
                    <div>
                        <i className="iconfont icon-more_iconx"></i>
                    </div>
                </div>

                {/* {this.state.showBigPic ? <BigImgBox pics={this.state.pics} hideBigPic={() => this.setState({ showBigPic: !this.state.showBigPic })}></BigImgBox> : null} */}

            </div>
        )
    }
}

export default Card;
