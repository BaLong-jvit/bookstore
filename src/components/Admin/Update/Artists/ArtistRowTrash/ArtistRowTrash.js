import { Component } from 'react';
import './ArtistRowTrash.css';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class ArtistRowTrash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trashNotify: '',
            warning: '',

        }
        this.convertItem = this.convertItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.acceptConvert = this.acceptConvert.bind(this);
        this.showDeleteNotify = this.showDeleteNotify.bind(this);
    }
    convertItem() {
        this.setState({ warning: 'Khôi phục lại sản phẩm: ' });
        $(`#convert-${this.props.artist.id}-notify`).css({
            display: 'block'
        })
    }
    deleteItem() {
        this.setState({ warning: 'Xóa vĩnh viễn sản phẩm: ' });
        $(`#verify-${this.props.artist.id}-notify`).css({
            display: 'block'
        })
    }
    acceptConvert(accept) {
        if (accept) {
            $(`#convert-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                artistid: this.props.artist.id,
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/convert-artist`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dataupdate: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteArtist();
                    this.showDeleteNotify(true, 'Khôi phục tác giả thành công!');
                } else {
                    this.showDeleteNotify(false, 'Khôi phục tác giả không thành công!');
                }
            })
        } else {
            $(`#convert-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
        }
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#verify-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/del-artist`, {
                method: 'DELETE',
                headers: {
                    artistid: this.props.artist.id,
                    username: localStorage.adminuser,
                    password: localStorage.adminpass
                }

            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteArtist();
                    this.showDeleteNotify(true, 'Xóa tác giả thành công!');
                } else {
                    this.showDeleteNotify(false, `Xóa các sách của tác giả ${this.props.artist.name} trước!`);
                }
            })
        } else {
            $(`#verify-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
        }
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ trashNotify: `${mess}` });
        $(`#trash-${this.props.artist.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#trash-${this.props.artist.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`trash-${this.props.artist.id}-notify`} style={{
                        'position': 'fixed',
                        'display': 'none',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'zIndex': '9999'
                    }}>
                        <p style={{
                            'color': '#fff',
                            'fontSize': '20px',
                            'padding': '30px 50px',
                            'margin': '0'
                        }}>{this.state.trashNotify}</p>
                    </div>
                    <div id={`verify-${this.props.artist.id}-notify`} style={{
                        'position': 'fixed',
                        'display': 'none',
                        'backgroundColor': '#54f7e8',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'zIndex': '9999'
                    }}>
                        <p style={{
                            'color': '#000',
                            'fontSize': '20px',
                            'padding': '30px 50px',
                            'margin': '0'
                        }}>{`${this.state.warning} ${this.props.artist.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    <div id={`convert-${this.props.artist.id}-notify`} style={{
                        'position': 'fixed',
                        'display': 'none',
                        'backgroundColor': '#54f7e8',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'zIndex': '9999'
                    }}>
                        <p style={{
                            'color': '#000',
                            'fontSize': '20px',
                            'padding': '30px 50px',
                            'margin': '0'
                        }}>{`${this.state.warning} ${this.props.artist.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptConvert(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptConvert(true)}>Khôi phục</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>

                <td><span>{this.props.artist.name}</span></td>

                <td>
                    <div>
                        <Button variant='' className='btn-convert' onClick={this.convertItem}><i className="fa fa-repeat" aria-hidden="true"></i>&nbsp; Lấy lại</Button>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}
export default ArtistRowTrash;