import { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import PublisherRowTrash from './PublisherRowTrash/PublisherRowTrash'
import './Publishers.css';
class TrashPublishers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalItemsCount: 1,
            publishers: []
        }
        this.deletePublisher = this.deletePublisher.bind(this);
    }
    componentDidMount() {
        document.title = `Nhà xuất bản đã xóa | Bá Long Bookstore`;
        this.getPublisher(this.state.page);
        this.getCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getPublisher(this.state.page);
        }
    }
    getCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/count/1`).then(res => { return res.json() }).then(r => {
            this.setState({ totalItemsCount: r.amount.amount })
        })
    }
    getPublisher(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/publishers/all/1`, {
            method: 'GET',
            headers: {
                username: localStorage.adminuser,
                password: localStorage.adminpass,
                page: page
            }
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ publishers: resJson.publishers })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deletePublisher() {
        this.setState({ page: 1 });
        this.getPublisher(1);
        this.getCount();
    }
    render() {
        return (
            <Container>
                <Container className='update-book'>
                    <h2>Danh sách nhà sản xuất đã xóa</h2>
                    <div className='control-book'>
                        <Link to='/admin/update/publisher' className='btn-add'><i className="fa fa-backward" aria-hidden="true"></i>&nbsp; Trở về</Link>
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
                                return <PublisherRowTrash key={key} page={this.state.page} stt={key} publisher={pub} deletePublisher={this.deletePublisher} />
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
            </Container>
        );
    }
}
export default TrashPublishers;