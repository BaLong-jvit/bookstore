import { Component } from 'react';
import './AboutUs.css';
import { Route, Switch } from 'react-router-dom';
import Index from './Index/Index';
import Add from './Add/Add';
import Edit from './Edit/Edit';

class AboutUs extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/setting/about' component={Index} />
                <Route path='/admin/setting/about/add' component={Add} />
                <Route path='/admin/setting/about/edit/:idAbout' component={Edit} />
            </Switch>
        )
    }
}
export default AboutUs;