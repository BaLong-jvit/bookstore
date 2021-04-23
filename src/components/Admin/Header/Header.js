import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from './logo.png';
import Notification from './Notification/Notification';
import Account from './Account/Account';
import $ from 'jquery';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: ''
        }
        this.changeSearchKey = this.changeSearchKey.bind(this);
    }

    changeSearchKey(e) {
        this.setState({ searchKey: e.target.value });
    }
    showHideMenu() {
        if ($('.left-menu').hasClass('show')) {
            $('.left-menu').removeClass('show');
            $('.main-admin').removeClass('show');
        } else {
            $('.left-menu').addClass('show');
            $('.main-admin').addClass('show');
        }
    }
    render() {
        return (
            <div className='header'>
                <Link to="/admin"><img className='logo' src={logo} alt="" /></Link>
                <Button className='btn-show-menu' variant='' onClick={this.showHideMenu}><i className="fa fa-bars" aria-hidden="true"></i></Button>
                <ul className='right-menu'>
                    <li>
                        <div className='hd-search'>
                            <input type="text" value={this.state.searchKey} placeholder='Search' id='hd-search' onChange={this.changeSearchKey} />
                            <Button className='btn-hd-search' variant=''><i className="fa fa-search" aria-hidden="true"></i></Button>
                        </div>
                    </li>
                    <li>
                        <Notification />
                    </li>
                    <li>
                        <Account />
                    </li>
                </ul>
            </div>
        );
    }
}
export default Header;