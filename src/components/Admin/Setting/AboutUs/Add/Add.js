import React, { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './Add.css';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            content: '',
            imageUrl: null,
            imageUpload: null,
            note: ''
        }
        this.changeName = this.changeName.bind(this);
        this.changeContent = this.changeContent.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.addAboutUs = this.addAboutUs.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }
    componentDidMount() {
        document.title = 'Thêm phần giới thiệu | Bá Long BookStore';
    }
    changeName(e) {
        this.setState({ name: e.target.value })
    }
    changeContent(e) {
        this.setState({ content: e.target.value })
    }
    changeMainImage(e) {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                imageUrl: URL.createObjectURL(e.target.files[0]),
                imageUpload: e.target.files[0]
            });
        }
    }
    changeNote(e) {
        this.setState({ note: e.target.value })
    }
    addAboutUs(e) {
        e.preventDefault();
        const data = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.name,
            content: this.state.content,
            note: this.state.note
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/about-us/add`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ data: data })
        }).then(res => { return res.json() }).then(JSres => {
            if (JSres.about) {
                var formData = new FormData();
                var imgname = new Date().getTime();
                formData.append('file', this.state.imageUpload);
                fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/about-us/image/${JSres.about.id}`, {
                    method: 'POST',
                    headers: {
                        username: localStorage.adminuser,
                        password: localStorage.adminpass,
                        imgname: imgname
                    },
                    body: formData
                }).then(res => { return res.json() }).then(jsres => {
                    if (jsres.message === 'success') {
                        this.props.history.push('/admin/setting/about');
                    }
                })
                this.props.history.push('/admin/setting/about');
            }
        })
    }
    cancelEdit() {
        this.props.history.push('/admin/setting/about');
    }
    render() {
        return (
            <Container className='update-book'>
                <h2> Thêm phần giới thiệu</h2>
                <Form onSubmit={this.addAboutUs}>
                    <Form.Group controlId="about-name">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tiêu đề" value={this.state.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="about-content">
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control as="textarea" rows={8} placeholder="Nhập nội dung" value={this.state.content} onChange={this.changeContent} style={{ resize: "none" }} required="required" />
                    </Form.Group>
                    <Form.Group className='fgr-main-image'>
                        {
                            (this.state.imageUrl) ? (<img src={this.state.imageUrl} alt="" />) : (
                                <div></div>
                            )
                        }
                        <Form.File name="image" label="Hình ảnh minh họa" className='input-image' onChange={this.changeMainImage} required="required" />
                    </Form.Group>
                    <Form.Group controlId="img-note">
                        <Form.Label>Ghi chú hình ảnh</Form.Label>
                        <Form.Control type='text' placeholder="Nhập ghi chú" value={this.state.note} onChange={this.changeNote} required="required" />
                    </Form.Group>
                    <div className='form-btn'>
                        <Button variant='' className='cancel' onClick={this.cancelEdit}><i className="fa fa-ban" aria-hidden="true"></i>&nbsp;Hủy</Button>
                        <Button variant='' className='submit' type='submit'><i className="fa fa-floppy-o" aria-hidden="true" ></i>&nbsp;Lưu</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default Add;
