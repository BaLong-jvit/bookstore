import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountRow from '../AccountRow/AccountRow';
import Pagination from 'react-js-pagination';
import './Index.css';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAccounts: [],
            page: 1,
            totalItemsCount: 0
        }
        this.deleteAccount = this.deleteAccount.bind(this);
    }
    componentDidMount() {
        document.title = 'Quản lý tài khoản | Bá Long Bookstore';
        this.getAccounts(this.state.page);
        this.getCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getAccounts(this.state.page);
        }
    }
    getCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/accounts/count/0`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({ totalItemsCount: jsRes.amount.amount })
        })
    }
    getAccounts(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/accounts/all/0`, {
            method: 'GET',
            headers: { page: page }
        }).then(res => { return res.json() }).then(js => {
            this.setState({ listAccounts: js.accounts })
        })
    }

    handlePageChange(e) {
        this.setState({ page: e })
    }
    deleteAccount() {
        this.setState({ page: 1 });
        this.getAccounts(1);
        this.getCount();
    }
    render() {

        return (
            <Container className='update-book'>
                <h2>Quản lý tài khoản</h2>
                <div className='control-book'>
                    <Link to='/admin/account/trash' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tên tài khoản</th>
                            <th>Tên đăng nhập</th>
                            <th>Ngày tạo</th>
                            <th>Người tạo</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listAccounts && this.state.listAccounts.map((acc, key) => {
                            return <AccountRow key={key} stt={key} page={this.state.page} account={acc} deleteAccount={this.deleteAccount} />
                        })}
                    </tbody>
                </Table>
                <div className='pagination'>
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={9}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </Container>
        )
    }
}

export default Index
