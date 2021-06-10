import React from 'react';
import './CartItem.css';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery';

class CartItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            image: {},
            artists: [],
            total: '',
            amount: 0
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.handleAddAmount = this.handleAddAmount.bind(this);
        this.handleMinusAmount = this.handleMinusAmount.bind(this);
    }
    componentDidMount() {
        this.getBook();
        this.setState({ amount: this.props.cart.amount })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.book !== this.state.book) {
            this.getBookImage();
            this.getArtist();
            this.getTotal();
        }
        if (prevProps.cart !== this.props.cart || prevState.amount !== this.state.amount) {
            this.getBook();
            this.getTotal();
        }
    }
    getTotal() {
        const price = (this.state.book.sale) ? parseInt(this.state.book.sale) : parseInt(this.state.book.price);
        this.setState({ total: price * this.state.amount });
    }
    getArtist() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/artists/artists`, {
            method: 'GET',
            headers: { bookid: this.state.book.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ artists: responseJson.artists });
        })
    }
    getBookImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/book-images/main`, {
            method: 'GET',
            headers: {
                bookid: this.state.book.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ image: responseJson.mainImage });
        })
    }
    getBook() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/books/get-book-by-id`, {
            method: 'GET',
            headers: { bookid: this.props.cart.book_id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ book: responseJson.book });
        })
    }
    deleteItem() {
        if (localStorage.username && localStorage.password) {
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/delete-cart`, {
                method: 'DELETE',
                headers: this.props.cart
            }).then(res => { return res.json() }).then(res => {
                this.props.deleteCart(this.props.cart);
            })
        } else {
            let arrayBooks = [];
            if (localStorage.carts) {
                arrayBooks = JSON.parse(localStorage.carts);
            }
            let a = [];
            arrayBooks.map(book => {
                if (book !== this.props.cart.book_id) {
                    return a.push(book);
                }
                return 1;
            });
            localStorage.carts = JSON.stringify(a);
            this.props.deleteCart(this.props.cart);
        }
    }
    handleAddAmount() {
        let a = $(`#amount-of-${this.props.cart.book_id}`).val();
        if (a < 100) {
            a++;
            this.setState({ amount: a });
            this.props.changeAmount(this.props.cart.book_id, a);
            if (localStorage.username && localStorage.password) {
                const dataUpdate = {
                    username: localStorage.username,
                    password: localStorage.password,
                    amount: a,
                    bookid: this.props.cart.book_id
                }
                return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/update-amount`, {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ dataUpdate: dataUpdate })
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }, networkError => {
                    console.log(networkError.message);
                }).then(jsonResponse => {
                    if (jsonResponse.message) {
                        alert('Phiên đăng nhập hết hạn');
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                        this.props.history.push('/');
                    }
                })
            } else {
                let arrayBooks = [];
                if (localStorage.carts) {
                    arrayBooks = JSON.parse(localStorage.carts);
                }
                arrayBooks.push(this.props.cart.book_id);
                localStorage.carts = JSON.stringify(arrayBooks);
            }

        }
    }
    handleMinusAmount() {
        let c = $(`#amount-of-${this.props.cart.book_id}`).val();
        if (c > 1) {
            c--;
            this.setState({ amount: c });
            this.props.changeAmount(this.props.cart.book_id, c);
            if (localStorage.username && localStorage.password) {
                const dataUpdate = {
                    username: localStorage.username,
                    password: localStorage.password,
                    amount: c,
                    bookid: this.props.cart.book_id
                }
                return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/update-amount`, {
                    method: 'PUT',
                    headers: { 'Content-type': 'application/json' },
                    body: JSON.stringify({ dataUpdate: dataUpdate })
                }).then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Request failed!');
                }, networkError => {
                    console.log(networkError.message);
                }).then(jsonResponse => {
                    if (jsonResponse.message) {
                        alert('Phiên đăng nhập hết hạn');
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                        this.props.history.push('/');
                    }
                })
            } else {
                let arrayBooks = [];
                if (localStorage.carts) {
                    arrayBooks = JSON.parse(localStorage.carts);
                }
                let list = [];
                let b = 0;
                arrayBooks.map((book) => {

                    if (book === this.props.cart.book_id) {
                        b++;
                        if (b <= c) {
                            list.push(book);
                        }
                    }
                    else {
                        list.push(book);
                    }
                    return 1;
                });
                localStorage.carts = JSON.stringify(list);
            }

        }
    }
    render() {
        return (
            <div className='cart-item'>
                <div className='img-book'>
                    <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.image.path}/${this.state.image.name}`} alt="" />
                    <div className='img-bottom'></div>
                </div>
                <div className='info-item'>
                    <h2>{this.state.book.name}</h2>
                    <p><strong>Tác giả</strong> {this.state.artists && this.state.artists.map((artist, key) => {
                        return <Link to='#' key={key} className='ar-cart'>{artist.name}, &nbsp;</Link>
                    })}</p>
                    <p><strong>Giá:&nbsp;</strong>{(this.state.book.sale) ? (<span>{this.state.book.sale}</span>) : (<span>{this.state.book.price}</span>)}</p>
                    <p><strong>Tổng tiển:&nbsp;</strong>{this.state.total}</p>
                    <Button variant="danger" size="lg" className='btn-del' onClick={this.deleteItem}>x</Button>
                    <div className='select-amount'>
                        <Button variant="secondary" size="lg" onClick={this.handleMinusAmount}>-</Button>
                        <input type="text" id={`amount-of-${this.props.cart.book_id}`} value={this.state.amount} readOnly={true} />
                        <Button variant="secondary" size="lg" onClick={this.handleAddAmount}>+</Button>
                    </div>
                </div>

            </div>
        );
    }
}
export default withRouter(CartItem);