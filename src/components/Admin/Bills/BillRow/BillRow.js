import React, { Component } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './BillRow.css';

class BillRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            status: [],
            selectStatus: 0,
            isShow: false,
            name: '',
            phone: '',
            address: '',
            street: '',
            ward: '',
            district: '',
            city: '',
        }
        this.showDetail = this.showDetail.bind(this);
        this.hideDetail = this.hideDetail.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePhone = this.changePhone.bind(this);
        this.changeAddress = this.changeAddress.bind(this);
        this.changeStreet = this.changeStreet.bind(this);
        this.changeWard = this.changeWard.bind(this);
        this.changeDistrict = this.changeDistrict.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.saveBill = this.saveBill.bind(this);
    }
    componentDidMount() {
        this.getBook()
    }
    getBook() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/book/${this.props.bill.book_id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(js => {
            this.setState({ book: js.book })
        })
    }
    getListStatus() {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/status/all`, { method: "GET" }).then(res => { return res.json() }).then(js => {
            this.setState({ status: js.status })
        })
    }
    changeName(e) {
        this.setState({ name: e.target.value })
    }
    changePhone(e) {
        this.setState({ phone: e.target.value })
    }
    changeAddress(e) {
        this.setState({ address: e.target.value })
    }
    changeStreet(e) {
        this.setState({ street: e.target.value })
    }
    changeWard(e) {
        this.setState({ ward: e.target.value })
    }
    changeDistrict(e) {
        this.setState({ district: e.target.value })
    }
    changeCity(e) {
        this.setState({ city: e.target.value })
    }
    showDetail() {
        this.getListStatus();
        this.setState({
            isShow: true,
            selectStatus: this.props.bill.status,
            name: this.props.bill.create_by,
            phone: this.props.bill.phone,
            address: this.props.bill.address,
            street: this.props.bill.street,
            ward: this.props.bill.ward,
            district: this.props.bill.district,
            city: this.props.bill.city,
        });
    }
    changeStatus(e) {
        this.setState({ selectStatus: e.target.value })
    }
    hideDetail() {
        this.setState({
            selectStatus: 0,
            isShow: false,
            name: '',
            phone: '',
            address: '',
            street: '',
            ward: '',
            district: '',
            city: ''
        })
    }
    saveBill(e) {
        e.preventDefault();
        const data = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            status: this.state.selectStatus,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            street: this.state.street,
            ward: this.state.ward,
            district: this.state.district,
            city: this.state.city
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/bills/update/${this.props.bill.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({ data: data })
        }).then(res => { return res.json() }).then(jsonRes => {
            if (jsonRes.message === 'success') {
                this.hideDetail();
                this.props.reloadBill();
            }
        })
    }
    render() {
        return (
            <tr>
                <td>
                    <Modal show={this.state.isShow} onHide={this.hideDetail}>
                        <Modal.Header closeButton>
                            <Modal.Title>Chi tiết đơn hàng<p>Mã Dơn: {this.props.bill.board_code}</p></Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={this.saveBill} className='form-detail'>
                            <Modal.Body>
                                <Form.Group controlId="book-name">
                                    <Form.Label>Tên sản phẩm</Form.Label>
                                    <Form.Control type="text" value={this.state.book.name} readOnly />
                                    <p>Số lượng: {this.props.bill.amount}</p>
                                    <p>Thành tiền: {
                                        Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(parseInt(this.props.bill.amount) * parseInt(this.state.book.price))
                                    }</p>
                                </Form.Group>
                                <Form.Group controlId="bill-status">
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Control as="select" value={this.state.selectStatus} onChange={this.changeStatus} >
                                        {this.state.status && this.state.status.map((color, key) => {
                                            return (
                                                <option key={key} value={color.id} >{`${color.id}: ${color.name}`}</option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="re-name">
                                    <Form.Label>Tên người nhận</Form.Label>
                                    <Form.Control type="text" placeholder="Tên người nhận" onChange={this.changeName} value={this.state.name} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-phone">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control type="text" placeholder="Số điện thoại" onChange={this.changePhone} value={this.state.phone} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-add">
                                    <Form.Label>Địa chỉ (số nhà)</Form.Label>
                                    <Form.Control type="text" placeholder="Địa chỉ (số nhà)" onChange={this.changeAddress} value={this.state.address} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-st">
                                    <Form.Label>Tên đường</Form.Label>
                                    <Form.Control type="text" placeholder="Tên đường" onChange={this.changeStreet} value={this.state.street} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-ward">
                                    <Form.Label>Tên phường/xã</Form.Label>
                                    <Form.Control type="text" placeholder="Tên phường/xã" onChange={this.changeWard} value={this.state.ward} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-dtr">
                                    <Form.Label>Tên quận/huyện</Form.Label>
                                    <Form.Control type="text" placeholder="Tên quận/huyện" onChange={this.changeDistrict} value={this.state.district} required="required" />
                                </Form.Group>
                                <Form.Group controlId="re-city">
                                    <Form.Label>Tên tỉnh/thành phố</Form.Label>
                                    <Form.Control type="text" placeholder="Tên tỉnh/thành phố" onChange={this.changeCity} value={this.state.city} required="required" />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hideDetail}>Hủy</Button>
                                <Button variant="" className='btn-login' type='submit'>Save</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                    {20 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    {this.props.bill.board_code}
                </td>
                <td>
                    {this.props.bill.create_by}
                </td>
                <td>
                    {this.state.book.name}
                </td>
                <td>
                    {this.props.bill.amount}
                </td>

                <td>
                    {this.props.bill.status}
                </td>
                <td>
                    {
                        Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(parseInt(this.props.bill.amount) * parseInt(this.state.book.price))
                    }
                </td>
                <td>
                    <Button variant='success' className='detail=bills' onClick={this.showDetail}
                        disabled={(this.props.bill.status === 7 || this.props.bill.status === 9) ? "disabled" : ''} ><i className="fa fa-info" aria-hidden="true"></i>&nbsp; Xem chi tiết</Button>
                </td>
            </tr>
        );
    }
}

export default BillRow;
