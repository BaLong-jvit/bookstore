import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import './SearchPage.css';
import { Container } from 'react-bootstrap';
import ItemProduct from '../HomePage/MainPage/FeatureItems/ItemProduct/ItemProduct';


class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listResult: []
        }
    }
    componentDidMount() {
        this.getListResult();
        document.title = `Tìm kiếm | Bá Long Bookstore `
    }
    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            this.getListResult();

        }
    }
    getListResult() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/searchs/get-book`, {
            method: 'GET',
            headers: {
                keyword: queryString.parse(this.props.location.search).key
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listResult: responseJson.results })
        })
    }
    render() {
        return (
            <Container>
                <div className='result-page'>
                    <h2>{`Kết quả tìm thấy cho: " ${queryString.parse(this.props.location.search).key} " `}</h2>
                    <div className='result-items'>
                        {
                            this.state.listResult && this.state.listResult.map((item, key) => {
                                return <ItemProduct key={key} item={item}></ItemProduct>
                            })
                        }
                    </div>
                </div>
            </Container>
        );
    }
}
export default withRouter(SearchPage);