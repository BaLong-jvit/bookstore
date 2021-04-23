import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {

            artist: {}
        }
        this.getArtist = this.getArtist.bind(this);
        this.changeName = this.changeName.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
    }
    componentDidMount() {
        this.getArtist();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.artist !== this.state.artist) {
            document.title = `${this.state.artist.name} | Sửa | Bá Long BookStore`
        }
    }
    getArtist() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/artist`, {
            method: 'GET',
            headers: { artist: this.props.match.params.idArtist }
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ artist: resJson.artist });
        })
    }
    changeName(e) {
        let artist = this.state.artist;
        artist.name = e.target.value;
        this.setState({ artist: artist });
    }
    cancelEdit() {
        this.props.history.push('/admin/update/artist');
    }
    handleChangeItem(e) {
        e.preventDefault();
        const dataUp = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            artist: this.state.artist.id,
            name: this.state.artist.name
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/update-artist`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data: dataUp })
        }).then(res => { return res.json() }).then(jsonRes => {

        })
        this.props.history.push('/admin/update/artist');
    }
    render() {
        return (
            <Container>
                <h2>Sửa tác giả</h2>
                <Form className='form-edit-book' onSubmit={this.handleChangeItem}>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên tác giả</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên tác giả" value={this.state.artist.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <div className='form-btn'>
                        <Button variant='' className='cancel' onClick={this.cancelEdit}><i className="fa fa-ban" aria-hidden="true"></i>&nbsp;Hủy</Button>
                        <Button variant='' className='submit' type='submit'><i className="fa fa-floppy-o" aria-hidden="true" ></i>&nbsp;Lưu</Button>
                    </div>
                </Form>
            </Container>
        )
    }
} export default withRouter(Edit);