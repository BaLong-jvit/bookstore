import { Component } from 'react';
import './Index.css';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BookRow from '../BookRow/BookRow';
import Pagination from "react-js-pagination";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBooks: [],
            page: 1,
            totalItemsCount: 0,
        }
        this.deleteBook = this.deleteBook.bind(this);
    }
    componentDidMount() {
        document.title = 'Quản lý sách | Bá Long BookStore'
        this.getListBook(this.state.page);
        this.totalItemsCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getListBook(this.state.page);
        }
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/count-book`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    getListBook(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/books/all-books`, {
            method: 'GET',
            headers: {
                page: page
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listBooks: responseJson.books });
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deleteBook() {
        this.setState({ page: 1 });
        this.getListBook(1);
        this.totalItemsCount();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Sách hiện có</h2>
                <div className='control-book'>
                    <Link to='/admin/update/book/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                    <Link to='/admin/update/trash-book' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tên sách</th>
                            <th>Giá</th>
                            <th>Sale</th>
                            <th>Tác giả</th>
                            <th>Ngôn ngữ</th>
                            <th>Nhà sản xuất</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.listBooks && this.state.listBooks.map((book, key) => {
                            return <BookRow key={key} stt={key} book={book} page={this.state.page} deleteBook={this.deleteBook} />
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