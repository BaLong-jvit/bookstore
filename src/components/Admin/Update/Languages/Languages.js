import { Component } from 'react';
import './Languages.css';
import { Switch, Route } from "react-router-dom";
import Index from './Index/Index';
import Add from './Add/Add';
import Edit from './Edit/Edit';

class Languages extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/update/language'>
                    <Index />
                </Route>
                <Route path='/admin/update/language/add'>
                    <Add />
                </Route>
                <Route path='/admin/update/language/edit/:idLanguage'>
                    <Edit />
                </Route>
            </Switch>
        );
    }
}
export default Languages;