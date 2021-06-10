import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


import './SearchBar.css';

class SearchBar extends React.Component {
    //search?key=fsfsdfs
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            isDisable: true
        }
        this.searchKeyWord = this.searchKeyWord.bind(this);
        this.changeKeyWord = this.changeKeyWord.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.keyWord !== this.state.keyWord) {
            if (this.state.keyWord === '') {
                this.setState({ isDisable: true });
            } else {
                this.setState({ isDisable: false });
            }
        }
    }
    searchKeyWord() {
        let path = `/search?key=`;
        let keyWord = document.getElementById('input-search').value;
        this.props.history.push(path + keyWord);
    }
    changeKeyWord(e) {
        this.setState({ keyWord: e.target.value });
        if (e.keyCode === 13) {
            e.preventDefault();
            this.searchKeyWord();
        }
    }
    render() {
        return (
            <div className="search_box pull-right">
                <input type="text" placeholder="Search" id='input-search' onKeyUp={this.changeKeyWord} />
                <Button
                    variant='light'
                    className='btn-search'
                    disabled={this.state.isDisable}
                    onClick={this.searchKeyWord}
                >
                    <i className='fa fa-search'></i>
                </Button>
            </div>
        )
    }
}
export default withRouter(SearchBar);
