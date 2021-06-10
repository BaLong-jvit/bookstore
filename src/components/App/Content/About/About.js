import React from 'react';
import './About.css';
import { Container } from 'react-bootstrap';
import AboutItem from './AboutItem/AboutItem';
import { connect } from 'react-redux';
import * as actions from './../../../../actions/index'

class About extends React.Component {

    componentDidMount() {
        document.title = `Giới thiệu | Bá Long Bookstore `;
        this.props.getAboutUs();
    }
    render() {
        return (
            <Container>
                <div className='title about-us'>
                    <h2> Giới thiệu <strong>Bá Long</strong> Bookstore </h2>
                    {this.props.about && this.props.about.map((item, key) => {
                        return <AboutItem key={key} item={item} />
                    })}
                </div>
            </Container>
        );
    }
}

const handleAboutToProps = (state) => {
    return {
        about: state.aboutUs
    }
}
const handleDispatchToProps = (dispatch, props) => {
    return {
        getAboutUs: () => {
            dispatch(actions.getAboutUs())
        }
    }
}
export default connect(handleAboutToProps, handleDispatchToProps)(About);