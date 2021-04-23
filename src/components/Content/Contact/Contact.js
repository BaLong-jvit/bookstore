import React from 'react';
import './Contact.css';

import { Container, Row, Col, Form, Button, Nav } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

class AnyReactComponent extends React.Component {
    render() {
        return (
            <div style={{
                color: 'white',
                background: 'grey',
                padding: '15px 10px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100%',
                transform: 'translate(-50%, -50%)'
            }}>{this.props.text}</div>
        );
    }
}

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            center: {
                lat: 10.761431,
                lng: 106.686373
            },
            zoom: 11,
            name: '',
            email: '',
            subject: '',
            message: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
    }
    componentDidMount() {
        document.title = 'Liên hệ | Bá Long Bookstore';
        this.getContact();
    }
    getContact() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/contact/get-contact-infor`).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({ contact: responseJson.contact });
        })
    }
    handleName(e) {
        this.setState({ name: e.target.value });
    }
    handleEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleSubject(e) {
        this.setState({ subject: e.target.value });
    }
    handleMessage(e) {
        this.setState({ message: e.target.value });
    }
    handleSubmit(e) {
        const dataPost = {
            name: this.state.name,
            email: this.state.email,
            subject: this.state.subject,
            message: this.state.message
        };
        e.preventDefault();
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/contact/problem-contact`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ problem: dataPost })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => {
            console.log(networkError.message);
        }).then(jsonResponse => {

            this.setState({ name: '' });

            this.setState({ email: '' });

            this.setState({ subject: '' });

            this.setState({ message: '' });

        });

    }
    render() {
        return (
            <Container>
                <Row>
                    <Col sm={12}>
                        <div className='title contact-title'>
                            <h2 className="title text-center">Liên hệ với chúng tôi</h2>
                            <div className='bottom'></div>
                            <div style={{
                                position: 'absolute',
                                top: '50px',
                                bottom: '0px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                width: '80%'
                            }}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{
                                        key: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDjTJzEmNcZixzLhGvCL0MJvb_FWGhtuKM`
                                    }}
                                    defaultCenter={this.state.center}
                                    defaultZoom={this.state.zoom}
                                >
                                    <AnyReactComponent
                                        lat={10.761431}
                                        lng={106.686373}
                                        text={'Ba Long Bookstore'}
                                    />
                                </GoogleMapReact>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={8}>
                        <div className='title contact-form'>
                            <h2 className="title text-center">Gửi vấn đề</h2>
                            <div className="status alert alert-success" style={{ display: 'none' }}></div>
                            <Form id='main-contact-form' onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId='name'>
                                            <Form.Control type="text" name="name" required="required" placeholder="Name" onChange={this.handleName} value={this.state.name} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId='email'>
                                            <Form.Control type="email" name="email" required="required" placeholder="Email" onChange={this.handleEmail} value={this.state.email} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId='subject'>
                                    <Form.Control type='text' name='subject' required="required" placeholder="Subject" onChange={this.handleSubject} value={this.state.subject} />
                                </Form.Group>
                                <Form.Group controlId='message'>
                                    <Form.Control as="textarea" rows={8} required="required" placeholder="Your Message Here" style={{ resize: "none" }} onChange={this.handleMessage} value={this.state.message} />
                                </Form.Group>
                                <Button className='btn-submit' variant='' type='submit'>Submit</Button>
                            </Form>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className='title contact-info'>
                            <h2 className="title text-center">Thông tin lên hệ</h2>
                            <address>
                                <p>{this.state.contact.name}</p>
                                <p>{this.state.contact.address}, đường {this.state.contact.street}, phường {this.state.contact.ward}, quận {this.state.contact.district}</p>
                                <p> thành phố {this.state.contact.province}, {this.state.contact.country}</p>
                                <p>Mobile: +{this.state.contact.phonenumber}</p>
                                <p>Email: {this.state.contact.email}</p>
                            </address>
                            <div className=''>
                                <h2 className="title text-center">Mạng xã hội</h2>
                                <Nav className="justify-content-end">
                                    <Nav.Item><Nav.Link href={this.state.contact.facebook} target="_blank"><i className="fa fa-facebook"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.twitter} target="_blank"><i className="fa fa-twitter"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.instagram} target="_blank"><i className="fa fa-linkedin"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.zalo} target="_blank" className='fa-zalo'><i className='fa'></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.youtube} target="_blank" className='fa-youtb'><i className="fa fa-youtube"></i></Nav.Link></Nav.Item>
                                    <Nav.Item><Nav.Link href={this.state.contact.google} target="_blank"><i className="fa fa-google-plus"></i></Nav.Link></Nav.Item>
                                </Nav>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container >
        );
    }
}
export default Contact;