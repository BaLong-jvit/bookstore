import React from 'react';
import { Link } from 'react-router-dom';
import './BlogItem.css';

class BlogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogArtistName: '',
            blogImage: {}
        }
    }
    componentDidMount() {
        this.getBlogArtistName();
        this.getBlogImage();

    }
    getBlogArtistName() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/blog-artist-name`, {
            method: 'GET',
            headers: { accountid: this.props.blog.create_by }
        }).then(response => { return response.json() })
            .then(responseJson => {
                this.setState({ blogArtistName: responseJson.name.name });
            })
    }
    getBlogImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/get-blog-image`, {
            method: 'GET',
            headers: { blogid: this.props.blog.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ blogImage: responseJson.image });
        })
    }
    render() {
        return (
            <div className='blog-item'>
                <Link to={`/blog-single/${this.props.blog.routine}`} className='blog-name'>{this.props.blog.name}</Link>
                <div className='post-meta'>
                    <ul>
                        <li><i className="fa fa-user"></i> {this.state.blogArtistName} </li>
                        <li><i className="fa fa-clock-o"></i> {this.props.blog.create_time} </li>
                        <li><i className="fa fa-calendar"></i> {this.props.blog.create_date} </li>
                    </ul>
                </div>
                <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.blogImage.path}/${this.state.blogImage.name}`} alt='' />
                <p>{this.props.blog.short_blog}</p>
                <Link to={`/blog-single/${this.props.blog.routine}`} className='btn read-more'>Xem Blog</Link>
            </div>
        );
    }
}
export default BlogItem;