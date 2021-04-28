import React, { Component } from 'react';
import './AccountRow.css';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class AccountRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            parentAccount: {}
        }
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount() {
        this.getImage(); this.getParentAccount();
    }
    componentDidUpdate(props) {
        if (props.account !== this.props.account) {
            this.getImage(); this.getParentAccount();
        }
    }
    getParentAccount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/accounts/get/${this.props.account.create_by}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({ parentAccount: jsRes.account })
        })
    }
    getImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/account-images/avatar/${this.props.account.id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({ image: jsRes.image })
        })
    }
    deleteItem() {
        $(`#accept-${this.props.account.id}-notify`).css({
            display: 'block'
        });
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.account.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/accounts/delete/${this.props.account.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ data: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteAccount();
                    this.showDeleteNotify(true, 'Xóa tài khoản thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa tài khoản không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.account.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.account.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.account.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.account.id}-notify`} style={{
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
                    <div id={`accept-${this.props.account.id}-notify`} style={{
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
                        }}>{`Xác nhận xóa sản phẩm: ${this.props.account.username} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    <div className='img-item'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.image.path}/${this.state.image.name}`} alt="" />
                    </div>
                </td>
                <td>
                    {this.props.account.name}
                </td>
                <td>
                    {this.props.account.username}
                </td>
                <td>
                    {this.props.account.create_at}
                </td>
                <td>
                    {`${this.state.parentAccount.name}(user: ${this.state.parentAccount.username})`}
                </td>
                <td>
                    <div>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default AccountRow;
