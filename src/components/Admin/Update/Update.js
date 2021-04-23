import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Advert from './Advert/Advert';
import TrashAdvert from './Advert/TrashAvdert';
import Artists from './Artists/Artists';
import TrashArtists from './Artists/TrashArtists';
import Books from './Books/Books';
import TrashBooks from './Books/TrashBooks';
import Languages from './Languages/Languages';
import TrashLanguages from './Languages/TrashLanguages';
import Publishers from './Publishers/Publishers';
import TrashPublishers from './Publishers/TrashPublishers';
import './Update.css';

class Update extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/admin/update/book'>
                    <Books />
                </Route>
                <Route path='/admin/update/artist'>
                    <Artists />
                </Route>
                <Route path='/admin/update/publisher'>
                    <Publishers />
                </Route>
                <Route path='/admin/update/language'>
                    <Languages />
                </Route>
                <Route path='/admin/update/trash-book'>
                    <TrashBooks />
                </Route>
                <Route path='/admin/update/trash-artist'>
                    <TrashArtists />
                </Route>
                <Route path='/admin/update/trash-publisher'>
                    <TrashPublishers />
                </Route>
                <Route path='/admin/update/trash-language'>
                    <TrashLanguages />
                </Route>
                <Route path='/admin/update/advert'>
                    <Advert />
                </Route>
                <Route path='/admin/update/trash-advert'>
                    <TrashAdvert />
                </Route>
            </Switch>
        );
    }
}
export default Update;