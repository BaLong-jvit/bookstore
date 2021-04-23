import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Shop.css';
import $ from 'jquery';

class Shop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainShopImage: {},
            spShopImages: [1, 2, 3, 4],
            isOpen: true
        }
    }
    componentDidMount() {
        this.getMainImage();
        this.getSupportImages();
        this.getIsOpen();

    }
    getMainImage() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/shops/get-main-image`, {
            method: 'GET',
            headers: {
                idshop: this.props.shop.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ mainShopImage: responseJson.image });
        })
    }
    getSupportImages() {
        return fetch(`${process.env.REACT_APP_DOMAIN}/api/v1/shops/get-support-images`, {
            method: 'GET',
            headers: {
                idshop: this.props.shop.id
            }
        }).then(response => { return response.json() }).then(responseJson => {
            this.setState({ spShopImages: responseJson.images });
        })
    }
    getIsOpen() {
        var day = new Date();
        if ((day.getHours() > 8) && (day.getHours() < 21)) {
            this.setState({ isOpen: true });
        } else {
            this.setState({ isOpen: false });
        }
    }
    handleStartHover(e) {
        let left = (e.clientX - 200 < 0) ? e.clientX : (e.clientX - 200);
        let top = (e.clientY - 200 < 0) ? e.clientY : (e.clientY - 200);
        $(`#zoom-${e.target.id}`).css({
            'display': 'block',
            'top': `${top}px`,
            'left': `${left}px`,
            'z-index': '999'
        }
        )
    }
    handleHover(e) {
        let left = (e.clientX - 200 < 0) ? e.clientX : (e.clientX - 200);
        let top = (e.clientY - 200 < 0) ? e.clientY : (e.clientY - 200);
        $(`#zoom-${e.target.id}`).css({
            'top': `${top}px`,
            'left': `${left}px`,
        }
        )
    }
    handleFinishHove(e) {
        $(`#zoom-${e.target.id}`).css({
            display: 'none'
        }
        )
    }
    render() {
        return (
            <Row className='shop-item'>

                <Col md={3} className='shop-image'>
                    <img src={`${process.env.REACT_APP_DOMAIN}/image/${this.state.mainShopImage.path}/${this.state.mainShopImage.name}`} alt="" />
                </Col>
                <Col md={9} className='shop-content'>
                    <h3>Cửa hàng &nbsp;{this.props.shop.name}</h3>
                    <p><i className='fa fa-map-marker' ></i>&nbsp; {this.props.shop.city}</p>
                    <p><i className='fa fa-home' ></i>&nbsp; {`${this.props.shop.address} đường ${this.props.shop.street}, phường ${this.props.shop.ward}, quận ${this.props.shop.district}`}</p>
                    <p className='is-open'><i className="fa fa-clock-o" aria-hidden="true"></i>&nbsp; 8:00-21:00 <strong>	&#9679; {this.state.isOpen ? `Mở cửa` : ` Đóng cửa `}</strong></p>
                    <div className='detail-image'>
                        {this.state.spShopImages && this.state.spShopImages.map((spImage, key) => {
                            return (
                                <div className='image-item' key={key}>
                                    <img src={`${process.env.REACT_APP_DOMAIN}/image/${spImage.path}/${spImage.name}`} id={`image-${spImage.id}`} alt=""
                                        className='normal-img'
                                        onMouseOver={this.handleStartHover}
                                        onMouseMove={this.handleHover}
                                        onMouseOut={this.handleFinishHove}
                                    />
                                    <div className='zoom-img' id={`zoom-image-${spImage.id}`}>
                                        <img src={`${process.env.REACT_APP_DOMAIN}/image/${spImage.path}/${spImage.name}`} alt="" />
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                </Col>
            </Row>
        );
    }
}
export default Shop;