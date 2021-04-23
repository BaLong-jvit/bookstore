import { Component } from 'react';
import { Route, Switch } from 'react-router';
import Add from './Add/Add';
import './Books.css';
import Edit from './Edit/Edit';
import Index from './Index/Index';


class Books extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/update/book'>
                    <Index />
                </Route>
                <Route path='/admin/update/book/add'>
                    <Add />
                </Route>
                <Route path='/admin/update/book/edit/:idBook'>
                    <Edit />
                </Route>
            </Switch>
        );
    }
}
export default Books;