import { Component } from 'react';
import './ArtistRow.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import $ from 'jquery';

class ArtistRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delNotify: '',
        }
        this.deleteItem = this.deleteItem.bind(this);
    }
    acceptDelete(accept) {
        if (accept) {
            $(`#accept-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
            const bodySend = {
                artistid: this.props.artist.id,
                username: localStorage.adminuser,
                password: localStorage.adminpass
            }
            return fetch(`${process.env.REACT_APP_DOMAIN}/api/v2/artists/delete-artist`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ dataupdate: bodySend })
            }).then(response => { return response.json() }).then(jsonResponse => {
                if (jsonResponse.message === 'success') {
                    this.props.deleteArtist();
                    this.showDeleteNotify(true, 'Xóa tác giả thành công!');
                } else if (jsonResponse.message === 'error') {
                    this.showDeleteNotify(false, `Xóa các sách của tác giả ${this.props.artist.name} trước!!`);

                } else {
                    this.showDeleteNotify(false, 'Xóa tác giả không thành công!');
                }
            })
        } else {
            $(`#accept-${this.props.artist.id}-notify`).css({
                display: 'none'
            });
        }
    }
    deleteItem() {
        $(`#accept-${this.props.artist.id}-notify`).css({
            display: 'block'
        });
    }
    showDeleteNotify(success, mess) {
        let color = (success) ? '#fdb45e' : '#cecbcb';
        this.setState({ delNotify: `${mess}` });
        $(`#del-${this.props.artist.id}-notify`).css({
            display: 'block',
            backgroundColor: color
        });
        setTimeout(() => {
            $(`#del-${this.props.artist.id}-notify`).css('display', 'none');
        }, 800);
    }
    render() {
        return (
            <tr>
                <td>
                    <div id={`del-${this.props.artist.id}-notify`} style={{
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
                        }}>{this.state.delNotify}</p>
                    </div>
                    <div id={`accept-${this.props.artist.id}-notify`} style={{
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
                        }}>{`Xác nhận xóa sản phẩm: ${this.props.artist.name} ?`}</p>
                        <div className='btn-option'>
                            <Button variant='secondary' className='btn-cancel' onClick={() => this.acceptDelete(false)}>Hủy</Button>
                            <Button variant='' className='btn-accept' onClick={() => this.acceptDelete(true)}>Xóa</Button>
                        </div>
                    </div>
                    {9 * (this.props.page - 1) + this.props.stt + 1}
                </td>
                <td>
                    {this.props.artist.name}
                </td>
                <td>
                    <div className='thaotac'>
                        <Link to={`/admin/update/artist/edit/${this.props.artist.id}`} className='btn-edit'><i className="fa fa-pencil" aria-hidden="true"></i>&nbsp; Sửa</Link>
                        <Button variant='' className='btn-delete' onClick={this.deleteItem}><i className="fa fa-times" aria-hidden="true"></i>&nbsp; Xóa</Button>
                    </div>
                </td>
            </tr>
        )
    }
}
export default ArtistRow;