import React, { Component } from 'react';
import './LanguageRow.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class LanguageRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delNotify: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
        this.showDeleteNotify = this.showDeleteNotify.bind(this);
    }
    deleteItem() {
        $(`#accept-${this.props.language.id}-notify`).css({
            display: 'block'
        });
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.language.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/delete/${this.props.language.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dataupdate: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteLanguage();
                    this.showDeleteNotify(true, 'Xóa ngôn ngữ thành công!');
                } else if (jsonResponse.message === 'error') {
                    this.showDeleteNotify(false, `Xóa tất cả sản phẩm có ngôn ngữ '${this.props.language.name}' trước!`);
                }
            })
        } else {
            $(`#accept-${this.props.language.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.language.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.language.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.language.id}-notify`} style={{
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
                    <div id={`accept-${this.props.language.id}-notify`} style={{
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
                        }}>{`Xác nhận xóa ngôn ngữ: ${this.props.language.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>{this.props.language.name}</td>
                <td>
                    <div>
                        <Link to={`/admin/update/language/edit/${this.props.language.id}`} className='btn-edit'><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</Link>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default LanguageRow
