import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './Account.css';
import ItemProduct from '../HomePage/MainPage/FeatureItems/ItemProduct/ItemProduct';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            accAvatar: {},
            boughtBooks: []
        }
    }
    componentDidMount() {
        // this.props.history.back();
        // window.history.back();
        if (!localStorage.username || !localStorage.password) {
            this.props.history.push('/');
        } else {
            this.getAccount();
        }
        document.title = `Tài khoản | Bá Long Bookstore `;
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.account !== this.state.account) {
            this.getAvtAccount();
            this.getListBoughtBooks();
        }
    }
    getListBoughtBooks() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/books/get-bought-books`, {
            method: 'GET',
            headers: {
                id: this.state.account.id
            }
        }).then((response => { return response.json() })).then(responseJson => {
            this.setState({ boughtBooks: responseJson.books })
        })
    }
    getAvtAccount() {

        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/get-image`, {
            method: 'GET',
            headers: { accountid: this.state.account.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ accAvatar: responseJson.image });
        })

    }
    getAccount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/get-account`, {
            method: 'GET',
            headers: { username: localStorage.username, password: localStorage.password }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ account: responseJson.account });
        })
    }
    render() {
        return (
            <Container>
                <Row>
                    <Col xs={4}>
                        <div className='wap-img'>
                            <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.accAvatar.path}/${this.state.accAvatar.name}`} alt="" />
                            <div className='set-height'></div>
                        </div>
                    </Col>
                    <Col xs={8}>
                        <div className='acc-info'>
                            <h2>{this.state.account.name}</h2>
                            <p><strong>Ngày tạo: </strong> {this.state.account.create_at}</p>
                        </div>
                    </Col>
                </Row>
                <h2>Sách đã mua</h2>
                <div className='adv-items'>
                    <div className='list-items adv-list' >
                        {
                            this.state.boughtBooks && this.state.boughtBooks.map((item, key) => {
                                return <ItemProduct key={key} item={item}></ItemProduct>
                            })
                        }
                    </div >

                </div>
            </Container>
        );
    }
}
export default withRouter(Account);