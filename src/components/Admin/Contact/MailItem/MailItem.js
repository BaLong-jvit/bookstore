import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'
import './MailItem.css';
import $ from 'jquery';

class MailItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delNotify: ''
        }
        this.selectEmail = this.selectEmail.bind(this);
        this.deleteMail = this.deleteMail.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this)
    }

    selectEmail() {
        $('.mail-item.read').css('backgroundColor', '#f7f7f7')
        $(`#mail-item-${this.props.mail.id}`).css('backgroundColor', '#f3ec15');
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/problem-contact/read/${this.props.mail.id}`, {
            method: 'PUT',
            headers: {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
        }).then(res => { return res.json() }).then(js => {
            if (js.message === 'success') {
                this.props.resetMail(this.props.page);
                this.props.history.push(`/admin/contact/read/${this.props.mail.id}`)
            }
        })
    }
    deleteMail() {
        $(`#accept-${this.props.mail.id}-notify`).css({
            display: 'block'
        });
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.mail.id}-notify`).css({
                display: 'none'
            });
            const user = {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/problem-contact/delete/${this.props.mail.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user: user })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.resetMail();
                    this.showDeleteNotify(true, 'Xóa mail thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa mail không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.mail.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.mail.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.mail.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <div className={(this.props.mail.read === 0) ? 'mail-item' : 'mail-item read'} id={`mail-item-${this.props.mail.id}`} >
                <div id={`del-${this.props.mail.id}-notify`} style={{
                    'position': 'fixed',
                    'display': 'none',
                    'top': '50%',
                    'left': '50%',

                    'transform': 'translate(-50%, -50%)',
                    'zIndex': '9999'
                }}>
                    <p style={{
                        'color': '#fff',
                        'fontSize': '20px',
                        'padding': '30px 50px',
                        'margin': '0'
                    }}>{this.state.delNotify}</p>
                </div>
                <div id={`accept-${this.props.mail.id}-notify`} style={{
                    'position': 'fixed',
                    'display': 'none',
                    'backgroundColor': '#54f7e8',
                    'top': '50%',
                    'left': '50%',
                    'transform': 'translate(-50%, -50%)',
                    'zIndex': '9999'
                }}>
                    <p style={{
                        'color': '#000',
                        'fontSize': '20px',
                        'padding': '30px 50px',
                        'margin': '0'
                    }}>{`Xác nhận xóa sản phẩm: ${this.props.mail.name} ?`}</p>
                    <div className='btn-option'>
                        <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                        <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                    </div>
                </div>
                <div className='item-ct' onClick={this.selectEmail}>
                    <h3>{`${this.props.mail.subject.slice(0, 15)}...`}</h3>
                    <p>{`${this.props.mail.message.slice(0, 20)}...`}</p>
                </div>
                <div className="btn-ct">
                    <Button variant='' className='btn-delete' onClick={this.deleteMail}><i className="fa fa-times" aria-hidden="true"></i></Button>
                </div>
            </div>
        );
    }
}

export default withRouter(MailItem);
