import React from 'react';
import { withRouter } from "react-router-dom";
import './FeatureItems.css';
import ItemProduct from './ItemProduct/ItemProduct';
import Pagination from "react-js-pagination";


class FeatureItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: [],
            page: 1,
            totalItemsCount: 1,
            nameCat: 'Feature Items'
        }
    }
    componentDidMount() {
        this.getListItem(this.state.page);
        this.totalItemsCount();
        this.getNameCategory();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.catroutine !== this.props.match.params.catroutine
            || prevProps.match.params.cat !== this.props.match.params.cat
            || prevState.page !== this.state.page || prevState.nameCat !== this.state.nameCat) {
            this.getListItem(this.state.page);
            this.totalItemsCount();
            this.getNameCategory();
            document.title = (this.state.nameCat === 'Feature Items') ? 'Bá Long Bookstore' : this.state.nameCat + ' | Bá Long Bookstore';

        }
    }
    totalItemsCount() {
        const path = this.props.match.params.cat ? this.props.match.params.cat : 'feature-items';
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/${path}/count-item`, {
            method: 'GET',
            headers: {
                categoryroutine: this.props.match.params.catroutine
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ totalItemsCount: (responseJson.amount.amount) });
        })
    }
    getListItem(page) {
        const path = this.props.match.params.cat ? this.props.match.params.cat : 'feature-items';
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/${path}/list-items`, {
            method: 'GET',
            headers: {
                page: page,
                categoryroutine: this.props.match.params.catroutine
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listItems: responseJson.items });
        })
    }
    getNameCategory() {
        const path = this.props.match.params.cat ? this.props.match.params.cat : false;
        if (!path) {
            return;
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/${path}/name-cat`, {
            method: 'GET',
            headers: {
                categoryroutine: this.props.match.params.catroutine
            }
        }).then(response => { return response.json() }).then(responseJson => {

            this.setState({ nameCat: (responseJson.name.name) });
        })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    render() {
        return (
            <div className='title feature-items '>
                <h2 className='feature-items-list'>{this.state.nameCat}</h2>
                <div className='main-list-item'>
                    <div className='list-items' >
                        {
                            this.state.listItems && this.state.listItems.map((item, key) => {
                                return <ItemProduct key={key} item={item}></ItemProduct>
                            })
                        }
                    </div >
                    <div className='pagination'>
                        <Pagination
                            activePage={this.state.page}
                            itemsCountPerPage={9}
                            totalItemsCount={this.state.totalItemsCount}
                            pageRangeDisplayed={10}
                            onChange={this.handlePageChange.bind(this)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(FeatureItems);