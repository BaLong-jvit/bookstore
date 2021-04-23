import { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './Index.css';
import LanguageRow from '../LanguageRow/LanguageRow';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: null,
            page: 1,
            totalItemsCount: 0
        }
        this.getLanguages = this.getLanguages.bind(this);
        this.deleteLanguage = this.deleteLanguage.bind(this);
    }
    componentDidMount() {
        document.title = `Quản lý ngôn ngữ | Bá Long Bookstore `
        this.getLanguages(this.state.page);
        this.totalItemsCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getLanguages(this.state.page);
        }
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/count/0`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    getLanguages(page) {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/languages/all/0`, {
            method: 'GET',
            headers: { page: page }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ languages: jsonRes.languages })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deleteLanguage() {
        this.setState({ page: 1 });
        this.getLanguages(1);
        this.totalItemsCount();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Danh sách ngôn ngữ</h2>
                <div className='control-book'>
                    <Link to='/admin/update/language/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                    <Link to='/admin/update/trash-language' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Ngôn ngữ</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.languages && this.state.languages.map((lang, key) => {
                            return <LanguageRow key={key} page={this.state.page} stt={key} language={lang} deleteLanguage={this.deleteLanguage} />
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