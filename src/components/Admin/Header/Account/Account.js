import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import './Account.css';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenuAcc: false
        }
        this.wrapRef = React.createRef();
        this.showMenuAccount = this.showMenuAccount.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isShowMenuAcc !== this.state.isShowMenuAcc) {
            if (this.state.isShowMenuAcc) {
                $('.acc-menu').slideDown(200);
            } else {
                $('.acc-menu').slideUp(200);
            }
        }
    }
    handleClickOutside(e) {
        if (this.wrapRef && !this.wrapRef.current.contains(e.target)) {
            this.setState({ isShowMenuAcc: false });
        }
    }
    showMenuAccount() {
        this.setState({ isShowMenuAcc: !this.state.isShowMenuAcc });
    }
    render() {
        return (
            <div className='acc-admin' ref={this.wrapRef}>
                <div className='admin' onClick={this.showMenuAccount}>
                    <img src={`${process.env.REACT_APP_DOMAIN}/image/account/account-2.png`} alt="" />
                    <span>Bá Long &nbsp;</span>
                </div>
                <div className='acc-menu'>
                    <ul>
                        <li>
                            <Link to='/admin/account-admin'>Cài đặt</Link>
                        </li>
                        <li>
                            <Link to='#'>Đăng xuất</Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Account;