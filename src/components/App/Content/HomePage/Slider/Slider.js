import React from 'react';
import './Slider.css';
import { connect } from 'react-redux';
import * as actions from './../../../../../actions/index';


import Slide from './Slide/Slide';
import { Carousel, Col, Container, Row } from 'react-bootstrap';



class Slider extends React.Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        this.props.getListAdverts();
    }
    render() {
        console.log(this.props.listAdverts)
        return (
            <section id='slider' ref={this.wrapper}>
                <Container fluid='sm'>
                    <Row >
                        <Col sm={12}>
                            <Carousel
                                nextIcon={<span aria-hidden="true" className="carousel-control-next-icon frontIcon" />}
                                prevIcon={<span aria-hidden="true" className="carousel-control-prev-icon frontIcon" />}
                                pause={false} >
                                {this.props.listAdverts && this.props.listAdverts.map((advert, key) => {
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
const handleListAdvertsInProps = (state) => {
    return {
        listAdverts: state.slideAdvert
    }
};
const handleDispatchToProps = (dispatch, props) => {
    return {
        getListAdverts: () => {
            dispatch(actions.getListAdverts())
        }
    }
}
export default connect(handleListAdvertsInProps, handleDispatchToProps)(Slider);