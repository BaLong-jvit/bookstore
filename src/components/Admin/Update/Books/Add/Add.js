import { Component } from 'react';
import './Add.css';
import { Container, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNotify: '',
            bookName: null,
            bookDescription: null,
            bookPublisher: null,
            bookPrice: null,
            bookSale: null,
            mainImageUrl: '',
            mainImageUpload: null,
            supImageUrls: null,
            selectSupImgUpload: [],
            publisher: null,
            artists: null,
            compose: [],
            artId: 0,
            languages: null,
            connectLang: [],
            langId: 0,
        }
        this.getArtists = this.getArtists.bind(this);
        this.getLanguages = this.getLanguages.bind(this);
        this.getPublishers = this.getPublishers.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.changeSupImage = this.changeSupImage.bind(this);
        this.handleAddItem = this.handleAddItem.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.deleteSupImage = this.deleteSupImage.bind(this);
        this.changeArtist = this.changeArtist.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);
        this.deleteLanguage = this.deleteArtist.bind(this);
        this.changePublisher = this.changePublisher.bind(this);
        this.uploadBook = this.uploadBook.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeSale = this.changeSale.bind(this);
        this.getMinPub = this.getMinPub.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.getMaxArt = this.getMaxArt.bind(this);
        this.getMaxConnect = this.getMaxConnect.bind(this);
    }
    componentDidMount() {
        this.getArtists();
        this.getLanguages();
        this.getPublishers();
        document.title = `Thêm sách mới | Bá Long Bookstore `
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.compose !== this.state.compose) {
            this.getMaxArt();
        }
        if (prevState.connectLang !== this.state.connectLang) {
            this.getMaxConnect();
        }
        if (prevState.publisher !== this.state.publisher) {
            this.getMinPub();
        }
    }
    changePrice(e) {
        this.setState({
            bookPrice: e.target.value
        })
    }
    changeSale(e) {
        this.setState({
            bookSale: (e.target.value) ? e.target.value : null
        })
    }
    getMinPub() {
        this.setState({ bookPublisher: this.state.publisher[0].id });
    }
    getMaxArt() {
        this.setState({ artId: this.state.compose[this.state.compose.length - 1].id });
    }
    getMaxConnect() {
        this.setState({ langId: this.state.connectLang[this.state.connectLang.length - 1].id });
    }
    getPublishers() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/all/0`).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ publishers: jsonRes.publishers });
        })
    }

    getArtists() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/all-artists`).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ artists: jsonRes.artists });
        })
    }
    getLanguages() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/all/0`).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ languages: jsonRes.languages });
        })
    }
    changeMainImage(e) {
        if (e.target.files && e.target.files[0]) {
            this.setState({
                mainImageUrl: URL.createObjectURL(e.target.files[0]),
                mainImageUpload: e.target.files[0]
            });
        }
    }
    changeSupImage(e) {
        const objFiles = e.target.files;
        if (objFiles.length < 10) {
            let count = 0;
            for (let index = 0; index < objFiles.length; index++) {
                if (objFiles[index].size > 5242880) {
                    count++;
                }
            }
            if (count === 0) {
                let arr = [];
                let arr2 = [];
                Array.from(e.target.files).map((file, key) => {
                    arr.push({ url: URL.createObjectURL(file), id: key });
                    arr2.push({ delete: 0 });
                    return 1;
                })
                this.setState({
                    selectSupImgUpload: arr2,
                    supImageUrls: arr,
                    supImageUpload: e.target.files
                });
            } else {
                this.showAddNotify(false, 'Hình upload phải nhỏ hơn 5MB')
            }
        } else {
            this.showAddNotify(false, 'Hình ảnh phụ phải ít hơn 10 hình');
        }
    }

    deleteSupImage(i) {
        let arr = [];
        if (this.state.supImageUpload !== null) {
            let arrUp = [];
            let arr2 = this.state.selectSupImgUpload;
            Array.from(this.state.supImageUrls).map((img, key) => {
                if (i !== key) {
                    arrUp.push(img);
                } else {
                    arr2[i].delete = 1
                }
                return 1;
            });
            this.setState({
                supImageUrls: arrUp,
                selectSupImgUpload: arr2
            });
        }
        this.state.supImageUrls.map((url, key) => {
            if (i !== url.id) {
                arr.push(url);
            }
            return 1;
        });
        this.setState({ supImageUrls: arr });
    }
    deleteArtist(id) {
        if (this.state.compose.length > 1) {
            let arr = [];
            this.state.compose.map(compose => {
                if (id !== compose.id) {
                    arr.push(compose);
                }
                return 1;
            })
            this.setState({ compose: arr });
        } else {
            this.showAddNotify(false, 'Cần ít nhất 1 tác giả');
        }

    }

    deleteLanguage(id) {
        if (this.state.connectLang.length > 1) {
            let arr = [];
            this.state.connectLang.map(connect => {
                if (id !== connect.id) {
                    arr.push(connect);
                }
                return 1;
            })
            this.setState({ connectLang: arr });
        } else {
            this.showAddNotify(false, 'Cần chọn ít nhất 1 ngôn ngữ');
        }

    }

    handleAddItem(e) {
        e.preventDefault();
        if (this.state.bookName
            && this.state.bookDescription
            && this.state.bookPublisher
            && this.state.bookPrice
            && this.state.mainImageUpload
            && this.state.compose
            && this.state.connectLang) {
            this.uploadBook();
            this.props.history.push('/admin/update/book');
        }
    }
    uploadBook() {
        const dataUpload = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.bookName,
            description: this.state.bookDescription,
            publisher: this.state.bookPublisher,
            price: this.state.bookPrice,
            sale: this.state.bookSale,
            compose: this.state.compose,
            connect: this.state.connect
        }

        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/add-book`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ upload: dataUpload })
        }).then(res => { return res.json() }).then(jsonRes => {
            let formMain = new FormData();
            const d = new Date();
            let imgname = d.getTime();
            formMain.append('file', this.state.mainImageUpload)
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/add-main-image`, {
                method: 'POST',
                headers: {
                    imgname: imgname,
                    username: localStorage.adminuser,
                    password: localStorage.adminpass,
                    bookid: jsonRes.book.id
                },
                body: formMain
            }).then(res => { return res.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    if (this.state.selectSupImgUpload !== null) {
                        this.state.selectSupImgUpload.map((img, key) => {
                            if (img.delete === 0) {
                                this.uploadSingleSupImage(this.state.supImageUpload[key], jsonRes.book.id);
                            }
                            return 1;
                        })
                    }
                    else {
                        return;
                    }
                }
            })
        })
    }

    uploadSingleSupImage(file, id) {
        let formSup = new FormData();
        var d = new Date();
        let imgname = d.getTime();
        formSup.append('file', file);
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/add-sup-image`, {
            method: 'POST',
            headers: {
                imgname: imgname,
                username: localStorage.adminuser,
                password: localStorage.adminpass,
                bookid: id
            }, body: formSup
        }).then(res => { return res.json() }).then(jsRes => {
        })
    }
    changeName(e) {
        this.setState({ bookName: e.target.value })
    }
    changeDescription(e) {
        this.setState({ bookDescription: e.target.value });
    }
    changeArtist(e) {
        let arr = this.state.compose;
        let count = 0;
        this.state.compose.map(compose => {
            if (e.target.value === compose.id) {
                count++;
            }
            return 1;
        })
        if (!count) {
            this.state.artists.map(art => {
                if (e.target.value === art.id) {
                    arr.push(art);
                }
                return 1;
            });
            this.setState({ compose: arr });
            this.getMaxArt();
        }
    }
    changeLanguage(e) {
        let arr = this.state.connectLang;
        let count = 0;
        this.state.connectLang.map(connect => {
            if (e.target.value === connect.id) {
                count++;
            }
            return 1;
        })
        if (!count) {
            this.state.languages.map(art => {
                if (e.target.value === art.id) {
                    arr.push(art);
                }
                return 1;
            });
            this.setState({ connectLang: arr });
            this.getMaxConnect();
        }
    }
    changePublisher(e) {
        this.setState({ bookPublisher: e.target.value })
    }
    showAddNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ addNotify: `${mess}` });
        $(`.add-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`.add-notify`).css('display', 'none');
        }, 800);
    }
    cancelEdit() {
        this.props.history.push('/admin/update/book');
    }
    render() {
        return (
            <Container>
                <h2>Thêm sản phẩm</h2>
                <div className='add-notify' style={{
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
                <Form className='form-edit-book' onSubmit={this.handleAddItem}>
                    <Form.Group className='fgr-main-image'>
                        {
                            (this.state.mainImageUpload) ? (<img src={this.state.mainImageUrl} alt="" />) : (
                                <div></div>
                            )
                        }

                        <Form.File name="main-image" label="Hình ảnh chính của sản phẩm" className='input-main-image' onChange={this.changeMainImage} />
                    </Form.Group>
                    <Form.Group className='fgr-sup-image'>
                        {this.state.supImageUrls && this.state.supImageUrls.map((url, key) => {
                            return <div className='w-sup-img' key={key}>
                                <img src={url.url} alt="" />
                                <Button variant='' className='close-sup' onClick={() => this.deleteSupImage(url.id)} ><i className="fa fa-times" aria-hidden="true"></i></Button>
                            </div>
                        })}
                        <Form.File id="sup-image" label="Hình ảnh phụ của sản phẩm" className='input-sup-image' multiple onChange={this.changeSupImage} />
                    </Form.Group>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên sách</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên sách" value={this.state.bookName} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" placeholder="Thêm mô tả" rows={3} value={this.state.bookDescription} onChange={this.changeDescription} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-price">
                        <Form.Label>Giá sách</Form.Label>
                        <Form.Control type="number" placeholder="Giá sách" value={this.state.bookPrice} onChange={this.changePrice} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-sale">
                        <Form.Label>Giá sách sale</Form.Label>
                        <Form.Control type="number" placeholder="Giá sách sale" value={this.state.bookSale} onChange={this.changeSale} />
                    </Form.Group>
                    <Form.Group controlId="item-artists">
                        <Form.Label>Tác giả</Form.Label>
                        <div className='select-artist'>
                            {this.state.compose && this.state.compose.map((ar, key) => {
                                return <span key={key}>{ar.name}<strong onClick={() => this.deleteArtist(ar.id)}><i className="fa fa-times" aria-hidden="true"></i></strong></span>
                            })}
                        </div>
                        <Form.Control as="select" value={this.state.artId} onChange={this.changeArtist} >
                            <option value={0} >Chọn tác giả</option>
                            {this.state.artists && this.state.artists.map((option, key) => {
                                return <option key={key} value={option.id} >{option.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="item-artists">
                        <Form.Label>Ngôn ngữ</Form.Label>
                        <div className='select-artist'>
                            {this.state.connectLang && this.state.connectLang.map((ar, key) => {
                                return <span key={key}>{ar.name}<strong onClick={() => this.deleteLanguage(ar.id)}><i className="fa fa-times" aria-hidden="true"></i></strong></span>
                            })}
                        </div>
                        <Form.Control as="select" value={this.state.langId} onChange={this.changeLanguage} >
                            <option value={0} >Chọn ngôn ngữ</option>
                            {this.state.languages && this.state.languages.map((option, key) => {
                                return <option key={key} value={option.id} >{option.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="item-publisher">
                        <Form.Label>Nhà sản xuất</Form.Label>
                        <Form.Control as="select" value={this.state.bookPublisher} onChange={this.changePublisher}>
                            {this.state.publishers && this.state.publishers.map((option, key) => {
                                return <option key={key} value={option.id} >{option.name}</option>
                            })}
                        </Form.Control>
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
export default withRouter(Add);