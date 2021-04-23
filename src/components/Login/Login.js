import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Login.css';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.checkLogin = this.checkLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.onSubmitLogin = this.onSubmitLogin.bind(this);
    }
    componentDidMount() {
        document.title = 'Đăng nhập trang quản trị | Bá Long BookStore';
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
                if (jsonResponse.message === 'success') {
                    this.props.history.push('/admin');
                } else {
                    localStorage.removeItem('adminuser');
                    localStorage.removeItem('adminpass');
                }
            });
        }
    }
    handleUsername(e) {
        this.setState({ username: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value });
    }
    onSubmitLogin() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/login/accounts/check-account`, {
            method: 'GET',
            headers: {
                adminuser: this.state.username,
                adminpass: this.state.password
            }
        }).then(response => { return response.json() }).then(jsonResponse => {
            if (jsonResponse.message === 'success') {
                localStorage.adminuser = this.state.username;
                localStorage.adminpass = this.state.password;
                this.props.history.push('/admin');
            } else {
                this.loginFail();
                this.setState({ username: '', password: '' });

            }
        });
    }
    loginFail() {
        $('#login-notify').css({
            display: 'block',
            backgroundColor: '#c7c5c3'
        });
        setTimeout(() => {
            $('#login-notify').css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <div className='wp-login'>
                <div id='login-notify'>
                    <p>Đăng nhập thất bại</p>
                </div>
                <div className='main-login'>
                    <h2>Đăng nhập hệ thống</h2>
                    <Form id='login-admin'>
                        <Form.Group controlId='username'>
                            <Form.Control type="text" name="username" required="required" placeholder="Tên đăng nhập" onChange={this.handleUsername} value={this.state.username} />
                        </Form.Group>
                        <Form.Group controlId='password'>
                            <Form.Control type="password" name="password" required="required" placeholder="Mật khẩu" onChange={this.handlePassword} value={this.state.password} />
                        </Form.Group>
                        <Button variant="" className='btn-login-admin' onClick={this.onSubmitLogin}>Đăng nhập</Button>
                    </Form>

                </div>
            </div>
        );
    }
}
export default withRouter(Login);