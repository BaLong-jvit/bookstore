import React, { Component } from 'react';
import './Index.css';
import { Container, Table } from "react-bootstrap";
import { Link } from 'react-router-dom'
import AboutUsRow from '../AboutUsRow/AboutUsRow';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            about: [],
            page: 1
        }
        this.deleteAbout = this.deleteAbout.bind(this);
    }
    componentDidMount() {
        document.title = 'Giới thiệu | Bá Long BookStore';
        this.getAbout();
    }
    getAbout() {
        fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/about-us/all/0`, {
            method: 'GET',
        }).then(res => { return res.json() }).then(resJs => {
            this.setState({ about: resJs.about })
        })
    }
    deleteAbout() {
        this.getAbout();
    }
    render() {
        return (
            <Container className='update-book'>
                <h2>Giới thiệu về chúng tôi</h2>
                <div className='control-book'>
                    <Link to='/admin/setting/about/add' className='btn-add'><i className="fa fa-plus" aria-hidden="true"></i>&nbsp; Thêm</Link>
                </div>
                <Table>
                    <thead className='tb-name'>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Tiêu đề</th>
                            <th>Nội dung</th>
                            <th>Mô tả hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.about && this.state.about.map((a, key) => {
                            return <AboutUsRow key={key} stt={key} about={a} page={this.state.page} deleteAbout={this.deleteAbout} />
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default Index;