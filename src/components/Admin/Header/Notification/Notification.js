import React from 'react';
import './Notification.css';
import $ from 'jquery';


class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowNotify: false
        }
        this.wrapperRef = React.createRef();
        this.showNotify = this.showNotify.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isShowNotify !== this.state.isShowNotify) {
            if (this.state.isShowNotify) {
                $('.list-notify').slideDown(200);
            } else {
                $('.list-notify').slideUp(200);
            }
        }
    }
    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(e.target)) {
            this.setState({ isShowNotify: false });
        }
    }
    showNotify() {
        this.setState({ isShowNotify: !this.state.isShowNotify });
    }
    render() {
        return (
            <div className='notify' ref={this.wrapperRef}>
                <div className='notify-icon' onClick={this.showNotify}>
                    <div className='ntf-icon'>
                        <i className="fa fa-bell" aria-hidden="true"></i>
                        <span>3</span>
                    </div>
                    <span className='ntf-tt'>&nbsp;&nbsp;Thông báo</span>
                </div>
                <div className='list-notify'>
                    <div className='header-ntf'>
                        <span>Thông báo</span>
                    </div>
                    <div className='content-ntf'>
                        <ul className='list-ntf'>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                            <li className='item-ntf'>
                                <h2>Tiêu đề thông báo</h2>
                                <p>lorem ipsum dolor sit amet consectetuer...</p>
                                <span>13:10 &middot; 13-02-2021</span>
                            </li>
                        </ul>
                    </div>
                    <div className='footer-ntf'>
                        <span>Xem tất cả</span>
                    </div>
                </div>
            </div>
        );
    }
}
export default Notification;