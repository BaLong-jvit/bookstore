import React from 'react';
import { Link } from 'react-router-dom';
import './ItemProduct.css';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class ItemProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainImage: {
                name: 'default.png',
                path: 'home'
            },
            spImages: [],
            price: '',
            addNotify: ''
        }
        this.getMainImage = this.getMainImage.bind(this);
        this.getSpImage = this.getSpImage.bind(this);
        this.showAddNotify = this.showAddNotify.bind(this);
    }

    componentDidMount() {
        this.getMainImage();
        this.getSpImage();
        this.formatMoney();

    }
    formatMoney() {
        var formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });

        this.setState({
            price: formatter.format(this.props.item.price),
            sale: formatter.format(this.props.item.sale)
        });
    }
    getSpImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/book-images/support`, {
            method: 'GET',
            headers: {
                bookid: this.props.item.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({
                spImages: responseJson.spImages
            })
        })
    }

    getMainImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/book-images/main`, {
            method: 'GET',
            headers: {
                bookid: this.props.item.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ mainImage: responseJson.mainImage });
        })
    }
    addToCart(item) {
        if (localStorage.username && localStorage.password) {
            const header = {
                username: localStorage.username,
                password: localStorage.password
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/check-login`, {
                method: 'GET',
                headers: header
            }
            ).then(response => { return response.json() }).then(responseJson => {
                if (responseJson.message === 'success') {
                    const insertData = {
                        username: localStorage.username,
                        password: localStorage.password,
                        bookid: item.id
                    };
                    return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/carts/insert-book`, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ insert: insertData })
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Request failed!');
                    }, networkError => {
                        console.log(networkError.message);
                    }).then(jsonResponse => {
                        if (jsonResponse.cart) {
                            this.showAddNotify('Thêm vào giỏ hàng thành công');
                        } else {
                            this.showAddNotify('Thêm vào giỏ hàng thất bại');
                        }
                    });
                } else {
                    this.showAddNotify('Vui lòng đăng nhập lại');
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');
                    window.location.reload();
                }
            })
        }
        else {
            let arrayBooks = [];
            if (localStorage.carts) {
                arrayBooks = JSON.parse(localStorage.carts);
            }
            arrayBooks.push(item.id);
            localStorage.carts = JSON.stringify(arrayBooks);
            this.showAddNotify('Thêm vào giỏ hàng thành công');
        }
    }
    showAddNotify(mess) {
        this.setState({ addNotify: `${mess}` });
        $(`#add-${this.props.item.id}-notify`).css({
            display: 'block',
            backgroundColor: '#fdb45e'
        });
        setTimeout(() => {
            $(`#add-${this.props.item.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <div className="product-image-wrapper">
                <div id={`add-${this.props.item.id}-notify`} style={{
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
                    }}>{this.state.addNotify}</p>
                </div>
                <div className="single-products">
                    <div className="productinfo text-center">
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.mainImage.path}/${this.state.mainImage.name}`} alt="" />
                    </div>
                    <div className="product-overlay">
                    </div>
                </div>
                {
                    (this.props.item.sale) ? (
                        <div className='price'>
                            <h2>{this.state.sale} </h2>
                            <h4>{this.state.price}</h4>
                        </div>

                    ) : (
                            <div className='price'>
                                <h2>{this.state.price}</h2>
                            </div>
                        )
                }
                <p>{this.props.item.name}</p>
                <Link to={`/book-detail/${this.props.item.routine}`} className="btn btn-default add-to-cart"><i
                    className="fa fa-eye"></i>&nbsp;Xem chi tiết</Link>
                <Button variant='' onClick={() => this.addToCart(this.props.item)} className="btn btn-default add-to-cart"><i
                    className="fa fa-shopping-cart"></i>&nbsp;Thêm vào giỏ hàng</Button>
                <div className="choose">
                    <ul className="nav nav-pills nav-justified">
                        <li><Link to="/#"><i className="fa fa-plus-square"></i>Add to wishlist</Link></li>
                        <li><Link to="/#"><i className="fa fa-plus-square"></i>Add to compare</Link></li>
                    </ul>
                </div>
            </div >
        );
    }
}
export default ItemProduct;