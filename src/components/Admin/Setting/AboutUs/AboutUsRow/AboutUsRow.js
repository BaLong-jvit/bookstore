import React, { Component } from 'react';
import './AboutUsRow.css';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import $ from 'jquery';

class AboutUsRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delNotify: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
    }

    deleteItem() {
        $(`#accept-${this.props.about.id}-notify`).css({
            display: 'block'
        });
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.about.id}-notify`).css({
                display: 'none'
            });
            const user = {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/about-us/delete/${this.props.about.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user: user })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteAbout();
                    this.showDeleteNotify(true, 'Xóa phần giới thiệu thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa phần giới thiệu không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.about.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.about.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.about.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.about.id}-notify`} style={{
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
                    <div id={`accept-${this.props.about.id}-notify`} style={{
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
                        }}>{`Xóa: '${this.props.about.name}' vĩnh viễn?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    <div className='img-item'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.props.about.routine}/${this.props.about.image_name}`} alt="" />
                    </div>
                </td>
                <td>
                    <span>{this.props.about.name}</span>
                </td>
                <td>
                    <span>{this.props.about.content}</span>
                </td>
                <td>
                    <span>{this.props.about.note_image}</span>
                </td>
                <td>
                    <div className='btns-react'>
                        <Link to={`/admin/update/about/edit/${this.props.about.id}`} className='btn-edit'><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</Link>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default AboutUsRow;
