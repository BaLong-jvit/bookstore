import React from 'react';
import './About.css';
import { Container } from 'react-bootstrap';
import AboutItem from './AboutItem/AboutItem';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aboutItems: [1, 2, 3, 4]
        }
    }
    componentDidMount() {
        document.title = `Giới thiệu | Bá Long Bookstore `;
        this.getAboutUs();
    }
    getAboutUs() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/about-us/items`).then(response => { return response.json() }).then(responseJson => {
            this.setState({ aboutItems: responseJson.items });
        })
    }
    render() {
        return (
            <Container>
                <div className='title about-us'>
                    <h2> Giới thiệu <strong>Bá Long</strong> Bookstore </h2>
                    {this.state.aboutItems && this.state.aboutItems.map((item, key) => {
                        return <AboutItem key={key} item={item} />
                    })}
                </div>
            </Container>
        );
    }
}
export default About;