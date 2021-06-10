import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './About/About';
import AdvertPage from './AdvertPage/AdvertPage';
import SearchPage from './SearchPage/SearchPage';
import Account from './Account/Account';
import Contact from './Contact/Contact';
import Cart from './Cart/Cart';
import ListShop from './ListShop/ListShop';
import Blog from './Blog/Blog';
import BlogSingle from './BlogSingle/BlogSingle';
import BookDetail from './BookDetail/BookDetail';
import NotFound from './NotFound/NotFound';

import './Content.css';
import HomePage from './HomePage/HomePage';

class Content extends React.Component {
    render() {
        return (

            <Switch>
                <Route exact path='/' >
                    <HomePage />
                </Route>
                <Route path='/categories'>
                    <HomePage />
                </Route>
                <Route path='/artists'>
                    <HomePage />
                </Route>
                <Route path='/languages'>
                    <HomePage />
                </Route>
                <Route path='/about'>
                    <About />
                </Route>
                <Route path='/adverts/:advertRoutine'>
                    <AdvertPage />
                </Route>
                <Route path='/search'>
                    <SearchPage />
                </Route>
                <Route path='/account'>
                    <Account />
                </Route>
                <Route path='/cart'>
                    <Cart />
                </Route>
                <Route path='/contact'>
                    <Contact />
                </Route>
                <Route path='/list-shop/:local'>
                    <ListShop />
                </Route>
                <Route path='/blog'>
                    <Blog />
                </Route>
                <Route path='/blog-single/:blogRoutine'>
                    <BlogSingle />
                </Route>
                <Route path='/book-detail/:bookRoutine'>
                    <BookDetail />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>

        );
    }
}
export default Content;