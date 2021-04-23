import React from 'react';
import './HomePage.css';
import MainPage from './MainPage/MainPage';

import Slider from './Slider/Slider';

class HomePage extends React.Component {

    render() {
        document.title = `Bá Long Bookstore `
        return (
            <div>
                <Slider />
                <MainPage />
            </div>
        );
    }
}
export default HomePage;