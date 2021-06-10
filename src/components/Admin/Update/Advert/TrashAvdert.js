import { Component } from 'react';
import './Advert.css';
import AdvertRowTrash from './AdvertRowTrash/AdvertRowTrash';
import Pagination from "react-js-pagination";
import { Table, Container } from "react-bootstrap";
import { Link } from 'react-router-dom'

class TrashAdvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adverts: [],
            page: 1,
            totalItemsCount: 7

        }
        this.deleteAdvert = this.deleteAdvert.bind(this);
    }
    componentDidMount() {
        document.title = `Quảng cáo đã xóa | Bá Long Bookstores`;
        this.getAdverts(this.state.page);
        this.getCountAdvert();
    }
    getCountAdvert() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/count/1`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(resJs => {
            this.setState({ totalItemsCount: resJs.amount.amount })
        })
    }
    getAdverts(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/adverts/all/1`, {
            method: 'GET',
            headers: { page: page }
        }).then(res => { return res.json() }).then(jsRes => {
            this.setState({ adverts: jsRes.adverts })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e })
    }
    deleteAdvert() {
        this.setState({ page: 1 });
        this.getAdverts(1);
        this.getCountAdvert();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Quảng cáo đã bị xóa</h2>
                <div className='control-book'>
                    <Link to='/admin/update/advert' className='btn-add'><i className="fa fa-backward" aria-hidden="true"></i>&nbsp; Trở lại</Link>
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
                        {this.state.adverts && this.state.adverts.map((advert, key) => {
                            return <AdvertRowTrash key={key} stt={key} advert={advert} page={this.state.page} deleteAdvert={this.deleteAdvert} />
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
export default TrashAdvert;