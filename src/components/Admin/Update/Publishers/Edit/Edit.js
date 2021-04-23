import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {

            publisher: {}
        }
        this.getPublisher = this.getPublisher.bind(this);
        this.changeName = this.changeName.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
    }
    componentDidMount() {

        this.getPublisher();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.publisher !== this.state.publisher) {
            document.title = `${this.state.publisher.name} | Sửa | Bá Long BookStore`
        }
    }
    getPublisher() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/publisher`, {
            method: 'GET',
            headers: { publisherid: this.props.match.params.idPublisher }
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ publisher: resJson.publisher });
        })
    }
    changeName(e) {
        let publisher = this.state.publisher;
        publisher.name = e.target.value;
        this.setState({ publisher: publisher });
    }
    cancelEdit() {
        this.props.history.push('/admin/update/publisher');
    }
    handleChangeItem(e) {
        e.preventDefault();
        const dataUp = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            publisher: this.state.publisher.id,
            name: this.state.publisher.name
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/update-publisher`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data: dataUp })
        }).then(res => { return res.json() }).then(jsonRes => {

        })
        this.props.history.push('/admin/update/publisher');
    }
    render() {
        return (
            <Container>
                <h2>Sửa nhà xuất bản</h2>
                <Form className='form-edit-book' onSubmit={this.handleChangeItem}>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên nhà xuất bản</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên nhà xuất bản" value={this.state.publisher.name} onChange={this.changeName} required="required" />
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