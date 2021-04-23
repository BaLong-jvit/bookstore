import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

class Footer extends React.Component {
    render() {
        return (
            <footer id="footer">
                <div className="footer-top">
                    <Container fluid='sm'>
                        <Row>
                            <Col sm={2}>
                                <div className="companyinfo">
                                    <h2><span>B-Long</span> BookStore</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor</p>
                                </div>
                            </Col>
                            <Col sm={7}>
                                <Row>
                                    <Col sm={3}>
                                        <div className="video-gallery text-center">
                                            <Link to="/#">
                                                <div className="iframe-img">
                                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/footer/iframe1.png`} alt="" />
                                                </div>
                                                <div className="overlay-icon">
                                                    <i className="fa fa-play-circle-o"></i>
                                                </div>
                                            </Link>
                                            <p>Circle of Hands</p>
                                            <h2>24 DEC 2014</h2>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div className="video-gallery text-center">
                                            <Link to="/#">
                                                <div className="iframe-img">
                                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/footer/iframe2.png`} alt="" />
                                                </div>
                                                <div className="overlay-icon">
                                                    <i className="fa fa-play-circle-o"></i>
                                                </div>
                                            </Link>
                                            <p>Circle of Hands</p>
                                            <h2>24 DEC 2014</h2>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div className="video-gallery text-center">
                                            <Link to="/#">
                                                <div className="iframe-img">
                                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/footer/iframe3.png`} alt="" />
                                                </div>
                                                <div className="overlay-icon">
                                                    <i className="fa fa-play-circle-o"></i>
                                                </div>
                                            </Link>
                                            <p>Circle of Hands</p>
                                            <h2>24 DEC 2014</h2>
                                        </div>
                                    </Col>
                                    <Col sm={3}>
                                        <div className="video-gallery text-center">
                                            <Link to="/#">
                                                <div className="iframe-img">
                                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/footer/iframe4.png`} alt="" />
                                                </div>
                                                <div className="overlay-icon">
                                                    <i className="fa fa-play-circle-o"></i>
                                                </div>
                                            </Link>
                                            <p>Circle of Hands</p>
                                            <h2>24 DEC 2014</h2>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={3}>
                                <div className="address">
                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/footer/map.png`} alt="" />
                                    <p>505 S Atlantic Ave Virginia Beach, VA(Virginia)</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="footer-widget">
                    <Container fluid='sm'>
                        <Row>
                            <Col sm={2}>
                                <div className="single-widget">
                                    <h2>Service</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><Link to="/#">Online Help</Link></li>
                                        <li><Link to="/#">Contact Us</Link></li>
                                        <li><Link to="/#">Order Status</Link></li>
                                        <li><Link to="/#">Change Location</Link></li>
                                        <li><Link to="/#">FAQ’s</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="single-widget">
                                    <h2>Quock Shop</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><Link to="/#">T-Shirt</Link></li>
                                        <li><Link to="/#">Mens</Link></li>
                                        <li><Link to="/#">Womens</Link></li>
                                        <li><Link to="/#">Gift Cards</Link></li>
                                        <li><Link to="/#">Shoes</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="single-widget">
                                    <h2>Policies</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><Link to="/#">Terms of Use</Link></li>
                                        <li><Link to="/#">Privecy Policy</Link></li>
                                        <li><Link to="/#">Refund Policy</Link></li>
                                        <li><Link to="/#">Billing System</Link></li>
                                        <li><Link to="/#">Ticket System</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={2}>
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <ul className="nav nav-pills nav-stacked">
                                        <li><Link to="/#">Company Information</Link></li>
                                        <li><Link to="/#">Careers</Link></li>
                                        <li><Link to="/#">Store Location</Link></li>
                                        <li><Link to="/#">Affillate Program</Link></li>
                                        <li><Link to="/#">Copyright</Link></li>
                                    </ul>
                                </div>
                            </Col>
                            <Col sm={4}>
                                <div className="single-widget">
                                    <h2>About Shopper</h2>
                                    <form action="#" className="searchform">
                                        <input type="text" placeholder="Your email address" />
                                        <button type="submit" className="btn btn-default"><i
                                            className="fa fa-arrow-circle-o-right"></i></button>
                                        <p>Get the most recent updates from <br />our site and be updated your self...</p>
                                    </form>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="footer-bottom">
                    <Container fluid='sm'>
                        <Row>
                            <p className="pull-left">Copyright © 2021 B-Long BookStore Inc. All rights reserved.</p>
                            <p className="pull-right">Designed by <span><Link target="_blank"
                                to="/">Bá Long</Link></span></p>
                        </Row>
                    </Container>
                </div>

            </footer>
        );
    }
}
export default Footer;