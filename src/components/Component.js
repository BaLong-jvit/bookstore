import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Admin from './Admin/Admin';
import App from './App/App';
import Login from './Login/Login';


class Component extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/admin'>
                        <Admin />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route>
                        <App />
                    </Route>

                </Switch>
            </Router>
        )
    }
}
export default Component;