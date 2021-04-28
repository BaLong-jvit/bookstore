import React from 'react';
import { Route, Switch } from 'react-router';
import './Account.css';
import Index from './Index/Index';

class Account extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/admin/account' component={Index} />
            </Switch>
        );
    }
}
export default Account;