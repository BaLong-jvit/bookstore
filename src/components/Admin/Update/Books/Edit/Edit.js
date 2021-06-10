import { Component } from 'react';
import './Edit.css';
import { Container, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateNotify: '',
            book: {},

            mainImage: {},
            supImage: [],

            artists: [],
            compose: [],
            maxArt: null,

            languages: [],
            connectLang: [],
            maxLang: null,

            publishers: [],

            mainImageUrl: '',
            supImageUrls: [],
            selectSupImgUpload: [],

            mainImageUpload: null,
            supImageUpload: null
        }
        this.getMainImageUrl = this.getMainImageUrl.bind(this);
        this.getMainImage = this.getMainImage.bind(this);
        this.changeMainImage = this.changeMainImage.bind(this);
        this.changeSupImage = this.changeSupImage.bind(this);
        this.getSupImageUrls = this.getSupImageUrls.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
        this.showUpdateNotify = this.showUpdateNotify.bind(this);
        this.deleteSupImage = this.deleteSupImage.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changePrice = this.changePrice.bind(this);
        this.changeSale = this.changeSale.bind(this);
        this.changeDescription = this.changeDescription.bind(this);
        this.changeArtist = this.changeArtist.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.getMaxArt = this.getMaxArt.bind(this);
        this.getMaxLang = this.getMaxLang.bind(this);
        this.changePublisher = this.changePublisher.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.updateCompose = this.updateCompose.bind(this);
        this.updateMainImage = this.updateMainImage.bind(this);
        this.uploadSupImage = this.uploadSupImage.bind(this);
        this.uploadSingleSupImage = this.uploadSingleSupImage.bind(this);
    }

    componentDidMount() {
        this.getBook();
        this.getArtists();
        this.getLanguages();
        this.getPublishers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.idBook !== this.props.match.params.idBook) {
            this.getBook();
        }
        if (prevState.book !== this.state.book) {
            document.title = `${this.state.book.name} | Sửa | Bá Long Bookstore `

            this.getMainImage();
            this.getSupImage();
            this.getCompose();
            this.getConnectLang();
        }
        if (prevState.mainImage !== this.state.mainImage) {
            this.getMainImageUrl();
        }
        if (prevState.book !== this.state.book || prevState.supImage !== this.state.supImage) {
            this.getSupImageUrls();
        }
        if (prevState.compose !== this.state.compose) {
            this.getMaxArt();
        }
        if (prevState.connectLang !== this.state.connectLang) {
            this.getMaxLang();
        }
    }
    getMaxArt() {
        this.setState({ maxArt: this.state.compose[this.state.compose.length - 1].id });
    }
    getMaxLang() {
        this.setState({ maxLang: this.state.connectLang[this.state.connectLang.length - 1].id });
    }

    getSupImageUrls() {
        let arr = [];
        this.state.supImage.map(img => {
            arr.push({
                url: `${process.env.REACT_APP_DOMAIN}/image/${img.path}/${img.name}`,
                id: img.id
            });
            return 1;
        });
        this.setState({ supImageUrls: arr });
    }

    getMainImageUrl() {
        this.setState({ mainImageUrl: `${process.env.REACT_APP_DOMAIN}/image/${this.state.mainImage.path}/${this.state.mainImage.name}` });
    }

    getCompose() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/artists`, {
            method: 'GET',
            headers: {
                bookid: this.state.book.id
            }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ compose: jsonRes.artists });
        })
    }
    getConnectLang() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/languages/${this.state.book.id}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ connectLang: jsonRes.languages });
        })
    }
    getSupImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/support-images`, {
            method: 'GET',
            headers: {
                bookid: this.state.book.id
            }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ supImage: jsonRes.images });
        })
    }

    getMainImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/main-image`, {
            method: 'GET',
            headers: {
                bookid: this.state.book.id
            }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ mainImage: jsonRes.image });
        })
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

    getBook() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/book/${this.props.match.params.idBook}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ book: resJson.book });
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
        if (objFiles) {
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
                    let supArr = this.state.supImage;
                    supArr.map(sup => {
                        sup.deleted = 1;
                        return 1;
                    });
                    this.setState({ supImage: supArr });
                } else {
                    this.showUpdateNotify(false, 'Hình upload phải nhỏ hơn 5MB')
                }
            } else {
                this.showUpdateNotify(false, 'Hình ảnh phụ phải ít hơn 10 hình');
            }
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
        } else {
            let supArr = this.state.supImage;
            supArr.map((sup, key) => {
                if (i === sup.id) {
                    sup.deleted = 1;
                }
                return 1;
            });
            this.setState({ supImage: supArr });
            this.state.supImageUrls.map(url => {
                if (i !== url.id) {
                    arr.push(url);
                }
                return 1;
            });
            this.setState({ supImageUrls: arr });
        }
    }

    changeName(e) {
        let book = this.state.book;
        book.name = e.target.value;
        this.setState({ book: book });
    }

    changeDescription(e) {
        let book = this.state.book;
        book.description = e.target.value;
        this.setState({ book: book });
    }

    changeArtist(e) {
        let arr = this.state.compose;
        let count = 0;
        this.state.compose.map(compose => {
            if (parseInt(e.target.value) === parseInt(compose.id)) {
                count++;
            }
            return 1;
        })
        if (!count) {
            this.state.artists.map(art => {
                if (parseInt(e.target.value) === parseInt(art.id)) {
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
            if (parseInt(e.target.value) === parseInt(connect.id)) {
                count++;
            }
            return 1;
        })
        if (!count) {
            this.state.languages.map(lang => {
                if (parseInt(e.target.value) === parseInt(lang.id)) {
                    arr.push(lang);
                }
                return 1;
            });
            this.setState({ connectLang: arr });
            this.getMaxLang();
        }
    }
    deleteArtist(id) {
        if (this.state.compose.length > 1) {
            let arr = [];
            this.state.compose.map(compose => {
                if (parseInt(id) !== parseInt(compose.id)) {
                    arr.push(compose);
                }
                return 1;
            })
            this.setState({ compose: arr });
        } else {
            this.showUpdateNotify(false, 'Cần ít nhất 1 tác giả');
        }

    }
    deleteLanguage(id) {
        if (this.state.connectLang.length > 1) {
            let arr = [];
            this.state.connectLang.map(connect => {
                if (parseInt(id) !== parseInt(connect.id)) {
                    arr.push(connect);
                }
                return 1;
            })
            this.setState({ connectLang: arr });
        } else {
            this.showUpdateNotify(false, 'Cần chọn ít nhất 1 ngôn ngữ');
        }

    }
    changePublisher(e) {
        let book = this.state.book;
        book.publisher_id = e.target.value;
        this.setState({ book: book });
    }

    changePrice(e) {
        let book = this.state.book;
        book.price = e.target.value;
        this.setState({ book: book });
    }
    changeSale(e) {
        let book = this.state.book;

        book.Sale = (e.target.value) ? e.target.value : null;

        this.setState({ book: book });
    }
    handleChangeItem(e) {
        e.preventDefault();
        this.updateBook();
        this.updateCompose();
        this.updateConnectLang();
        this.updateMainImage();
        this.uploadSupImage();
        this.props.history.push('/admin/update/book');
    }
    updateBook() {
        const data = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            id: this.state.book.id,
            name: this.state.book.name,
            price: this.state.book.price,
            sale: this.state.book.sale,
            description: this.state.book.description,
            publisher: this.state.book.publisher_id,

        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/update-book`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ bookupdate: data })
        }).then(res => { return res.json() }).then(jsonRes => {
            if (jsonRes.message === 'success') {
            }
        })

    }
    updateCompose() {
        const dataCompose = {
            id: this.state.book.id,
            composes: this.state.compose
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/composes/update-compose`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ composes: dataCompose })
        }).then(res => { return res.json() }).then(jsonResponse => {
            if (jsonResponse.message === 'success') {
            }
        })
    }
    updateConnectLang() {
        const dataConnectLang = {
            id: this.state.book.id,
            connects: this.state.connectLang
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/connect-lang/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ connects: dataConnectLang })
        }).then(res => { return res.json() }).then(jsonResponse => {
            if (jsonResponse.message === 'success') {
            }
        })
    }
    updateMainImage() {
        if (this.state.mainImageUpload !== null) {
            const formData = new FormData();
            const d = new Date();
            formData.append('file', this.state.mainImageUpload);
            const imgName = d.getTime();
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/update-book-main`, {
                method: 'POST',
                headers: {
                    imgname: imgName,
                    username: localStorage.adminuser,
                    password: localStorage.adminpass,
                    mainimg: this.state.mainImage.id
                },
                body: formData
            }).then(res => { return res.json() }).then(jsonRes => {

            })
        }

    }
    uploadSupImage() {
        if (this.state.supImageUpload !== null) {
            this.state.selectSupImgUpload.map((img, key) => {
                if (img.delete === 0) {
                    this.uploadSingleSupImage(this.state.supImageUpload[key]);
                }
                return 1;
            })
            let arr = this.state.supImage;
            arr.map(a => {
                a.deleted = 1;
                return 1;
            })
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/delete-sup-image`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ data: arr })
            }).then(res => { return res.json() }).then(jsonRes => {

            });
        } else {
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/delete-sup-image`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ data: this.state.supImage })
            }).then(res => { return res.json() }).then(jsonRes => {

            });
        }
    }
    uploadSingleSupImage(file) {
        const formData = new FormData();
        const d = new Date();
        let imgname = d.getTime();
        formData.append(`file`, file);
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/book-images/upload-sup-image`, {
            method: 'POST',
            headers: {
                imgname: imgname,
                username: localStorage.adminuser,
                password: localStorage.adminpass,
                bookid: this.state.book.id
            },
            body: formData
        }).then(res => { return res.json() }).then(jsonRes => {

        })
    }
    showUpdateNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ updateNotify: `${mess}` });
        $(`.update-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`.update-notify`).css('display', 'none');
        }, 800);
    }
    cancelEdit() {
        this.props.history.push('/admin/update/book');
    }
    render() {
        return (
            <Container>
                <h2>Thay đổi thông tin sản phẩm</h2>
                <div className='update-notify' style={{
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
                    }}>{this.state.updateNotify}</p>
                </div>
                <Form className='form-edit-book' onSubmit={this.handleChangeItem}>
                    <Form.Group className='fgr-main-image'>
                        <img src={this.state.mainImageUrl} alt="" />
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
                        <Form.Control type="text" placeholder="Nhập tên sách" value={this.state.book.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-description">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={3} value={this.state.book.description} onChange={this.changeDescription} required="required" />
                    </Form.Group>

                    <Form.Group controlId="item-price">
                        <Form.Label>Giá sách</Form.Label>
                        <Form.Control type="number" placeholder="Giá sách" value={this.state.book.price} onChange={this.changePrice} required="required" />
                    </Form.Group>
                    <Form.Group controlId="item-sale">
                        <Form.Label>Giá sách sale</Form.Label>
                        <Form.Control type="number" placeholder="Giá sách sale" value={this.state.book.sale} onChange={this.changeSale} />
                    </Form.Group>
                    <Form.Group controlId="item-artists">
                        <Form.Label>Tác giả</Form.Label>
                        <div className='select-artist'>
                            {this.state.compose && this.state.compose.map((ar, key) => {
                                return <span key={key}>{ar.name}<strong onClick={() => this.deleteArtist(ar.id)}><i className="fa fa-times" aria-hidden="true"></i></strong></span>
                            })}
                        </div>
                        <Form.Control as="select" value={this.state.maxArt} onChange={this.changeArtist}>
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
                        <Form.Control as="select" value={this.state.maxLang} onChange={this.changeLanguage}>
                            {this.state.languages && this.state.languages.map((option, key) => {
                                return <option key={key} value={option.id} >{option.name}</option>
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="item-publisher">
                        <Form.Label>Nhà sản xuất</Form.Label>
                        <Form.Control as="select" value={this.state.book.publisher_id} onChange={this.changePublisher}>
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
export default withRouter(Edit);