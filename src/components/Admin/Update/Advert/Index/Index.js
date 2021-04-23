import React, { Component } from 'react';
import './Index.css';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import AdvertRow from '../AdvertRow/AdvertRow';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdvert: [],
            page: 1,
            totalItemsCount: 0
        }
        this.deleteAdvert = this.deleteAdvert.bind(this);
    }
    componentDidMount() {
        document.title = 'Quản lý quảng cáo | Bá Long BookStore';
        this.getAdvert(this.state.page);
        this.totalItemsCount();
    }
    getAdvert(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/all/0`, {
            method: 'GET',
            headers: {
                page: page
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listAdvert: responseJson.adverts });
        })
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/count/0`, {
            method: 'GET'
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: responseJson.amount.amount });
        })
    }
    deleteAdvert() {
        this.setState({ page: 1 });
        this.getAdvert(1);
        this.totalItemsCount();
    }
    handlePageChange(e) {
        this.setState({
            page: e
        })
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Quảng cáo hiện có</h2>
                <div className='control-book'>
                    <Link to='/admin/update/advert/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                    <Link to='/admin/update/trash-advert' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tên chương trình</th>
                            <th>Mô tả ngắn</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listAdvert && this.state.listAdvert.map((advert, key) => {
                            return <AdvertRow key={key} stt={key} advert={advert} page={this.state.page} deleteAdvert={this.deleteAdvert} />
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
        );
    }
}

export default Index;
