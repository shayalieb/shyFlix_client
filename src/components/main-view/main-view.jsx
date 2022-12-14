import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie.view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { Col, Row } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
    const [movies, setMovies] = useState([]);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        fetch('https://shyflixapp.herokuapp.com/')
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.docs.map((doc) => {
                    return {
                        _id: doc.key,
                        Title: doc.Title,
                        imagepath: 'https://shyflixapp.herokuapp.com',
                        Director: doc.Director.Name?.[0]
                    };
                });

                setMovies(moviesFromApi);
            });
    }, []);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUsers(null);
                }} />
            <Row className='justify-content-md-center'>
                <Routes>
                    <Route
                        path='/signup'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        } />

                    <Route
                        path='/login'
                        element={
                            <>
                                {user ? (
                                    <Navigate to='/' />

                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUsers(user)} />
                                    </Col>
                                )}
                            </>
                        } />

                    <Route
                        path='/movies/:movieId'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The movie list is empty</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        } />

                    <Route
                        path='/'
                        element={
                            <>
                                {!user ? (
                                    <Navigate to='/login' replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movies) => (
                                            <Col className='mb-4' key={movie._id} md={3}>
                                                <MovieCard movie={movie} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        } />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
