import React from 'react';
import { Button, Container, Modal, Form } from 'react-bootstrap';
import { withRouter } from 'react-router';
import './Cart.css';
import CartItem from './CartItem/CartItem';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCarts: [],
            showLogin: false,
            name: '',
            phone: '',
            address: '',
            street: '',
            ward: '',
            district: '',
            city: ''
        }
        this.deleteCart = this.deleteCart.bind(this);
        this.handlePay = this.handlePay.bind(this);
        this.changeAmount = this.changeAmount.bind(this);
        this.showPay = this.showPay.bind(this);
        this.hidePay = this.hidePay.bind(this);
        this.handleName = this.handleName.bind(this);
        this.handlePhone = this.handlePhone.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleStreet = this.handleStreet.bind(this);
        this.handleWard = this.handleWard.bind(this);
        this.handleDistrict = this.handleDistrict.bind(this);
        this.handleCity = this.handleCity.bind(this);
    }

    componentDidMount() {
        this.getListCarts();
        document.title = 'Giỏ hàng | Bá Long BookStore';
    }

    getListCarts() {
        if (localStorage.username && localStorage.password) {
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/get-carts`, {
                method: 'GET',
                headers: {
                    username: localStorage.username,
                    password: localStorage.password
                }
            }).then(response => { return response.json() }).then(responseJson => {
                this.setState({
                    listCarts: responseJson.carts
                });
            })
        } else {
            let arrayBooks = [];
            let listCart = [];
            if (localStorage.carts) {
                arrayBooks = JSON.parse(localStorage.carts);
            }
            let idBook = [...new Set(arrayBooks)];
            idBook.map(id => {
                let amount = 0;
                arrayBooks.map(item => {
                    if (id === item) {
                        amount++;
                    }
                    return 1;
                })
                listCart.push({ book_id: id, amount: amount });
                return 1;
            })
            this.setState({ listCarts: listCart })
        }
    }
    deleteCart(item) {
        let list = [];
        this.state.listCarts.map(cart => {
            if (cart !== item) {
                return list.push(cart);
            }
            return 1;
        })
        this.setState({ listCarts: list });
    }
    changeAmount(bookId, a) {
        let list = this.state.listCarts;
        for (let i = 0; i < list.length; i++) {
            if (parseInt(list[i].book_id) === parseInt(bookId)) {

                list[i].amount = a;
            }
        }
        this.setState({ listCarts: list });
    }
    showPay() {
        this.setState({ showLogin: true })

    }
    hidePay() {
        this.setState({
            showLogin: false,
            name: '',
            phone: '',
            address: '',
            street: '',
            ward: '',
            district: '',
            city: ''
        });

    }
    handleName(e) {
        this.setState({ name: e.target.value });
    }
    handlePhone(e) {
        this.setState({ phone: e.target.value });
    }
    handleAddress(e) {
        this.setState({ address: e.target.value });
    }
    handleStreet(e) {
        this.setState({ street: e.target.value });
    }
    handleWard(e) {
        this.setState({ ward: e.target.value });
    }
    handleDistrict(e) {
        this.setState({ district: e.target.value });
    }
    handleCity(e) {
        this.setState({ city: e.target.value });
    }
    handlePay(e) {
        e.preventDefault();
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/bills/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.username,
                password: localStorage.password,
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.address,
                street: this.state.street,
                ward: this.state.ward,
                district: this.state.district,
                city: this.state.city
            },
            body: JSON.stringify({ data: this.state.listCarts })
        }).then(res => { return res.json() }).then(js => {
            if (js.message === 'success') {
                fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/delete-all`, {
                    method: 'DELETE',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        user: {
                            username: localStorage.username,
                            password: localStorage.password
                        }
                    })
                }).then(res => { return res.json() }).then(json => {
                    if (json.message === 'success') {
                        this.setState({
                            listCarts: [],
                            showLogin: false,
                            name: '',
                            phone: '',
                            address: '',
                            street: '',
                            ward: '',
                            district: '',
                            city: ''
                        });
                        localStorage.removeItem('carts');
                    }
                })
            }
        })
    }
    render() {
        return (
            <Container>
                <div className='wp-cart'>
                    <h2>Giỏ hàng</h2>
                    <Modal show={this.state.showLogin} onHide={this.hidePay}>
                        <Modal.Header closeButton>
                            <Modal.Title>Điền thông tin</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={this.handlePay}>
                            <Modal.Body>
                                <Form.Group controlId='bill-name'>
                                    <Form.Control type="text" name="name" required="required" placeholder="Tên người nhận" onChange={this.handleName} value={this.state.name} />
                                </Form.Group>
                                <Form.Group controlId='bill-phone'>
                                    <Form.Control type="text" name="phone" required="required" placeholder="số điện thoại" onChange={this.handlePhone} value={this.state.phone} />
                                </Form.Group>
                                <Form.Group controlId='bill-add'>
                                    <Form.Control type="text" name="address" required="required" placeholder="Địa chỉ" onChange={this.handleAddress} value={this.state.address} />
                                </Form.Group>
                                <Form.Group controlId='bill-street'>
                                    <Form.Control type="text" name="street" required="required" placeholder="Đường" onChange={this.handleStreet} value={this.state.street} />
                                </Form.Group>
                                <Form.Group controlId='bill-ward'>
                                    <Form.Control type="text" name="ward" required="required" placeholder="Phường/xã" onChange={this.handleWard} value={this.state.ward} />
                                </Form.Group>
                                <Form.Group controlId='bill-district'>
                                    <Form.Control type="text" name="district" required="required" placeholder="Quận/huyện" onChange={this.handleDistrict} value={this.state.district} />
                                </Form.Group>
                                <Form.Group controlId='bill-city'>
                                    <Form.Control type="text" name="city" required="required" placeholder="Tỉnh/thành phố" onChange={this.handleCity} value={this.state.city} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.hidePay}>Hủy</Button>
                                <Button variant="" className='btn-login' type='submit'>Đặt hàng</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                    <div className='cart-list'>
                        {
                            (this.state.listCarts.length === 0) ? (
                                <div className='cart-notify'>
                                    <p>Giỏ hàng trống</p>
                                </div>
                            ) : (
                                <div>
                                    {
                                        this.state.listCarts && this.state.listCarts.map((cart, key) => {
                                            return <CartItem key={key} cart={cart} deleteCart={this.deleteCart} changeAmount={this.changeAmount} />
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className='cart-bottom'>
                        <Button variant='' className='btn-thanhtoan' onClick={this.showPay}>Thanh toán</Button>
                    </div>
                </div>
            </Container>
        );
    }
}
export default withRouter(Cart);