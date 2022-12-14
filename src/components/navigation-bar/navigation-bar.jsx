import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Container } from 'react-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
    return (
        <Navbar bg='light' expand='lg'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    shyFlix Movie App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'>
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto'>
                            {!user && (
                                <>
                                    <Nav.Link as={Link} to='/'>
                                        Login
                                    </Nav.Link>
                                    <Nav.Link as={Link} to='/signup'>
                                        Signup here
                                    </Nav.Link>
                                </>
                            )}
                            {user && (
                                <>
                                    <Nav.Link as={Link} to='/'>
                                        Home
                                    </Nav.Link>
                                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar.Toggle>
            </Container>
        </Navbar>
    );
};