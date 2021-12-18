import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavBarView } from "../navbar-view/navbar-view";


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { createStore } from 'redux';
import movies from '../../reducers/reducers';
import { setMovies } from '../../actions/actions';
//import MoviesList from '../movies-list/movies-list';

const store = createStore(movies);
console.log('Initial State', store.getState());

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            Description: null,
            Movies: null,
        };
    }


  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }
  
  // new
  getUsers(token) {
            axios.get(`https://visionary-film-club.herokuapp.com/users/`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    this.setState({
                        users: response.data,
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

  getMovies(token) {
    axios.get('https://visionary-film-club.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
        store.dispatch(setMovies(response.data));
        console.log(store.getState())
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  
  setSelectedMovie(newSelectedMovie) {
            this.setState({
                selectedMovie: newSelectedMovie,
            });
  }

  onRegistration(user) {
    this.setState({ user });
    window.open("/", "_self");
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

     
    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }



  render() {
    
    const { movies, user, users} = this.state;
    
    return (
      <Router>
          <NavBarView />
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegistration={(user) => this.onRegistration(user)} />

            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

          <Route
              exact
              path="/profile"
              render={({ history }) => {
                  if (!user) return (
                          <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      );
                  if (movies.length === 0) return <div className="main-view" />;
                  return (
                      <ProfileView history={history} movies={movies} users={users} user={user} onBackClick={() => history.goBack()} />
                      
                  );
              }}
          />
        </Row>
      </Router>
    );
  }
}
