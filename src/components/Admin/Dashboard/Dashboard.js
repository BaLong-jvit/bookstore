import React from 'react';
import './Dashboard.css';
import { Col, Row } from 'react-bootstrap';

class Dashboard extends React.Component {

    render() {
        document.title = `Dashboard | Bá Long Bookstore `
        return (
            <div className='wrapper'>
                <Row>
                    <Col md={3} sm={6} xs={12}>
                        <div className='market market-view'>
                            <Row>
                                <Col md={4} className='market-icon'>
                                    <i className="fa fa-eye"> </i>
                                </Col>
                                <Col md={8} className='market-info'>
                                    <h4>Visitors</h4>
                                    <h3>13,500</h3>
                                    <p>Other hand, we denounce</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={3} sm={6} xs={12}>
                        <div className='market market-users'>
                            <Row>
                                <Col md={4} className='market-icon'>
                                    <i className="fa fa-users"> </i>
                                </Col>
                                <Col md={8} className='market-info'>
                                    <h4>Users</h4>
                                    <h3>1,250</h3>
                                    <p>Other hand, we denounce</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={3} sm={6} xs={12}>
                        <div className='market market-sale'>
                            <Row>
                                <Col md={4} className='market-icon'>
                                    <i className="fa fa-usd"> </i>
                                </Col>
                                <Col md={8} className='market-info'>
                                    <h4>Sales</h4>
                                    <h3>1,500</h3>
                                    <p>Other hand, we denounce</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={3} sm={6} xs={12}>
                        <div className='market market-order'>
                            <Row>
                                <Col md={4} className='market-icon'>
                                    <i className="fa fa-shopping-cart"> </i>
                                </Col>
                                <Col md={8} className='market-info'>
                                    <h4>Orders</h4>
                                    <h3>1,500</h3>
                                    <p>Other hand, we denounce</p>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}
export default Dashboard;