import React from 'react';
import { Container } from 'react-bootstrap';
import './Blog.css';
import BlogItem from './BlogItem/BlogItem';
import Pagination from "react-js-pagination";


class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBlogItem: [],
            page: 1,
            totalItemsCount: 1,
        }
    }
    componentDidMount() {
        this.getListBlogs(this.state.page);
        this.getTotalCountBlog();
        document.title = `Blogs | Bá Long Bookstore `
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getListBlogs(this.state.page);
        }
    }
    getListBlogs(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/list-blogs`, {
            method: 'GET',
            headers: { page: page }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ listBlogItem: responseJson.blogs });
        })
    }
    getTotalCountBlog() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/blog-count`).then(response => { return response.json() })
            .then(responseJson => {
                this.setState({ totalItemsCount: (responseJson.amount.amount) });
            })
    }
    handlePageChange(e) {
        this.setState({ page: e });
    }
    render() {
        return (
            <Container>
                <div className='title blog-area'>
                    <h2 className="title text-center">Blog mới nhất</h2>
                    {/* short blog item */}
                    {this.state.listBlogItem && this.state.listBlogItem.map((blog, key) => {
                        return <BlogItem key={key} blog={blog} />
                    })}
                </div>
                <div className='pagination'>
                    <Pagination
                        activePage={this.state.page}
                        itemsCountPerPage={4}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={10}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            </Container>
        );
    }
}
export default Blog;