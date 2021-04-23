import { Component, createRef } from 'react';
import './MenuUpdate.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';

class MenuUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowMenu: false
        }
        this.wrapRef = createRef();
        this.showHideMenu = this.showHideMenu.bind(this);
        this.handleClickOutSideComponent = this.handleClickOutSideComponent.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutSideComponent);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutSideComponent);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isShowMenu !== this.state.isShowMenu) {
            if (this.state.isShowMenu) {
                $('.sub-ud').slideDown(200);
            } else {
                $('.sub-ud').slideUp(200);
            }
        }
    }
    handleClickOutSideComponent(e) {
        if (this.wrapRef && !this.wrapRef.current.contains(e.target)) {
            this.setState({ isShowMenu: false });
        }
    }
    showHideMenu() {
        this.setState({ isShowMenu: !this.state.isShowMenu });
    }
    render() {
        return (
            <div ref={this.wrapRef}>
                <div onClick={this.showHideMenu} className='sub-pr-ud'>
                    <i className="fa fa-pencil" aria-hidden="true"></i>&nbsp;
                    Cập nhật
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {
                        (this.state.isShowMenu) ? (<i className="fa fa-chevron-down" aria-hidden="true"></i>) : (
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        )
                    }</div>
                <ul className='sub-ud'>
                    <li>
                        <Link to='/admin/update/book'>Sách</Link>
                    </li>
                    <li>
                        <Link to='/admin/update/artist'>Tác giả</Link>
                    </li>
                    <li>
                        <Link to='/admin/update/publisher'>Nhà sản xuất</Link>
                    </li>
                    <li>
                        <Link to='/admin/update/language'>Ngôn ngữ</Link>
                    </li>
                    <li>
                        <Link to='/admin/update/advert'>Quảng cáo</Link>
                    </li>
                </ul>
            </div>
        )
    }
}
export default MenuUpdate;