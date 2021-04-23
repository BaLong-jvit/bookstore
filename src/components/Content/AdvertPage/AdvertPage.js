import React from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import ItemProduct from '../HomePage/MainPage/FeatureItems/ItemProduct/ItemProduct';
import Pagination from 'react-js-pagination';
import './AdvertPage.css';

class AdvertPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            advert: {},
            banner: {},
            listBooks: [],
            page: 1,
            totalBook: 0
        }
    }
    componentDidMount() {
        this.getAdvert();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.advert !== this.state.advert) {
            this.getBanner();
            this.getListBooks();
            this.getTotalBook();
            document.title = `${this.state.advert.name} | Bá Long Bookstore `
        }
        if (prevState.page !== this.state.page) {
            this.getListBooks();
        }
    }
    getAdvert() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/adverts/advert`, {
            method: 'GET',
            headers: {
                advertroutine: this.props.match.params.advertRoutine
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ advert: responseJson.advert });
        })
    }
    getBanner() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/adverts/banner-image`, {
            method: 'GET',
            headers: {
                advertid: this.state.advert.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ banner: responseJson.image });
        })
    }
    getListBooks() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/adverts/list-books`, {
            method: 'GET',
            headers: {
                advertid: this.state.advert.id,
                page: this.state.page
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listBooks: responseJson.books });
        })
    }
    getTotalBook() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/adverts/get-count`, {
            method: 'GET',
            headers: { advertid: this.state.advert.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalBook: responseJson.amount.amount });
        })
    }
    handlePageChange(e) {
        this.setState({ page: e })
    }
    render() {
        return (
            <Container>
                <div className='adv-content'>
                    <div className='adv-banner'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.banner.path}/${this.state.banner.name}`} alt="" />
                    </div>
                    <div className='adv-items'>
                        <div className='list-items adv-list' >
                            {
                                this.state.listBooks && this.state.listBooks.map((item, key) => {
                                    return <ItemProduct key={key} item={item}></ItemProduct>
                                })
                            }
                        </div >
                        <div className='pagination'>
                            <Pagination
                                activePage={this.state.page}
                                itemsCountPerPage={8}
                                totalItemsCount={this.state.totalBook}
                                pageRangeDisplayed={10}
                                onChange={this.handlePageChange.bind(this)}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}
export default withRouter(AdvertPage);