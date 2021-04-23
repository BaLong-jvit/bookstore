import React from 'react';
import './Setting.css';
import { Switch, Route } from 'react-router-dom';
import Contact from './Contact/Contact';
import AboutUs from './AboutUs/AboutUs';

class Setting extends React.Component {
    render() {
        return (
            <Switch>
                <Route path='/admin/setting/contact'>
                    <Contact />
                </Route>
                <Route path='/admin/setting/about'>
                    <AboutUs />
                </Route>
            </Switch>
        );
    }
}
export default Setting;