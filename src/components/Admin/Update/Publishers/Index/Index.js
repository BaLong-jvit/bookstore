import { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './Index.css';
import PublisherRow from '../PublisherRow/PublisherRow';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            publishers: null,
            page: 1,
            totalItemsCount: 0
        }
        this.getPublisher = this.getPublisher.bind(this);
        this.deletePublisher = this.deletePublisher.bind(this);
    }
    componentDidMount() {
        document.title = `Quản lý nhà sản xuất | Bá Long Bookstore `
        this.getPublisher(this.state.page);
        this.totalItemsCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getPublisher(this.state.page);
        }
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/count/0`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    getPublisher(page) {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/all/0`, {
            method: 'GET',
            headers: { page: page }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ publishers: jsonRes.publishers })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deletePublisher() {
        this.setState({ page: 1 });
        this.getPublisher(1);
        this.totalItemsCount();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Danh sách nhà sản xuất</h2>
                <div className='control-book'>
                    <Link to='/admin/update/publisher/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                    <Link to='/admin/update/trash-publisher' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Tên nhà sản xuất</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.publishers && this.state.publishers.map((pub, key) => {
                            return <PublisherRow key={key} page={this.state.page} stt={key} publisher={pub} deletePublisher={this.deletePublisher} />
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
export default Index;