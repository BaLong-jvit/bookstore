import { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ArtistRowTrash from './ArtistRowTrash/ArtistRowTrash';
import Pagination from 'react-js-pagination';
import './Artists.css';

class TrashArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            totalItemsCount: 0,
            artists: null
        }
        this.deleteArtist = this.deleteArtist.bind(this);
    }
    componentDidMount() {
        document.title = 'Tác giả đã xóa | Bá Long BookStore'
        this.getArtists(this.state.page);
        this.totalItemsCount();
    }
    totalItemsCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/count-trash`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    getArtists(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/trash-artist`, {
            method: 'GET',
            headers: {
                page: page
            }
        }).then(res => { return res.json() }).then(jsonRes => {
            this.setState({ artists: jsonRes.artists });
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    deleteArtist() {
        this.setState({ page: 1 });
        this.getArtists(1);
        this.totalItemsCount();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Tác giả đã xóa</h2>
                <div className='control-book'>
                    <Link to='/admin/update/artist' className='btn-add'><i className="fa fa-backward" aria-hidden="true"></i>&nbsp; Trở về</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Tên tác giả</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.artists && this.state.artists.map((artist, key) => {
                            return <ArtistRowTrash key={key} stt={key} artist={artist} page={this.state.page} deleteArtist={this.deleteArtist} />
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
export default TrashArtists;