import { Component } from 'react';
import { Button } from 'react-bootstrap';
import './BookRowTrash.css';
import $ from 'jquery';

class BookRowTrash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            artists: [],
            languages: [],
            publisher: {},
            trashNotify: '',
            warning: ''
        }
        this.deleteItem = this.deleteItem.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
        this.convertItem = this.convertItem.bind(this);
        this.acceptConvert = this.acceptConvert.bind(this);
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
    deleteItem() {
        this.setState({ warning: 'Xóa vĩnh viễn sản phẩm: ' });
        $(`#verify-${this.props.book.id}-notify`).css({
            display: 'block'
        })
    }
    convertItem() {
        this.setState({ warning: 'Khôi phục lại sản phẩm: ' });
        $(`#convert-${this.props.book.id}-notify`).css({
            display: 'block'
        })
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#verify-${this.props.book.id}-notify`).css({
                display: 'none'
            });
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/del-book`, {
                method: 'DELETE',
                headers: {
                    bookid: this.props.book.id,
                    username: localStorage.adminuser,
                    password: localStorage.adminpass
                }

            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteBook();
                    this.showDeleteNotify(true, 'Xóa sản phẩm thành công!');
                } else {
                    this.showDeleteNotify(false, 'Xóa sản phẩm không thành công!');
                }
            })
        } else {
            $(`#verify-${this.props.book.id}-notify`).css({
                display: 'none'
            });
        }
    }
    acceptConvert(accept) {
        if (accept) {
            $(`#convert-${this.props.book.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                bookid: this.props.book.id,
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/convert-book`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dataupdate: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteBook();
                    this.showDeleteNotify(true, 'Khôi phục sản phẩm thành công!');
                } else {
                    this.showDeleteNotify(false, 'Khôi phục sản phẩm không thành công!');
                }
            })
        } else {
            $(`#convert-${this.props.book.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ trashNotify: `${mess}` });
        $(`#trash-${this.props.book.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#trash-${this.props.book.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`trash-${this.props.book.id}-notify`} style={{
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
                        }}>{this.state.trashNotify}</p>
                    </div>
                    <div id={`verify-${this.props.book.id}-notify`} style={{
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
                        }}>{`${this.state.warning} ${this.props.book.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    <div id={`convert-${this.props.book.id}-notify`} style={{
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
                        }}>{`${this.state.warning} ${this.props.book.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptConvert(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptConvert(true)}>Khôi phục</Button>
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
                            this.state.languages && this.state.languages.map((a, key) => {
                                return <p key={key}> {a.name}</p>
                            })
                        }
                    </div>
                </td>
                <td><span>{this.state.publisher.name}</span></td>
                <td>
                    <div>
                        <Button variant='' className='btn-convert' onClick={this.convertItem}><i className="fa fa-repeat" aria-hidden="true"></i>&nbsp; Lấy lại</Button>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}
export default BookRowTrash;