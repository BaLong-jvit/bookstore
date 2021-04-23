import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import Index from './Index/Index';
import './Publishers.css';
class Publishers extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/update/publisher'>
                    <Index />
                </Route>
                <Route path='/admin/update/publisher/add' component={Add} />
                <Route path='/admin/update/publisher/edit/:idPublisher' component={Edit} />
            </Switch>
        );
    }
}
export default Publishers;