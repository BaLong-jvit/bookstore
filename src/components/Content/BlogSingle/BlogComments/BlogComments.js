import React from 'react';
import { Button } from 'react-bootstrap';
import './BlogComments.css';

class BlogComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            childComment: [],
            accComment: '',
            accAvt: {},
            newComment: '',
            repComment: false
        }
        this.handleShowInput = this.handleShowInput.bind(this);
        this.changeNewComment = this.changeNewComment.bind(this);
        this.sendComment = this.sendComment.bind(this);
    }
    componentDidMount() {
        this.getChildComment();
        this.getAccComment();
        this.getAccAvt()
    }
    getChildComment() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/get-comments`, {
            method: 'GET',
            headers: { blogid: this.props.blogId, commentparent: this.props.comment.id }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ childComment: responseJson.comments });
        })
    }
    getAccComment() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/blog/blog-name-comment`, {
            method: 'GET',
            headers: { accountid: this.props.comment.create_by }
        }).then(response => { return response.json() })
            .then(responseJson => {
                this.setState({ accComment: responseJson.name.name });
            })
    }
    getAccAvt() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/accounts/get-image`, {
            method: 'GET',
            headers: { accountid: this.props.comment.create_by }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ accAvt: responseJson.image });
        })
    }
    handleShowInput() {
        this.setState({ repComment: true })
    }
    changeNewComment(e) {
        this.setState({ newComment: e.target.value });
    }
    sendComment() {
        const comment = {
            content: this.state.newComment,
            blogid: this.props.comment.blog_id,
            re: this.props.comment.id,
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
            let arr = this.state.childComment;
            arr.push(jsonResponse.comment);
            this.setState({ childComment: arr });
        })
    }
    render() {
        return (
            <div className='comment-item'>
                <div className='avt-cmt'>
                    <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.accAvt.path}/${this.state.accAvt.name}`} alt="" />
                </div>
                <div className='cmt-content'>
                    <h3>{this.state.accComment}</h3>
                    <p>{this.props.comment.content}</p>
                    {
                        this.state.childComment && this.state.childComment.map((comment, key) => {
                            return <BlogComments key={key} comment={comment} blogId={this.props.comment.blog_id} />
                        })
                    }
                    {
                        (localStorage.username && localStorage.password) ? (
                            <div>
                                {
                                    (this.props.comment.re_comment === 0) ? (<div className='type-comment'>
                                        {
                                            (this.state.repComment) ? (
                                                <div>
                                                    <input type="text" placeholder="Viết bình luận..." value={this.state.newComment} id={`input-comment-${this.props.comment.id}`} onChange={this.changeNewComment} />
                                                    <Button className='btn-submit' variant='' type='submit' onClick={this.sendComment}>Gửi</Button>
                                                </div>
                                            ) : (
                                                    <Button variant="" onClick={this.handleShowInput}>Trả lời</Button>
                                                )
                                        }</div>
                                    ) : (
                                            <div></div>
                                        )
                                }
                            </div>
                        ) : (<div></div>)
                    }
                </div>
            </div>
        );
    }
}
export default BlogComments;