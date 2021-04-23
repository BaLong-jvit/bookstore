import { Component } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Edit.css';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: {}
        }
        this.getLanguage = this.getLanguage.bind(this);
        this.changeName = this.changeName.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
    }
    componentDidMount() {
        this.getLanguage();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.language !== this.state.language) {
            document.title = `${this.state.language.name} | Sửa | Bá Long BookStore`
        }
    }
    getLanguage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/language/${this.props.match.params.idLanguage}`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ language: resJson.language });
        })
    }
    changeName(e) {
        let language = this.state.language;
        language.name = e.target.value;
        this.setState({ language: language });
    }
    cancelEdit() {
        this.props.history.push('/admin/update/language');
    }
    handleChangeItem(e) {
        e.preventDefault();
        const dataUp = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.language.name
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/update/${this.state.language.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ data: dataUp })
        }).then(res => { return res.json() }).then(jsonRes => {

        })
        this.props.history.push('/admin/update/language');
    }
    render() {
        return (
            <Container>
                <h2>Sửa ngôn ngữ</h2>
                <Form className='form-edit-book' onSubmit={this.handleChangeItem}>
                    <Form.Group controlId="item-name">
                        <Form.Label>Ngôn ngữ</Form.Label>
                        <Form.Control type="text" placeholder="Nhập ngôn ngữ" value={this.state.language.name} onChange={this.changeName} required="required" />
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