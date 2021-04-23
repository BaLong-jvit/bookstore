import React from 'react';
import './Contact.css';
import { Container } from 'react-bootstrap'
import MailItem from './MailItem/MailItem';
import Pagination from 'react-js-pagination';
import { Route, Switch } from 'react-router-dom'
import Read from './Read/Read';
import Index from './Index/Index';

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMail: [],
            page: 1,
            totalItemsCount: 0
        }
        this.resetMail = this.resetMail.bind(this);
    }
    componentDidMount() {
        document.title = 'Quản lý mail | Bá Long BookStore';
        this.getMail(this.state.page);
        this.getCount();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.getMail(this.state.page);
            this.getCount();
        }
    }
    getCount() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/problem-contact/count/0`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(js => {
            this.setState({ totalItemsCount: js.amount.amount })
        })
    }
    getMail(page) {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/problem-contact/all/0`, {
            method: 'GET'
        }).then(res => { return res.json() }).then(js => {
            this.setState({ listMail: js.mails })
        })
    }
    handlePageChange(e) {
        this.setState({ page: e })
    }
    resetMail(page = 1) {
        this.getMail(page);
        this.getCount();
    }
    render() {
        return (
            <Container className="update-book">
                <h2>Hộp thư</h2>
                <div className='box'>
                    <div className='left-list'>
                        <div className='left-ct'>
                            <p>Danh sách </p>
                            <div className='list-mail'>
                                {this.state.listMail && this.state.listMail.map((mail, key) => {
                                    return <MailItem key={key} mail={mail} page={this.state.page} resetMail={page => this.resetMail(page)} />
                                })}
                            </div>
                            <div className='pagination-mail'>
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
                    <div className='right-content'>
                        <Switch>
                            <Route exact path='/admin/contact' component={Index} />
                            <Route path='/admin/contact/read/:idMail' component={Read} />
                        </Switch>

                    </div>
                </div>
            </Container>
        );
    }
}
export default Contact;