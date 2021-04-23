import React from 'react';
import { Container } from 'react-bootstrap';
class NotFound extends React.Component {
    render() {
        document.title = 'Không tìm thấy trang | Bá Long BookStore'
        return (
            <Container>
                not found 404
            </Container>
        );
    }
}
export default NotFound;