import { Component } from 'react';
import './Artists.css';
import { Route, Switch } from 'react-router';
import Add from './Add/Add';
import Edit from './Edit/Edit';
import Index from './Index/Index';

class Artists extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/update/artist'>
                    <Index />
                </Route>
                <Route path='/admin/update/artist/add'>
                    <Add />
                </Route>
                <Route path='/admin/update/artist/edit/:idArtist'>
                    <Edit />
                </Route>
            </Switch>
        );
    }
}
export default Artists;