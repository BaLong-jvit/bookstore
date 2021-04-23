import React from 'react';
import './BlogSingle.css';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import BlogComments from './BlogComments/BlogComments';

class BlockSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: {},
            blogArtistName: '',
            newComment: '',
            blogImage: {},
            comments: [],
            isDisable: true,

        }
        this.changeNewComment = this.changeNewComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }
    componentDidMount() {
        this.getBlog();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.blog !== this.state.blog) {
            this.getBlogArtistName();
            this.getBlogImage();
            this.getComments();
            document.title = `${this.state.blog.name} | Bá Long Bookstore `
        }
    }
    getBlog() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/get-blog`, {
            method: 'GET',
            headers: {
                blogroutine: this.props.match.params.blogRoutine
            }
        }).then(response => { return response.json() }).then(responseJson => {

            this.setState({ blog: responseJson.blog });
        })
    }
    getBlogArtistName() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/blog-artist-name`, {
            method: 'GET',
            headers: { accountid: this.state.blog.create_by }
        }).then(response => { return response.json() })
            .then(responseJson => {
                this.setState({ blogArtistName: responseJson.name.name });
            })
    }
    getBlogImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/get-blog-image`, {
            method: 'GET',
            headers: { blogid: this.state.blog.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ blogImage: responseJson.image });
        })
    }
    getComments() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/get-comments`, {
            method: 'GET',
            headers: { blogid: this.state.blog.id, commentparent: 0 }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ comments: responseJson.comments });
        })
    }
    changeNewComment(e) {
        this.setState({ newComment: e.target.value });
    }
    sendComment() {
        const comment = {
            content: this.state.newComment,
            blogid: this.state.blog.id,
            re: 0,
            user: localStorage.username
        }
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/add-comment`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ comment: comment })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
        }, error => { console.log(error.message) }).then(jsonResponse => {
            this.setState({ newComment: '' });
            let arr = this.state.comments;
            arr.push(jsonResponse.comment);
            this.setState({ comments: arr });
        })
    }
    render() {
        return (
            <Container>
                <div className='blog-single-area'>
                    <div className='blog-single'>
                        <h2>{this.state.blog.name}</h2>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> {this.state.blogArtistName} </li>
                                <li><i className="fa fa-clock-o"></i> {this.state.blog.create_time} </li>
                                <li><i className="fa fa-calendar"></i> {this.state.blog.create_date} </li>
                            </ul>
                        </div>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.blogImage.path}/${this.state.blogImage.name}`} alt='' />
                        <p>{this.state.blog.full_blog}</p>
                    </div>
                    <div className='blog-comment'>
                        <h2>Nhận xét</h2>
                        {
                            this.state.comments && this.state.comments.map((comment, key) => {
                                return <BlogComments key={key} comment={comment} blogId={this.state.blog.id} />
                            })
                        }

                        {
                            (localStorage.username && localStorage.password) ? (
                                <div className='type-comment'>
                                    <input type="text" placeholder="Viết bình luận..." id='input-comment' value={this.state.newComment} onChange={this.changeNewComment} />
                                    <Button className='btn-submit' variant='' type='submit' onClick={this.sendComment}>Gửi</Button>
                                </div>
                            ) : (
                                    <div></div>
                                )
                        }
                    </div>
                </div>
            </Container>

        );
    }
}
export default withRouter(BlockSingle);