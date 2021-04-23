import { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import LanguageRowTrash from './LanguageRowTrash/LanguageRowTrash'
import './Languages.css';
class TrashLanguages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalItemsCount: 1,
            languages: []
        }
        this.deleteLanguage = this.deleteLanguage.bind(this);
    }
    componentDidMount() {
        document.title = `Nhà xuất bản đã xóa | Bá Long Bookstore`;
        this.getLanguages(this.state.page);
        this.getCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getLanguages(this.state.page);
        }
    }
    getCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/count/1`).then(res => { return res.json() }).then(r => {
            this.setState({ totalItemsCount: r.amount.amount })
        })
    }
    getLanguages(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/all/1`, {
            method: 'GET',
            headers: {
                username: localStorage.adminuser,
                password: localStorage.adminpass,
                page: page
            }
        }).then(res => { return res.json() }).then(resJson => {
            this.setState({ languages: resJson.languages })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deleteLanguage() {
        this.setState({ page: 1 });
        this.getLanguages(1);
        this.getCount();
    }
    render() {
        return (
            <Container>
                <Container className='update-book'>
                    <h2>Danh sách ngôn ngữ đã xóa</h2>
                    <div className='control-book'>
                        <Link to='/admin/update/language' className='btn-add'><i className="fa fa-backward" aria-hidden="true"></i>&nbsp; Trở về</Link>
                    </div>
                    <Table>
                        <thead className='tb-name'>
                            <tr>
                                <th>#</th>
                                <th>Tên ngôn ngữ</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.languages && this.state.languages.map((pub, key) => {
                                return <LanguageRowTrash key={key} page={this.state.page} stt={key} language={pub} deleteLanguage={this.deleteLanguage} />
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
export default TrashLanguages;