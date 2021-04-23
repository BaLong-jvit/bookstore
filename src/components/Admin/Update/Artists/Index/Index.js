import { Component } from 'react';
import './Index.css';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import ArtistRow from '../ArtistRow/ArtistRow';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: null,

            page: 1,
            totalItemsCount: 0,

        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.deleteArtist = this.deleteArtist.bind(this);
    }
    componentDidMount() {
        document.title = 'Quản lý tác giả | Bá Long BookStore'
        this.getListArtists(this.state.page);
        this.totalItemsCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getListArtists(this.state.page);
        }

    }

    getListArtists(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/all-artists`, {
            method: 'GET',
            headers: {
                page: page
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ artists: responseJson.artists });
        })
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/count-artist`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deleteArtist() {
        this.setState({ page: 1 });
        this.getListArtists(1);
        this.totalItemsCount();
    }
    render() {

        return (
            <Container className='update-artist'>
                <h2>Tác giả hiện có</h2>
                <div className='control-artist'>
                    <Link to='/admin/update/artist/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                    <Link to='/admin/update/trash-artist' className='btn-trash'><i className="fa fa-trash" aria-hidden="true"></i>&nbsp; Thùng rác</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>

                            <th>Tên tác giả</th>

                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.artists && this.state.artists.map((artist, key) => {
                            return <ArtistRow key={key} stt={key} artist={artist} page={this.state.page} deleteArtist={this.deleteArtist} />
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