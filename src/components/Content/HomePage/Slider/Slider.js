import React from 'react';
import './Slider.css';
// import { Link } from 'react-router-dom';

import Slide from './Slide/Slide';
import { Carousel, Col, Container, Row } from 'react-bootstrap';



class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAdverts: []
        }

        this.createSlider = this.createSlider.bind(this);
    }

    componentDidMount() {
        this.createSlider();
    }
    createSlider() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/home/adverts/list-adverts`)
            .then(response => { return response.json() })
            .then(responseJson => {
                this.setState({ listAdverts: responseJson.adverts })
            });
    }

    render() {
        return (
            <section id='slider'>
                <Container fluid='sm'>
                    <Row >
                        <Col sm={12}>
                            <Carousel
                                nextIcon={<span aria-hidden="true" className="carousel-control-next-icon frontIcon" />}
                                prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon frontIcon" />}
                                pause={false} >
                                {this.state.listAdverts && this.state.listAdverts.map((advert, key) => {
                                    return (
                                        <Carousel.Item interval={3000} key={key} >
                                            <Slide key={key} advert={advert} />
                                        </Carousel.Item>
                                    )
                                })}
                            </Carousel>
                        </Col>
                    </Row>
                </Container>
            </section>
        );
    }
}
export default Slider;