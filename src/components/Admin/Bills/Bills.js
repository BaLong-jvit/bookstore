import React from 'react';
import './Bills.css';
import Pagination from 'react-js-pagination';
import { Container, Form, Table } from 'react-bootstrap';
import BillRow from './BillRow/BillRow';

class Bills extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: [],
            page: 1,
            bills: [],
            totalItemsCount: 0,
            selectStatus: 0
        }
        this.changeStatus = this.changeStatus.bind(this);
        this.reloadBill = this.reloadBill.bind(this);
    }
    componentDidMount() {
        this.getListStatus();

    }
    componentDidUpdate(preProps, preState) {
        if (preState.status !== this.state.status) {
            this.setState({ selectStatus: this.state.status[this.state.status.length - 1].id })
        }
        if (preState.selectStatus !== this.state.selectStatus) {
            this.getBills(this.state.page, this.state.selectStatus);
            this.getCount(this.state.selectStatus);
        }
    }
    getBills(page, status) {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/bills/all/${status}`, {
            method: 'GET',
            headers: { page: page }
        }).then(res => { return res.json() }).then(resJs => {
            this.setState({ bills: resJs.bills })
        })
    }
    getCount(status) {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/bills/count/${status}`, {
            method: 'GET',

        }).then(res => { return res.json() }).then(resJs => {
            this.setState({ totalItemsCount: resJs.amount.amount })
        })
    }
    getListStatus() {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/status/all`, { method: "GET" }).then(res => { return res.json() }).then(js => {
            this.setState({ status: js.status })
        })
    }
    changeStatus(e) {
        this.setState({ selectStatus: e.target.value })
    }
    handlePageChange(e) {
        this.setState({ page: e })
    }
    reloadBill() {
        this.getListStatus();
    }
    render() {
        return (
            <Container className="update-book">
                <h2>Danh sách đơn hàng</h2>
                <div className="note-color">
                    <Form.Control as="select" value={this.state.selectStatus} onChange={this.changeStatus} >
                        {this.state.status && this.state.status.map((color, key) => {
                            return (
                                <option key={key} value={color.id} >{`${color.id}: ${color.name}`}</option>
                            )
                        })}
                    </Form.Control>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Mã đơn hàng</th>
                            <th>Tên khách hàng</th>
                            <th>Tên sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Trạng thái</th>
                            <th>Thành tiền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.bills && this.state.bills.map((bill, key) => {
                                return <BillRow key={key} bill={bill} page={this.state.page} stt={key} reloadBill={this.reloadBill} />
                            })
                        }
                    </tbody>
                </Table>
                <div className='pagination'>
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={20}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </Container>
        );
    }
}
export default Bills;