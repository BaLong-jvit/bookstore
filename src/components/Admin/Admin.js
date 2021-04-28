import React from 'react';
import { Link, BrowserRouter as Router, withRouter, Switch, Route } from 'react-router-dom';
import Account from './Account/Account';
import AccountTrash from './Account/AccountTrash';
import './Admin.css';
import AdminAccount from './AdminAccount/AdminAccount';
import Bills from './Bills/Bills';
import Contact from './Contact/Contact';
import Dashboard from './Dashboard/Dashboard';
import Header from './Header/Header';
import MenuSetting from './Menu/MenuSetting/MenuSetting';
import MenuUpdate from './Menu/MenuUpdate/MenuUpdate';
import Setting from './Setting/Setting';
import Update from './Update/Update';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.checkLogin = this.checkLogin.bind(this);
    }
    componentDidMount() {
        this.checkLogin(localStorage.adminuser, localStorage.adminpass);
    }
    checkLogin(adminuser, adminpass) {
        if (adminuser && adminpass) {
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/login/accounts/check-account`, {
                method: 'GET',
                headers: {
                    adminuser: adminuser,
                    adminpass: adminpass
                }
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'failed') {
                    localStorage.removeItem('adminuser');
                    localStorage.removeItem('adminpass');
                    this.props.history.push('/login');
                }
            });
        } else {
            localStorage.removeItem('adminuser');
            localStorage.removeItem('adminpass');
            this.props.history.push('/login');
        }
    }
    render() {
        return (
            <Router>
                <div className='admin-page'>
                    <div className='header'>
                        <Header />
                    </div>
                    <div className='content'>
                        <div className='left-menu'>
                            <ul>
                                <li>
                                    <Link to='/admin'><i className="fa fa-tachometer" aria-hidden="true"></i>&nbsp;Tổng quan</Link>
                                </li>
                                <li className='pr-sub'>
                                    <MenuUpdate />
                                </li>
                                <li className='pr-sub'>
                                    <MenuSetting />
                                </li>
                                <li>
                                    <Link to='/admin/contact'>
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        &nbsp;Liên hệ</Link>
                                </li>
                                <li>
                                    <Link to='/admin/bills'>
                                        <i className="fa fa-archive" aria-hidden="true"></i>
                                    &nbsp;Đơn hàng</Link>
                                </li>
                                <li>
                                    <Link to='/admin/account'>
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    &nbsp;Quản lý tài khoản</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='main-admin'>
                            <Switch>
                                <Route exact path='/admin'>
                                    <Dashboard />
                                </Route>
                                <Route path='/admin/update/:typeUpdate'>
                                    <Update />
                                </Route>
                                <Route path='/admin/setting/:typeSetting'>
                                    <Setting />
                                </Route>
                                <Route path='/admin/contact'>
                                    <Contact />
                                </Route>
                                <Route path='/admin/bills'>
                                    <Bills />
                                </Route>
                                <Route path='/admin/account/trash'>
                                    <AccountTrash />
                                </Route>
                                <Route path='/admin/account'>
                                    <Account />
                                </Route>
                                <Route path='/admin/account-admin'>
                                    <AdminAccount />
                                </Route>
                            </Switch>
                        </div>
                        <div className='footer'></div>
                    </div>

                </div>
            </Router>

        )
    }
}
export default withRouter(Admin);