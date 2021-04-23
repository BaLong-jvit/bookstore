import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import './Edit.css'

class Edit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advert: {},
            mainImage: null,
            mainImageUpload: null,
            mainImageUrl: null,
            bannerImage: null,
            bannerImageUpload: null,
            bannerImageUrl: null,
            begin: new Date(),
            finish: new Date()
        }
        this.getBannerImageUrl = this.getBannerImageUrl.bind(this);
        this.getMainImageUrl = this.getMainImageUrl.bind(this);
        this.getEventTime = this.getEventTime.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.changeBannerImage = this.changeBannerImage.bind(this);
        this.handleChangeBegin = this.handleChangeBegin.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }
    componentDidMount() {
        this.getAdvert()
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.advert !== this.state.advert) {
            this.getMainImage();
            this.getBannerImage();
            this.getEventTime();
        }
        if (prevState.mainImage !== this.state.mainImage) {
            this.getMainImageUrl();
        }
        if (prevState.bannerImage !== this.state.bannerImage) {
            this.getBannerImageUrl();
        }
    }
    getEventTime() {
        var bg = this.state.advert.begin.split('-');
        var fn = this.state.advert.finish.split('-');
        this.setState({
            begin: new Date(bg[2], bg[1] - 1, bg[0]),
            finish: new Date(fn[2], fn[1] - 1, fn[0])
        })
    }
    getMainImageUrl() {
        this.setState({ mainImageUrl: `${process.env.REACT_APP_DOMAIN}/image/${this.state.mainImage.path}/${this.state.mainImage.name}` })
    }
    getBannerImageUrl() {
        this.setState({ bannerImageUrl: `${process.env.REACT_APP_DOMAIN}/image/${this.state.bannerImage.path}/${this.state.bannerImage.name}` })

    }
    getMainImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/advert/0/${this.state.advert.id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ mainImage: jsonRes.image })
        })
    }
    getBannerImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/advert/1/${this.state.advert.id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ bannerImage: jsonRes.image })
        })
    }
    getAdvert() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/advert/${this.props.match.params.idAdvert}`, {
            method: 'GET',
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({
                advert: jsRes.advert
            })
        })
    }
    changeName(e) {
        let advert = this.state.advert;
        advert.name = e.target.value;
        this.setState({ advert: advert });
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
    changeDescription(e) {
        let advert = this.state.advert;
        advert.description = e.target.value;
        this.setState({ advert: advert })
    }
    handleChangeBegin(date) {
        this.setState({ begin: date })
    }
    handleChangeFinish(date) {
        this.setState({ finish: date })
    }
    handleEditItem(e) {
        e.preventDefault();
        const data = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.advert.name,
            description: this.state.advert.description,
            begin: (this.state.begin.getDate() < 10 ? '0' + this.state.begin.getDate() : this.state.begin.getDate()) + '-' + ((this.state.begin.getMonth() + 1) < 10 ? '0' + (this.state.begin.getMonth() + 1) : (this.state.begin.getMonth() + 1)) + '-' + this.state.begin.getFullYear(),
            finish: (this.state.finish.getDate() < 10 ? '0' + this.state.finish.getDate() : this.state.finish.getDate()) + '-' + ((this.state.finish.getMonth() + 1) < 10 ? '0' + (this.state.finish.getMonth() + 1) : (this.state.finish.getMonth() + 1)) + '-' + this.state.finish.getFullYear()
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/update/${this.state.advert.id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ data: data })
        }).then(res => { return res.json() }).then(resJs => {
            if (resJs.message === 'success') {
                if (this.state.mainImageUpload) {
                    var formMain = new FormData();
                    formMain.append('file', this.state.mainImageUpload);
                    var d = new Date();
                    const imgName = d.getTime();
                    fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/update/0/${this.state.mainImage.id}`, {
                        method: 'POST',
                        headers: {
                            imgname: imgName,
                            username: localStorage.adminuser,
                            password: localStorage.adminpass
                        },
                        body: formMain
                    }).then(res => { return res.json() }).then(jsonRes => {

                    })
                }
                if (this.state.bannerImageUpload) {
                    var formBanner = new FormData();
                    formBanner.append('file', this.state.bannerImageUpload);
                    var s = new Date();
                    const imgName = s.getTime();
                    fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/advert-images/update/1/${this.state.bannerImage.id}`, {
                        method: 'POST',
                        headers: {
                            imgname: imgName,
                            username: localStorage.adminuser,
                            password: localStorage.adminpass
                        },
                        body: formBanner
                    }).then(res => { return res.json() }).then(jsonRes => {

                    })
                }
            }
        })
        this.props.history.push('/admin/update/advert');
    }
    cancelEdit() {
        this.props.history.push('/admin/update/advert');
    }
    render() {
        return (
            <Container>
                <h2>Sửa quảng cáo</h2>

                <Form className='form-edit-book' onSubmit={this.handleEditItem}>
                    <Form.Group className='fgr-main-image'>
                        {
                            (this.state.mainImageUrl) ? (<img src={this.state.mainImageUrl} alt="" />) : (
                                <div></div>
                            )
                        }

                        <Form.File name="main-image" label="Hình ảnh quảng cáo" className='input-main-image' onChange={this.changeMainImage} />
                    </Form.Group>
                    <Form.Group className='fgr-sup-image'>
                        {
                            (this.state.bannerImageUrl) ? (<img src={this.state.bannerImageUrl} alt="" />) : (
                                <div></div>
                            )
                        }
                        <Form.File name="sup-image" label="Hình ảnh banner của quảng cáo" className='input-banner-image' onChange={this.changeBannerImage} />
                    </Form.Group>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên chương trình quảng cáo</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên quảng cáo" value={this.state.advert.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" placeholder="Thêm mô tả" rows={3} value={this.state.advert.description} onChange={this.changeDescription} required="required" />
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

export default withRouter(Edit);
