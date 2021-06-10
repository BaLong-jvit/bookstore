import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './Index.css'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }

    }
    componentDidMount() {
        document.title = 'Quản lý thông tin liên lạc | Bá Long BookStores';
        this.getContact();
    }
    getContact() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/contact/contact`).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({ contact: responseJson.contact });
        })
    }
    render() {
        return (
            <Container className='update-book'>
                <div className='control-book'>
                    <Link to={`/admin/setting/contact/edit/${this.state.contact.id}`} className='btn-add'><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</Link>
                </div>
                <h2 >Thông tin lên hệ</h2>
                <address>
                    <p>{this.state.contact.name}</p>
                    <p>{this.state.contact.address}, đường {this.state.contact.street}, phường {this.state.contact.ward}, quận {this.state.contact.district}</p>
                    <p> thành phố {this.state.contact.province}, {this.state.contact.country}</p>
                    <p>Mobile: +{this.state.contact.phonenumber}</p>
                    <p>Email: {this.state.contact.email}</p>
                </address>
                <div className=''>
                    <h2 >Mạng xã hội</h2>
                    <ul>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={`//${this.state.contact.facebook}`} className="nav-link" data-rb-event-key={this.state.contact.facebook}>
                                    <i className="fa fa-facebook"></i>
                                </Link>{this.state.contact.facebook}
                            </div>
                        </li>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={this.state.contact.twitter} className="nav-link" data-rb-event-key={this.state.contact.twitter}>
                                    <i className="fa fa-twitter"></i>
                                </Link>{this.state.contact.twitter}
                            </div>
                        </li>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={this.state.contact.instagram} className="nav-link" data-rb-event-key={this.state.contact.instagram}>
                                    <i className="fa fa-linkedin"></i>
                                </Link>{this.state.contact.instagram}
                            </div>
                        </li>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={this.state.contact.zalo} className="nav-link fa-zalo" data-rb-event-key={this.state.contact.zalo} >
                                    <i className='fa'></i>
                                </Link>{this.state.contact.zalo}
                            </div>
                        </li>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={this.state.contact.youtube} className="nav-link" data-rb-event-key={this.state.contact.youtube}>
                                    <i className="fa fa-youtube fa-youtb"></i>
                                </Link> {this.state.contact.youtube}
                            </div>
                        </li>
                        <li>
                            <div className="nav-item">
                                <Link target="_blank" to={this.state.contact.google} className="nav-link" data-rb-event-key={this.state.contact.google}>
                                    <i className="fa fa-google-plus"></i>
                                </Link>{this.state.contact.google}
                            </div>
                        </li>
                    </ul>

                </div>

            </Container>
        );
    }
}

export default Index;
