import { Component } from 'react';
import './Add.css';
import { withRouter } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.changeName = this.changeName.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.handleChangeItem = this.handleChangeItem.bind(this);
    }
    componentDidMount() {
        document.title = 'Thêm nhà xuất bản mới | Bá Long BookStore'
    }
    changeName(e) {
        this.setState({ name: e.target.value });
    }

    cancelEdit() {
        this.props.history.push('/admin/update/publisher');
    }
    handleChangeItem(e) {
        e.preventDefault();
        const dataUp = {
            username: localStorage.adminuser,
            password: localStorage.adminpass,
            name: this.state.name,
        }
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/add`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            }, body: JSON.stringify({ data: dataUp })
        }).then(res => { return res.json() }).then(resJson => {

        })
        this.props.history.push('/admin/update/publisher');
    }

    render() {
        return (
            <Container>
                <h2>Thêm nhà xuất bản mới</h2>

                <Form className='form-edit-book' onSubmit={this.handleChangeItem}>
                    <Form.Group controlId="item-name">
                        <Form.Label>Tên nhà xuất bản</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên nhà xuất bản" value={this.state.name} onChange={this.changeName} required="required" />
                    </Form.Group>
                    <div className='form-btn'>
                        <Button variant='' className='cancel' onClick={this.cancelEdit}><i className="fa fa-ban" aria-hidden="true"></i>&nbsp;Hủy</Button>
                        <Button variant='' className='submit' type='submit'><i className="fa fa-floppy-o" aria-hidden="true" ></i>&nbsp;Lưu</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}
export default withRouter(Add);
