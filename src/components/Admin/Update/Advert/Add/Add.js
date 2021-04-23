import React, { Component } from 'react';
import './Add.css';
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Add extends Component {
    constructor(props) {
        super(props);
        var d = new Date();
        this.state = {

            advertName: '',
            advertDescription: '',

            mainImageUpload: null,
            mainImageUrl: '',

            bannerImageUpload: null,
            bannerImageUrl: '',

            begin: d,
            finish: d
        }
        this.handleChangeBegin = this.handleChangeBegin.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.changeBannerImage = this.changeBannerImage.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);

    }
    componentDidMount() {
        document.title = `Thêm quảng cáo mới | Bá Long BookStores`;
    }

    handleChangeBegin(date) {
        this.setState({ begin: date })
    }
    handleChangeFinish(date) {
        this.setState({ finish: date })
    }
    changeMainImage(e) {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                mainImageUrl: URL.createObjectURL(e.target.files[0]),
                mainImageUpload: e.target.files[0]
            });
        }
    }
    changeBannerImage(e) {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                bannerImageUrl: URL.createObjectURL(e.target.files[0]),
                bannerImageUpload: e.target.files[0]
            });
        }
    }
    changeName(e) {
        this.setState({ advertName: e.target.value });
    }
    changeDescription(e) {
        this.setState({ advertDescription: e.target.value });
    }
    handleAddItem(e) {
        e.preventDefault();
        const advert = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.advertName,
            description: this.state.advertDescription,
            begin: (this.state.begin.getDate() < 10 ? '0' + this.state.begin.getDate() : this.state.begin.getDate()) + '-' + ((this.state.begin.getMonth() + 1) < 10 ? '0' + (this.state.begin.getMonth() + 1) : (this.state.begin.getMonth() + 1)) + '-' + this.state.begin.getFullYear(),
            finish: (this.state.finish.getDate() < 10 ? '0' + this.state.finish.getDate() : this.state.finish.getDate()) + '-' + ((this.state.finish.getMonth() + 1) < 10 ? '0' + (this.state.finish.getMonth() + 1) : (this.state.finish.getMonth() + 1)) + '-' + this.state.finish.getFullYear()
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data: advert })
        }).then(res => { return res.json() }).then(jsRes => {
            let formMain = new FormData();
            const d = new Date();
            let imgname = d.getTime();
            formMain.append('file', this.state.mainImageUpload)
            fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/add/0/${jsRes.advert.id}`, {
                method: 'POST',
                headers: {
                    imgname: imgname,
                    username: localStorage.adminuser,
                    password: localStorage.adminpass

                },
                body: formMain
            }).then(res => { return res.json() }).then(jR => {
                if (jR.message === 'success') {
                    let formBanner = new FormData();
                    const s = new Date();
                    let bannerName = s.getTime();
                    formBanner.append('file', this.state.bannerImageUpload);
                    fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/add/1/${jsRes.advert.id}`, {
                        method: 'POST',
                        headers: {
                            imgname: bannerName,
                            username: localStorage.adminuser,
                            password: localStorage.adminpass

                        },
                        body: formBanner
                    }).then(res => { return res.json() }).then(resJson => {
                        if (resJson.message === 'success') {
                            this.props.history.push('/admin/update/advert');
                        }
                    })
                }
            })
        })

    }
    render() {
        return (
            <Container>
                <h2>Thêm quảng cáo mới</h2>

                <Form className='form-edit-book' onSubmit={this.handleAddItem}>
                    <Form.Group className='fgr-main-image'>
                        {
                            (this.state.mainImageUpload) ? (<img src={this.state.mainImageUrl} alt="" />) : (
                                <div></div>
                            )
                        }

                        <Form.File name="main-image" label="Hình ảnh quảng cáo" className='input-main-image' onChange={this.changeMainImage} required="required" />
                    </Form.Group>
                    <Form.Group className='fgr-sup-image'>
                        {
                            (this.state.bannerImageUpload) ? (<img src={this.state.bannerImageUrl} alt="" />) : (
                                <div></div>
                            )
                        }
                        <Form.File name="sup-image" label="Hình ảnh banner của quảng cáo" className='input-banner-image' onChange={this.changeBannerImage} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên chương trình quảng cáo</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên quảng cáo" value={this.state.advertName} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" placeholder="Thêm mô tả" rows={3} value={this.state.advertDescription} onChange={this.changeDescription} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-price">
                        <Form.Label>Bắt đầu</Form.Label>
                        <DatePicker id='begin-adv' selected={this.state.begin} onChange={date => this.handleChangeBegin(date)} />
                    </Form.Group>
                    <Form.Group controlId="item-sale">
                        <Form.Label>Kết thúc</Form.Label>
                        <DatePicker id='finish-adv' selected={this.state.finish} onChange={date => this.handleChangeFinish(date)} />
                    </Form.Group>

                    <div className='form-btn'>
                        <Button variant='' className='cancel' onClick={this.cancelEdit}><i className="fa fa-ban" aria-hidden="true"></i>&nbsp;Hủy</Button>
                        <Button variant='' className='submit' type='submit'><i className="fa fa-floppy-o" aria-hidden="true" ></i>&nbsp;Lưu</Button>
                    </div>
                </Form>
            </Container >
        );
    }
}

export default Add;
