import React from 'react';
import { withRouter } from 'react-router-dom';
import './ListShop.css';
import { Container } from 'react-bootstrap';
import Shop from './Shop/Shop';

class ListShop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listShopInLocal: [],
            nameLocal: 'Hệ thống cửa hàng'
        }
    }
    componentDidMount() {
        this.getShopsInLocal();
        this.getNameLocal();


    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.local !== this.props.match.params.local || prevState.nameLocal !== this.state.nameLocal) {
            this.getShopsInLocal();
            this.getNameLocal();
            document.title = `${this.state.nameLocal} | Bá Long Bookstore`;

        }
    }
    getNameLocal() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/shops/name-local`, {
            method: 'GET',
            headers: {
                localroutine: this.props.match.params.local
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ nameLocal: 'Hệ thống cửa hàng ' + responseJson.name.city });
        })
    }
    getShopsInLocal() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/shops/list-shop-in-local`, {
            method: 'GET',
            headers: {
                localroutine: this.props.match.params.local
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listShopInLocal: responseJson.shops });
        })
    }
    render() {
        return (
            <Container>
                <div className='title list-shop'>
                    <h3 className='title'>{this.state.nameLocal}</h3>
                    {this.state.listShopInLocal && this.state.listShopInLocal.map((shop, key) => {

                        return <Shop key={key} shop={shop} />
                    })}
                </div>
            </Container>
        );
    }
}
export default withRouter(ListShop);