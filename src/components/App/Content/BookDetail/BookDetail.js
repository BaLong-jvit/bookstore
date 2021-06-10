import React from 'react';
import './BookDetail.css';
import $ from 'jquery';

import { withRouter, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import BookComments from './BookComments/BookComments';

class BookDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            book: {},
            image: {},
            spImage: [],
            artist: [],
            publisher: {},
            beginSlice: 0,
            dplBtnArrow: true,
            commentBook: [],
            newComment: '',
            addNotify: ''
        }
        this.handleSpImageToRight = this.handleSpImageToRight.bind(this);
        this.handleSpImageToLeft = this.handleSpImageToLeft.bind(this);
        this.setDplBtnArrow = this.setDplBtnArrow.bind(this);
        this.handleZoomSpImage = this.handleZoomSpImage.bind(this);
        this.changeNewComment = this.changeNewComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.showAddNotify = this.showAddNotify.bind(this);
    }
    componentDidMount() {
        this.getBook();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.book !== this.state.book) {
            this.getImage();
            this.getSpImages();
            this.getArtist();
            this.getPublisher();
            this.getCommentBook();
            document.title = `${this.state.book.name} | Bá Long Bookstore `
        }
        if (prevState.spImage !== this.state.spImage) {
            this.setDplBtnArrow();
        }
    }
    setDplBtnArrow() {
        (this.state.spImage.length > 4) ? (this.setState({ dplBtnArrow: true })) : (this.setState({ dplBtnArrow: false }));
    }
    getCommentBook() {

        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/books/book-comments`, {
            method: 'GET',
            headers: {
                bookid: this.state.book.id,
                cmtparent: 0
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ commentBook: responseJson.comments });
        })
    }
    getPublisher() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/publishers/publisher`, {
            method: 'GET',
            headers: { publisherid: this.state.book.publisher_id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ publisher: responseJson.publisher });
        })
    }
    getArtist() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/artists/artists`, {
            method: 'GET',
            headers: { bookid: this.state.book.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ artists: responseJson.artists });
        })
    }
    getImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/book-images/main`, {
            method: 'GET',
            headers: { bookid: this.state.book.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ image: responseJson.mainImage });
        })
    }
    getSpImages() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/book-images/support`, {
            method: 'GET',
            headers: { bookid: this.state.book.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ spImage: responseJson.spImages });
        })
    }
    getBook() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/books/book`, {
            method: 'GET',
            headers: { bookroutine: this.props.match.params.bookRoutine }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ book: responseJson.book });
        })
    }
    handleSpImageToRight() {
        var i = this.state.beginSlice;
        if (i < this.state.spImage.length - 4) {
            this.setState({ beginSlice: (i + 1) });
        }
    }
    handleSpImageToLeft() {
        var i = this.state.beginSlice;
        if (i > 0) {
            this.setState({ beginSlice: (i - 1) });
        }
    }

    handleZoomSpImage(o) {
        let htmlString = `<img src='${process.env.REACT_APP_DOMAIN}/image/${o.path}/${o.name}' alt='' />`;
        $('.view-book').html(htmlString);
    }
    changeNewComment(e) {
        this.setState({ newComment: e.target.value });
    }
    sendComment() {
        const comment = {
            content: this.state.newComment,
            bookid: this.state.book.id,
            re: 0,
            user: localStorage.username
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/comments/add-comment`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ comment: comment })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, error => { console.log(error.message) }).then(jsonResponse => {
            this.setState({ newComment: '' });
            let arr = this.state.commentBook;
            arr.push(jsonResponse.comment);
            this.setState({ commentBook: arr });
        })
    }
    addToCart() {
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
                        bookid: this.state.book.id
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
            arrayBooks.push(this.state.book.id);
            localStorage.carts = JSON.stringify(arrayBooks);
            this.showAddNotify('Thêm vào giỏ hàng thành công');
        }
    }
    showAddNotify(mess) {
        this.setState({ addNotify: `${mess}` });
        $(`.add-${this.state.book.id}-notify`).css({
            display: 'block',
            backgroundColor: '#fdb45e'
        });
        setTimeout(() => {
            $(`.add-${this.state.book.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <Container>
                <div className='book-detail'>
                    <div className={`add-${this.state.book.id}-notify`} style={{
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
                    <Row>
                        <Col sm={5}>
                            <div className='view-book'>
                                <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.image.path}/${this.state.image.name}`} alt="" />
                            </div>
                            <div className='sp-img'>
                                {
                                    this.state.spImage.slice(this.state.beginSlice, this.state.beginSlice + 4) &&
                                    this.state.spImage.slice(this.state.beginSlice, this.state.beginSlice + 4).map((dplImage, key) => {
                                        return (<div className='sp-img-items' key={key} >
                                            <img src={`${process.env.REACT_APP_DOMAIN}/image/${dplImage.path}/${dplImage.name}`} onMouseOver={() => this.handleZoomSpImage(dplImage)} alt="" />
                                        </div>)
                                    })
                                }
                                {
                                    this.state.dplBtnArrow ? (<div>
                                        <Button className="btn-control-sp btn-aleft" variant='' onClick={this.handleSpImageToLeft}>
                                            <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                        </Button>
                                        <Button className="btn-control-sp btn-aright" variant='' onClick={this.handleSpImageToRight}>
                                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                        </Button>
                                    </div>) : (<div></div>)
                                }

                            </div>
                        </Col>
                        <Col sm={7}>
                            <div className='book-info'>
                                <h2>{this.state.book.name}</h2>
                                <div className='wp-info'>
                                    <div className='center-info'>
                                        <p>Tác giả: {this.state.artists && this.state.artists.map((artist, key) => {
                                            return <Link to='#' key={key} href='#'>{artist.name}</Link>
                                        })
                                        }</p>
                                        <p>Nhà sản xuất: <Link to='#' href='#'>{this.state.publisher.name}</Link></p>
                                        {this.state.book.sale ? (
                                            <div>
                                                <h2>{this.state.book.sale} đ</h2>
                                                <h4>{this.state.book.price} đ</h4>
                                            </div>
                                        ) : (<h2>{this.state.book.price} đ</h2>)}
                                        <Button className="btn-cart" variant='' onClick={this.addToCart}>
                                            <i className="fa fa-shopping-cart"></i>&nbsp;Add to cart
									    </Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <h2>Thông tin chi tiết</h2>
                    <p> {this.state.book.description}</p>
                    <h2>Nhận xét</h2>
                    {this.state.commentBook && this.state.commentBook.map((comment, key) => {
                        return <BookComments key={key} comment={comment}></BookComments>
                    })}
                    {
                        (localStorage.username && localStorage.password) ? (
                            <div className='type-comment'>
                                <input type="text" placeholder="Viết bình luận..." id='input-comment' value={this.state.newComment} onChange={this.changeNewComment} />
                                <Button className='btn-submit' variant='' type='submit' onClick={this.sendComment}>Gửi</Button>
                            </div>
                        ) : (
                                <div></div>
                            )
                    }

                </div>
            </Container>
        );
    }
}
export default withRouter(BookDetail);