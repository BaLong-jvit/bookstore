import React, { createRef } from 'react';
import './MenuSetting.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class MenuSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: false
        }
        this.wrapRef = createRef();
        this.showHideMenu = this.showHideMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUpdate(prevProps, PrevState) {
        if (PrevState.isShowMenu !== this.state.isShowMenu) {
            if (this.state.isShowMenu) {
                $('.sub-st').slideDown(200);
            } else {
                $('.sub-st').slideUp(200);
            }
        }
    }
    handleClickOutside(e) {
        if (this.wrapRef && !this.wrapRef.current.contains(e.target)) {
            this.setState({ isShowMenu: false });
        }
    }
    showHideMenu() {
        this.setState({ isShowMenu: !this.state.isShowMenu });
    }
    render() {
        return (
            <div ref={this.wrapRef}>
                <div onClick={this.showHideMenu} className='sub-pr'>
                    <i className="fa fa-wrench" aria-hidden="true"></i>&nbsp;
                    Cài đặt
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {
                        (this.state.isShowMenu) ? (<i className="fa fa-chevron-down" aria-hidden="true"></i>) : (
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        )
                    }</div>
                <ul className='sub-st'>
                    <li>
                        <Link to='/admin/setting/contact'>Thông tin liên hệ</Link>
                    </li>
                    <li>
                        <Link to='/admin/setting/about'>Giới thiệu</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
export default MenuSetting;