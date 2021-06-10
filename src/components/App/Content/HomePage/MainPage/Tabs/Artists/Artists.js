import React from 'react';
import './Artists.css';

import ItemProduct from '../../FeatureItems/ItemProduct/ItemProduct';


class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: []
        }
    }
    componentDidMount() {
        this.getListItem();
    }
    getListItem() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/feature-items/list-items`, {
            method: 'GET',
            headers: {
                page: 2
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listItems: responseJson.items });
        })
    }
    render() {
        return (
            <div className='main-list-item'>
                <div className='list-items' >
                    {
                        this.state.listItems && this.state.listItems.map((item, key) => {
                            return <ItemProduct key={key} item={item}></ItemProduct>
                        })
                    }
                </div >
            </div>
        );
    }
}
export default Artists;