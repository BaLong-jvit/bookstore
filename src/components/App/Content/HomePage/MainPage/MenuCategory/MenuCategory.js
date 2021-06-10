import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import './MenuCategory.css';

class MenuCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listCategories: [],
            icon: true
        }
        this.getListCategories = this.getListCategories.bind(this);
        this.handleDropdownMenu = this.handleDropdownMenu.bind(this);
        // this.handleIdCate = this.handleIdCate.bind(this);
    }
    componentDidMount() {
        this.getListCategories();
    }

    getListCategories() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/${this.props.menu.path}`)
            .then(response => { return response.json() }).then(responseJson => {
                switch (this.props.menu.path) {
                    case 'categories':
                        this.setState({
                            listCategories: responseJson.categories
                        })
                        break;
                    case 'artists':
                        this.setState({
                            listCategories: responseJson.artists
                        })
                        break;
                    case 'languages':
                        this.setState({
                            listCategories: responseJson.languages
                        })
                        break;
                    default:
                        break;
                }
            });
    }

    handleDropdownMenu() {
        if ($(`#list-menu-${this.props.menu.path}`).children().hasClass('active')) {
            $('.icon-dropmenu').each(() => {
                $('.icon-dropmenu').text('+');
            })
            $('.list-cat').each(() => {
                if ($('.list-cat').hasClass('active')) {
                    $('.list-cat').removeClass('active');
                }
            });
        } else {
            $('.icon-dropmenu').each(() => {
                $('.icon-dropmenu').text('+');
            })
            $('.list-cat').each(() => {
                if ($('.list-cat').hasClass('active')) {
                    $('.list-cat').removeClass('active')
                }
            });
            $(`#list-menu-${this.props.menu.path} .list-cat`).addClass('active');
            $(`#list-menu-${this.props.menu.path} .category h2`).last().text('-');
        }
    }

    // handleIdCate(id) {
    //     this.props.onGetId(id);
    // }
    render() {
        return (
            <div id={`list-menu-${this.props.menu.path}`}>
                <div className='category dflex' onClick={this.handleDropdownMenu}>
                    <h2>{this.props.menu.name}</h2>
                    <h2 className='icon-dropmenu'>+</h2>
                </div>
                <div className='list-cat' >
                    {this.state.listCategories && this.state.listCategories.map((category, key) => {
                        return <Link key={key} to={`/${this.props.menu.path}/${category.routine}`} >{category.name} </Link>
                    })}
                </div>
            </div>
        )
    }
}
export default MenuCategory;