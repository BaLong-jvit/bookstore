import React from 'react';
import { Link } from 'react-router-dom';
import {
    Container,
    Row, Col,
    Nav, ButtonGroup,
    Button,
    DropdownButton,
    Dropdown, Navbar, NavDropdown, Modal, Form
} from 'react-bootstrap';

import './Header.css';
import logo from './logo.png';
import $ from 'jquery';

import SearchBar from './SearchBar/SearchBar';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            localShop: [],
            isLogin: false,
            showLogin: false,
            showSignIn: false,
            loginNotify: '',
            username: '',
            password: '',
            acceptName: true,
            acceptPassword: true,
            reName: '',
            disName: '',
            regisPassword: '',
            rePassword: '',
        }
        this.showFormLogin = this.showFormLogin.bind(this);
        this.hideFormLogin = this.hideFormLogin.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.showLoginNotify = this.showLoginNotify.bind(this);
        this.showRegister = this.showRegister.bind(this);
        this.hideRegister = this.hideRegister.bind(this);
        this.submitRegister = this.submitRegister.bind(this);

        this.handleDisName = this.handleDisName.bind(this);
        this.handleReName = this.handleReName.bind(this);
        this.handleRegisPassword = this.handleRegisPassword.bind(this);
        this.handleRePassword = this.handleRePassword.bind(this);
    }
    componentDidMount() {
        this.getContact();
        this.getLocalShop();
        this.checkLogin();
    }

    checkLogin() {
        if (localStorage.username && localStorage.password) {
            this.setState({ isLogin: true })
        } else {
            this.setState({ isLogin: false })
        }
    }
    getContact() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/contact/get-contact-infor`).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({ contact: responseJson.contact });
        })
    }
    getLocalShop() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/shops/get-local-shops`).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({ localShop: responseJson.localshop });
        })
    }
    showFormLogin(e) {
        e.preventDefault();
        this.hideRegister();
        this.setState({ showLogin: true })
    }
    hideFormLogin() {
        this.setState({ showLogin: false });
    }
    submitLogin(e) {
        e.preventDefault();
        const header = {
            username: this.state.username,
            password: this.state.password
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/check-login`, {
            method: 'GET',
            headers: header
        }
        ).then(response => { return response.json() }).then(responseJson => {
            if (responseJson.message === 'success') {
                localStorage.username = this.state.username;
                localStorage.password = this.state.password;
                this.setState({ isLogin: true });
                this.setState({ showLogin: false });
                this.showLoginNotify('Đăng nhập thành công');
            } else {
                this.showLoginNotify('Đăng nhập thất bại');
            }
        })
    }
    showLoginNotify(mess) {
        this.setState({ loginNotify: `${mess}` });
        if (this.state.isLogin) {

            $('#login-notify').css({
                display: 'block',
                backgroundColor: '#fdb45e'
            });
        } else {

            $('#login-notify').css({
                display: 'block',
                backgroundColor: '#c7c5c3'
            });
        }
        setTimeout(() => {
            $('#login-notify').css('display', 'none');
        }, 800);
    }
    handleUsername(e) {
        this.setState({ username: e.target.value });
    }
    handlePassword(e) {
        this.setState({ password: e.target.value });
    }

    handleDisName(e) {
        this.setState({ disName: e.target.value });
    }
    handleReName(e) {
        this.setState({ reName: e.target.value });
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/check-username/${e.target.value}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(js => {
            if (js.message === 'success') {
                this.setState({ acceptName: true })
            } else {
                this.setState({ acceptName: false })
            }
        })
    }
    handleRePassword(e) {
        this.setState({ rePassword: e.target.value });
        if (e.target.value === this.state.regisPassword) {
            this.setState({ acceptPassword: true })
        } else {
            this.setState({ acceptPassword: false })
        }
    }
    handleRegisPassword(e) {
        this.setState({ regisPassword: e.target.value });
        if (this.state.rePassword === e.target.value) {
            this.setState({ acceptPassword: true })
        } else {
            this.setState({ acceptPassword: false })
        }
    }
    showRegister() {
        this.hideFormLogin();
        this.setState({ showSignIn: true })
    }
    hideRegister() {
        this.setState({ showSignIn: false })
    }
    submitRegister(e) {

        e.preventDefault();
        if (this.state.acceptName && this.state.acceptPassword) {
            const data = {
                username: this.state.reName,
                name: this.state.disName,
                password: this.state.regisPassword
            }
            fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: data })
            }).then(res => { return res.json() }).then(jsRes => {
                if (jsRes.message === 'success') {
                    localStorage.username = this.state.reName;
                    localStorage.password = this.state.rePassword;
                    this.setState({ isLogin: true });
                    this.setState({ showRegister: false });
                    this.showLoginNotify('Đăng ký thành công');
                } else {
                    this.showLoginNotify('Đăng ký thất bại');
                }
            })
        }
    }
    render() {
        return (
            <header id="header">
                <div id='login-notify'>
                    <p>{this.state.loginNotify}</p>
                </div>
                <div className="header_top">
                    <Container fluid='sm'>
                        <Row>
                            <Col sm={6}>
                                <div className="contactinfo">
                                    <ul className="nav nav-pills">
                                        <li><Link to="/#"><i className="fa fa-phone"></i> +{this.state.contact.phonenumber}	&nbsp;	&nbsp;</Link></li>
                                        <li>
                                            <address>
                                                <Link to="/#"><i className="fa fa-envelope"></i> {this.state.contact.email}</Link>
                                            </address>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={6}>
                                <Nav className="justify-content-end">
                                    <Nav.Item><Nav.Link href={this.state.contact.facebook} target="_blank"><i className="fa fa-facebook"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.twitter} target="_blank"><i className="fa fa-twitter"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.instagram} target="_blank"><i className="fa fa-linkedin"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.zalo} target="_blank" className='fa-zalo'><i className='fa'></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.youtube} target="_blank" className='fa-youtb'><i className="fa fa-youtube"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.google} target="_blank"><i className="fa fa-google-plus"></i></Nav.Link></Nav.Item>
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="header-middle">
                    <Container fluid='sm'>
                        <Row>
                            <Col sm={6}>
                                <div className="logo pull-left">
                                    <Link to="/"><img src={logo} alt="" /></Link>
                                </div>

                            </Col>
                            <Col sm={6}>
                                <Nav className="justify-content-end shop-menu">
                                    {
                                        this.state.isLogin ? (
                                            <Nav.Item><Nav.Link href='/account'><i className="fa fa-user"></i> Tài khoản</Nav.Link></Nav.Item>
                                        ) : (<div></div>)
                                    }
                                    <Nav.Item><Nav.Link href='/about'><i className="fa fa-star"></i> Về chúng tôi</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href='/contact'><i className="fa fa-crosshairs"></i> Liên hệ</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href="/cart" className='login active'><i className="fa fa-shopping-cart"></i> Giỏ hàng</Nav.Link></Nav.Item>
                                    {(!this.state.isLogin) ? (
                                        <div>
                                            <Nav.Item><Nav.Link href="/" onClick={this.showFormLogin} className='login'><i className="fa fa-lock"></i> Đăng nhập</Nav.Link></Nav.Item>
                                            <Modal show={this.state.showLogin} onHide={this.hideFormLogin}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Đăng nhập</Modal.Title>
                                                </Modal.Header>
                                                <Form id='login-form' onSubmit={this.submitLogin}>
                                                    <Modal.Body>
                                                        <Form.Group controlId='username'>
                                                            <Form.Control type="text" name="username" required="required" placeholder="Tên đăng nhập" onChange={this.handleUsername} value={this.state.username} />
                                                        </Form.Group>
                                                        <Form.Group controlId='password'>
                                                            <Form.Control type="password" name="password" required="required" placeholder="Mật khẩu" onChange={this.handlePassword} value={this.state.password} />
                                                        </Form.Group>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={this.hideFormLogin}>Hủy</Button>
                                                        <Button variant="" className='btn-login' onClick={this.showRegister}>Đăng ký</Button>
                                                        <Button variant="" className='btn-login' type='submit'>Đăng nhập</Button>
                                                    </Modal.Footer>
                                                </Form>
                                            </Modal>
                                            <Modal show={this.state.showSignIn} onHide={this.hideRegister}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Đăng ký</Modal.Title>
                                                </Modal.Header>
                                                <Form id='regis-form' onSubmit={this.submitRegister}>
                                                    <Modal.Body>
                                                        <Form.Group controlId='regis-name'>
                                                            {
                                                                (!this.state.acceptName) ? (
                                                                    <p style={{ color: 'red' }}>Tên đăng nhập không hợp lệ</p>
                                                                ) : (<div></div>)
                                                            }
                                                            <Form.Control type="text" name="regis-name" required="required" placeholder="Tên đăng ký" onChange={this.handleReName} value={this.state.reName} />
                                                        </Form.Group>
                                                        <Form.Group controlId='dis-name'>
                                                            <Form.Control type="text" name="dis-name" required="required" placeholder="Tên hiển thị" onChange={this.handleDisName} value={this.state.disName} />
                                                        </Form.Group>

                                                        <Form.Group controlId='regis-pass'>
                                                            <Form.Control type="password" name="regis-pass" required="required" placeholder="Mật khẩu" onChange={this.handleRegisPassword} value={this.state.regisPassword} />
                                                        </Form.Group>
                                                        <Form.Group controlId='re-pass'>
                                                            <Form.Control type="password" name="re-pass" required="required" placeholder="Mật khẩu xác nhận" onChange={this.handleRePassword} value={this.state.rePassword} />
                                                            {
                                                                (!this.state.acceptPassword) ? (
                                                                    <p style={{ color: 'red' }}>Mật khẩu không khớp nhau</p>
                                                                ) : (<div></div>)
                                                            }
                                                        </Form.Group>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={this.hideRegister}>Hủy</Button>
                                                        <Button variant="" className='btn-login' onClick={this.showFormLogin}>Đăng nhập</Button>
                                                        <Button variant="" className='btn-login' type='submit'>Đăng ký</Button>
                                                    </Modal.Footer>
                                                </Form>
                                            </Modal>
                                        </div>

                                    ) : (
                                        <div></div>
                                    )}
                                </Nav>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="header-bottom">
                    <Container fluid='sm'>
                        <Row>
                            <Col md={8}>
                                <Navbar bg="light" expand="md">
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="mr-auto">
                                            <Nav.Link href="/" className="active">Trang chủ</Nav.Link>
                                            <NavDropdown title="Cửa hàng" id="product-nav-dropdown" className="drop-menu">
                                                {this.state.localShop && this.state.localShop.map((local, key) => {
                                                    return <NavDropdown.Item key={key} href={`/list-shop/${local.routine_city}`}>{local.city}</NavDropdown.Item>
                                                })}
                                                <NavDropdown.Item href={`/list-shop/tat-ca`}>Tất cả hệ thống</NavDropdown.Item>
                                            </NavDropdown>

                                            <Nav.Link href="/blog" >Blog</Nav.Link>
                                            <Nav.Link href="/" >404</Nav.Link>
                                            <Nav.Link href="/" >Contact</Nav.Link>
                                        </Nav>

                                    </Navbar.Collapse>
                                </Navbar>
                            </Col>
                            <Col md={4}>
                                <SearchBar />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </header >
        );
    }
}
export default Header;