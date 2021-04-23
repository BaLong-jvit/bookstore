import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';


import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>

        <div className="App">

          <Header />

          <Content />

          <Footer />
        </div>
      </BrowserRouter >

    );
  }
}

export default App;
