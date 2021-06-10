import React from 'react';
import './AboutItem.css';
import { Row, Col } from 'react-bootstrap';

class AboutItem extends React.Component {
    render() {
        return (
            <div className='about-item'>
                <h3> {this.props.item.name}</h3>
                <Row >
                    <Col md={6} className='content-about'>
                        <p>{this.props.item.content}</p>
                    </Col>
                    <Col md={6} className='image-about'>
                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.props.item.routine}/${this.props.item.image_name}`} alt='' />
                        <div><strong>Hình:	&nbsp;</strong>{this.props.item.note_image}</div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default AboutItem;