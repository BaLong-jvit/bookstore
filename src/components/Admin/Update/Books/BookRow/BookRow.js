import { Component } from 'react';
import './BookRow.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class BookRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            artists: null,
            publisher: {},
            languages: null,
            delNotify: ''
        }
        this.showDeleteNotify = this.showDeleteNotify.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
    }
    componentDidMount() {
        this.getImage();
        this.getArtist();
        this.getLanguage();
        this.getPublisher();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.book !== this.props.book) {
            this.getImage();
            this.getArtist();
            this.getLanguage();
            this.getPublisher();
        }
    }
    getImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/main-image`, {
            method: 'GET',
            headers: { bookid: this.props.book.id }
        }).then(response => { return response.json() }).then(jsonResponse => {
            this.setState({ image: jsonResponse.image })
        })
    }
    getArtist() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/artists`, {
            method: 'GET',
            headers: { bookid: this.props.book.id }
        }).then(response => { return response.json() }).then(jsonResponse => {
            this.setState({ artists: jsonResponse.artists })
        })
    }
    getLanguage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/languages/${this.props.book.id}`, {
            method: 'GET'
        }).then(response => { return response.json() }).then(jsonResponse => {
            this.setState({ languages: jsonResponse.languages })
        })
    }
    getPublisher() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/publisher`, {
            method: 'GET',
            headers: { publisherid: this.props.book.publisher_id }
        }).then(response => { return response.json() }).then(jsonResponse => {
            this.setState({ publisher: jsonResponse.publisher });
        })
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.book.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                bookid: this.props.book.id,
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/delete-book`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dataupdate: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteBook();
                    this.showDeleteNotify(true, 'Xóa sản phẩm thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa sản phẩm không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.book.id}-notify`).css({
                display: 'none'
            });
        }
    }
    deleteItem() {
        $(`#accept-${this.props.book.id}-notify`).css({
            display: 'block'
        });
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.book.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.book.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.book.id}-notify`} style={{
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
                    <div id={`accept-${this.props.book.id}-notify`} style={{
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
                        }}>{`Xác nhận xóa sản phẩm: ${this.props.book.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    <div className='img-item'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.image.path}/${this.state.image.name}`} alt="" />
                    </div>
                </td>
                <td><span>{this.props.book.name}</span></td>
                <td><span>{this.props.book.price}</span></td>
                <td><span>{this.props.book.sale}</span></td>
                <td>
                    <div>
                        {
                            this.state.artists && this.state.artists.map((artist, key) => {
                                return <p key={key}> {artist.name}</p>
                            })
                        }
                    </div>
                </td>
                <td>
                    <div>
                        {
                            this.state.languages && this.state.languages.map((language, key) => {
                                return <p key={key}> {language.name}</p>
                            })
                        }
                    </div>
                </td>
                <td><span>{this.state.publisher.name}</span></td>
                <td>
                    <div>
                        <Link to={`/admin/update/book/edit/${this.props.book.id}`} className='btn-edit'><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</Link>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}
export default BookRow;