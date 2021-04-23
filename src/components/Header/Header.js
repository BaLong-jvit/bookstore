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
            loginNotify: '',
            username: '',
            password: ''
        }
        this.showFormLogin = this.showFormLogin.bind(this);
        this.hideFormLogin = this.hideFormLogin.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.showLoginNotify = this.showLoginNotify.bind(this);
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
                this.showLoginNotify();
            } else {
                this.showLoginNotify();
            }
        })
    }
    showLoginNotify() {
        if (this.state.isLogin) {
            this.setState({ loginNotify: 'Đăng nhập thành công' });
            $('#login-notify').css({
                display: 'block',
                backgroundColor: '#fdb45e'
            });
        } else {
            this.setState({ loginNotify: 'Đăng nhập thất bại' });
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
                                <ButtonGroup>
                                    <DropdownButton as={ButtonGroup} title='USA' id='usa' className='usa' variant="">
                                        <Dropdown.Item eventKey="1" to='/#'>
                                            Canada
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2" to='/#'>
                                            Uk
                                        </Dropdown.Item>
                                    </DropdownButton>

                                    <DropdownButton as={ButtonGroup} title='DOLLAR' id='dollar' className='usa' variant="">
                                        <Dropdown.Item eventKey="1" to='/#'>
                                            Canada Dollar
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2" to='/#'>
                                            Pound
                                        </Dropdown.Item>
                                    </DropdownButton>
                                </ButtonGroup>
                            </Col>
                            <Col sm={6}>
                                <Nav className="justify-content-end shop-menu">
                                    {
                                        this.state.isLogin ? (
                                            <Nav.Item><Nav.Link href='/account'><i className="fa fa-user"></i> Account</Nav.Link></Nav.Item>
                                        ) : (<div></div>)
                                    }
                                    <Nav.Item><Nav.Link href='/about'><i className="fa fa-star"></i> About us</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href='/contact'><i className="fa fa-crosshairs"></i> Contact</Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href="/cart" className='login active'><i className="fa fa-shopping-cart"></i> Cart</Nav.Link></Nav.Item>
                                    {(!this.state.isLogin) ? (
                                        <div>
                                            <Nav.Item><Nav.Link href="/" onClick={this.showFormLogin} className='login'><i className="fa fa-lock"></i> Login</Nav.Link></Nav.Item>
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
                                                        <Button variant="" className='btn-login' type='submit'>Đăng nhập</Button>
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
                                            <Nav.Link href="/" className="active">Home</Nav.Link>
                                            <NavDropdown title="Shop" id="product-nav-dropdown" className="drop-menu">
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