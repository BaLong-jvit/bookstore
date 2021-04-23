import { Component } from 'react';
import './Advert.css';
import { Route, Switch } from 'react-router-dom'
import Index from './Index/Index';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import ListItem from './ListItem/ListItem';

class Advert extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/update/advert' component={Index} />
                <Route path='/admin/update/advert/add' component={Add} />
                <Route path='/admin/update/advert/edit/:idAdvert' component={Edit} />
                <Route path='/admin/update/advert/list-item/:idAdvert' component={ListItem} />
            </Switch>
        )
    }
}
export default Advert;