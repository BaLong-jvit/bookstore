import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './Read.css'

class Read extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mail: {}
        }
    }
    componentDidMount() {
        this.getMail();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.mail !== this.state.mail) {
            document.title = `${this.state.mail.subject} | Bá Long BookStore`;
        }
    }
    getMail() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/problem-contact/problem/${this.props.match.params.idMail}`, {
            method: "GET"
        }).then(res => { return res.json() }).then(js => {
            this.setState({ mail: js.problem })
        })
    }
    render() {
        console.log(this.props.match.params.idMail)
        return (
            <Container className='view-mail'>
                <h3>{this.state.mail.subject}</h3>
                <p>Người gửi: <strong>{this.state.mail.name}</strong></p>
                <p>E-mail: <strong>{this.state.mail.email}</strong></p>
                <p>Thời gian: <strong>{this.state.mail.receive_at}</strong></p>
                <div className="ct-mail">
                    <p>{this.state.mail.message}</p>
                </div>
            </Container>
        );
    }
}
export default withRouter(Read);