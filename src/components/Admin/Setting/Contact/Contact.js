import { Component } from 'react';
import { Switch, Route } from 'react-router';
import './Contact.css';
import Edit from './Edit/Edit';
import Index from './Index/Index';

class Contact extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/setting/contact' component={Index} />
                <Route path='/admin/setting/contact/edit/:contactId' component={Edit} />

            </Switch>
        );
    }
}
export default Contact;