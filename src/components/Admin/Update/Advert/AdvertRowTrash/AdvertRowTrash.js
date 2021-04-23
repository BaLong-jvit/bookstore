import React, { Component } from 'react'
import './AdvertRowTrash.css'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class AdvertRowTrash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delNotify: '',
            image: {}
        }
        this.getImage = this.getImage.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.convertItem = this.convertItem.bind(this);
        this.showDeleteNotify = this.showDeleteNotify.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
        this.acceptConvert = this.acceptConvert.bind(this);
    }
    componentDidMount() {
        this.getImage();
    }
    getImage() {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/advert/0/${this.props.advert.id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({ image: jsRes.image });
        })
    }
    deleteItem() {
        $(`#accept-${this.props.advert.id}-notify`).css({
            display: 'block'
        });
    }
    convertItem() {
        this.setState({ warning: 'Khôi phục lại quảng cáo: ' });
        $(`#convert-${this.props.advert.id}-notify`).css({
            display: 'block'
        })
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.advert.id}-notify`).css({
                display: 'none'
            });
            const user = {
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/del/${this.props.advert.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user: user })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteAdvert();
                    this.showDeleteNotify(true, 'Xóa quảng cáo thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa quảng cáo không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.advert.id}-notify`).css({
                display: 'none'
            });
        }
    }
    acceptConvert(accept) {
        if (accept) {
            $(`#convert-${this.props.advert.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {

                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/convert/${this.props.advert.id}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ user: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteAdvert();
                    this.showDeleteNotify(true, 'Khôi phục quảng cáo thành công!');
                } else {
                    this.showDeleteNotify(false, 'Khôi phục quảng cáo không thành công!');
                }
            })
        } else {
            $(`#convert-${this.props.advert.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.advert.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.advert.id}-notify`).css('display', 'none');
        }, 800);
    }

    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.advert.id}-notify`} style={{
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
                    <div id={`accept-${this.props.advert.id}-notify`} style={{
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
                        }}>{`Xác nhận xóa chương trình quảng cáo: ${this.props.advert.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    <div id={`convert-${this.props.advert.id}-notify`} style={{
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
                        }}>{`${this.state.warning} ${this.props.advert.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptConvert(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptConvert(true)}>Khôi phục</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    <div className='img-item'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.image.path}/${this.state.image.name}`} alt="" />
                    </div>
                </td>
                <td><span>{this.props.advert.name}</span></td>
                <td><span>{this.props.advert.short_description}</span></td>
                <td><span>{this.props.advert.begin}</span></td>

                <td><span>{this.props.advert.finish}</span></td>
                <td>
                    <div className='btns-react'>
                        <Button variant='' className='btn-convert' onClick={this.convertItem}><i className="fa fa-repeat" aria-hidden="true"></i>&nbsp; Lấy lại</Button>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}

export default AdvertRowTrash
