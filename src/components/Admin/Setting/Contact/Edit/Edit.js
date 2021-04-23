import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }
        this.changeAddress = this.changeAddress.bind(this);
        this.changeContact = this.changeContact.bind(this);
        this.changeCountry = this.changeCountry.bind(this);
        this.changeDistrict = this.changeDistrict.bind(this);
        this.changeFacebook = this.changeFacebook.bind(this);
        this.changeGoogle = this.changeGoogle.bind(this);
        this.changeInstagram = this.changeInstagram.bind(this);
        this.changeMail = this.changeMail.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changeTwitter = this.changeTwitter.bind(this);
        this.changeWard = this.changeWard.bind(this);
        this.changeYoutube = this.changeYoutube.bind(this);
        this.changeZalo = this.changeZalo.bind(this);
        this.changeWebsite = this.changeWebsite.bind(this);
        this.changeProvince = this.changeProvince.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }
    componentDidMount() {
        document.title = 'Sửa thông tin liên lạc | Bá Long BookStores';
        this.getContact();
    }
    getContact() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/contact/contact`).then(response => {
            return response.json();
        }).then(responseJson => {
            this.setState({ contact: responseJson.contact });
        })
    }
    changeAddress(e) {
        let contact = this.state.contact;
        contact.address = e.target.value;
        this.setState({ contact: contact })
    }
    changeCountry(e) {
        let contact = this.state.contact;
        contact.country = e.target.value;
        this.setState({ contact: contact })
    }
    changeDistrict(e) {
        let contact = this.state.contact;
        contact.district = e.target.value;
        this.setState({ contact: contact })
    }
    changeFacebook(e) {
        let link = e.target.value.replace('http://', '');
        let contact = this.state.contact;
        contact.facebook = link;
        this.setState({ contact: contact })
    }
    changeGoogle(e) {
        let link = e.target.value.replace('http://', '');
        let contact = this.state.contact;
        contact.google = link;
        this.setState({ contact: contact })
    }
    changeInstagram(e) {
        let link = e.target.value.replace('http://', '');
        let contact = this.state.contact;
        contact.instagram = link;
        this.setState({ contact: contact })
    }
    changeMail(e) {

        let contact = this.state.contact;
        contact.email = e.target.value;
        this.setState({ contact: contact })
    }
    changeName(e) {

        let contact = this.state.contact;
        contact.name = e.target.value;
        this.setState({ contact: contact })
    }
    changePhone(e) {

        let contact = this.state.contact;
        contact.phonenumber = e.target.value;
        this.setState({ contact: contact })
    }
    changeStreet(e) {

        let contact = this.state.contact;
        contact.street = e.target.value;
        this.setState({ contact: contact })
    }
    changeTwitter(e) {

        let contact = this.state.contact;
        contact.twitter = e.target.value;
        this.setState({ contact: contact })
    }
    changeWard(e) {

        let contact = this.state.contact;
        contact.ward = e.target.value;
        this.setState({ contact: contact })
    }
    changeProvince(e) {

        let contact = this.state.contact;
        contact.province = e.target.value;
        this.setState({ contact: contact })
    }
    changeYoutube(e) {
        let link = e.target.value.replace('http://', '');
        let contact = this.state.contact;
        contact.youtube = link;
        this.setState({ contact: contact })
    }
    changeZalo(e) {
        let link = e.target.value.replace('http://', '');
        let contact = this.state.contact;
        contact.zalo = link;
        this.setState({ contact: contact })
    }
    changeWebsite(e) {

        let contact = this.state.contact;
        contact.website = e.target.value;
        this.setState({ contact: contact })
    }
    changeContact(e) {
        e.preventDefault();
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/contact/update/${this.state.contact.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                username: localStorage.adminuser,
                password: localStorage.adminpass
            },
            body: JSON.stringify({ data: this.state.contact })
        }).then(re => {
            return re.json()
        }).then(jr => {
            if (jr.message === 'success') {
                this.props.history.push('/admin/setting/contact');
            }
        })
    }
    cancelEdit() {
        this.props.history.push('/admin/setting/contact');
    }
    render() {
        return (
            <Container className='update-book'>
                <h2 >Sửa thông tin lên hệ</h2>
                <Form onSubmit={this.changeContact}>
                    <Form.Group controlId="contact-name">
                        <Form.Label>Tên cửa hàng</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên cửa hàng" value={this.state.contact.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-web">
                        <Form.Label>Website</Form.Label>
                        <Form.Control type="text" placeholder="Nhập website" value={this.state.contact.website} onChange={this.changeWebsite} />
                    </Form.Group>
                    <Form.Group controlId="contact-add">
                        <Form.Label>Địa chỉ (số)</Form.Label>
                        <Form.Control type="number" placeholder="Nhập địa chỉ" value={this.state.contact.address} onChange={this.changeAddress} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-street">
                        <Form.Label>Đường</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên đường" value={this.state.contact.street} onChange={this.changeStreet} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-ward">
                        <Form.Label>Phường</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên phường" value={this.state.contact.ward} onChange={this.changeWard} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-dis">
                        <Form.Label>Quận</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên quận" value={this.state.contact.district} onChange={this.changeDistrict} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-province">
                        <Form.Label>Tỉnh/thành phố</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên tỉnh/thành phố" value={this.state.contact.province} onChange={this.changeProvince} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-contry">
                        <Form.Label>Quốc gia</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên quốc gia" value={this.state.contact.country} onChange={this.changeCountry} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-phone">
                        <Form.Label>Số điện thoại (0xx xxxx xxxxxx)</Form.Label>
                        <Form.Control type="tel" placeholder="Nhập sô điện thoại" value={this.state.contact.phonenumber} pattern="0[0-9]{2} [0-9]{4} [0-9]{6}" onChange={this.changePhone} required="required" />
                    </Form.Group>
                    <Form.Group controlId="contact-mail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Nhập e-mail" value={this.state.contact.email} onChange={this.changeMail} required="required" />
                    </Form.Group>
                    <div className=''>
                        <h2 >Mạng xã hội</h2>
                        <Form.Group controlId="contact-fb">
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Facebook" value={this.state.contact.facebook} onChange={this.changeFacebook} />
                        </Form.Group>
                        <Form.Group controlId="contact-ins">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Instagram" value={this.state.contact.instagram} onChange={this.changeInstagram} />
                        </Form.Group>
                        <Form.Group controlId="contact-tw">
                            <Form.Label>Twitter</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Twitter" value={this.state.contact.twitter} onChange={this.changeTwitter} />
                        </Form.Group>
                        <Form.Group controlId="contact-zl">
                            <Form.Label>Zalo</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Zalo" value={this.state.contact.zalo} onChange={this.changeZalo} />
                        </Form.Group>
                        <Form.Group controlId="contact-yt">
                            <Form.Label>Youtube</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Youtube" value={this.state.contact.youtube} onChange={this.changeYoutube} />
                        </Form.Group>
                        <Form.Group controlId="contact-gg">
                            <Form.Label>Google</Form.Label>
                            <Form.Control type="text" placeholder="Nhập link Google" value={this.state.contact.google} onChange={this.changeGoogle} />
                        </Form.Group>
                    </div>
                    <div className='form-btn'>
                        <Button variant='' className='cancel' onClick={this.cancelEdit}><i className="fa fa-ban" aria-hidden="true"></i>&nbsp;Hủy</Button>
                        <Button variant='' className='submit' type='submit'><i className="fa fa-floppy-o" aria-hidden="true" ></i>&nbsp;Lưu</Button>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default withRouter(Edit);
