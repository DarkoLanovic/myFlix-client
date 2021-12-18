import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";


import "./profile-view.scss";

export class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem("token");
        this.getUser(accessToken);
    }

    onLoggedOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.setState({
            user: null,
        });
        window.open("/", "_self");
    }

    getUser = (token) => {
        const Username = localStorage.getItem("user");
        axios
            .get(`https://visionary-film-club.herokuapp.com/users/${Username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    };
  
    // Allow user to edit or update profile
    editUser = (e, Username, Password, Email, Birthday) => {
        e.preventDefault();
        console.log(Username, Password, Email, Birthday)
        Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios
            .put(
                `https://visionary-film-club.herokuapp.com/users/${Username}`,
                {
                    Username: this.state.Username,
                    Password: this.state.Password,
                    Email: this.state.Email,
                    Birthday: this.state.Birthday,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });

                localStorage.setItem("user", this.state.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert("✅ Successfully updated!");
        
            })
            .catch(function (error) {
                console.log(error);
                alert("🚫 Try again please")
            });
    };

    // Deregister
    onDeleteUser() {
        const Username = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        axios.delete(`https://visionary-film-club.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                console.log(response);
                alert("✅ Succesfuly deleted!");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                window.open(`/`, "_self");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onRemoveFavorite(e, movie) {
    e.preventDefault();
    
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token")

    axios.delete(`https://visionary-film-club.herokuapp.com/users/${Username}/FavoriteMovies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        alert("✅ Succesfuly removed!");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


    setUsername(value) {
        this.setState({
            Username: value,
        });
        this.Username = value;
    }

    setPassword(value) {
        this.setState({
            Password: value,
        });
        this.Password = value;
    }

    setEmail(value) {
        this.setState({
            Email: value,
        });
        this.Email = value;
    }

    setBirthday(value) {
        this.setState({
            Birthday: value,
        });
        this.Birthday = value;
    }

    render() {
        const { movies, onBackClick } = this.props;
        const { FavoriteMovies, Username, Email, Birthday } = this.state;

        return (
            <Container className="profile-view" align="center">
            
                <Card.Title className="card-title">U s e r</Card.Title>
                <Card.Text style={{  }}>
                    <br />
                    <div className="profile-container">
                        <span className="label">Username:  </span>
                        <span className="value">{Username}</span>
                        <br />
                        <span className="label">Email: </span>
                        <span className="value">{Email}</span>
                        <br />
                        <span className="label">Birthday:  </span>
                        <span className="value">{Birthday}</span>
                    </div>
                    <br />
                    <div>
                        <Button size="sm" variant="online-light" onClick={() => { onBackClick(null); }}>Back</Button>
                    </div>

                </Card.Text>
                <br />
                <br />

                <Card>
                    <Row style={{ marginTop: "30px" }}>
                        <Col>
                            {/* <h1>{Username}</h1> */}
                            <h2>Favorites Movies</h2>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Card.Body>
                                {FavoriteMovies.length === 0 && (
                                    <div className="text-center">No Favorite Movie</div>
                                )}
                                <Row className="favorite-container">
                                    {FavoriteMovies.length > 0 &&
                                        movies.map((movie) => {
                                            if (
                                                movie._id ===
                                                FavoriteMovies.find((fav) => fav === movie._id)
                                            ) {
                                                return (
                                                    <Card className="favorite-movie card-content" key={movie._id} >
                                                        <Card.Img
                                                            className="fav-poster"
                                                            variant="top"
                                                            src={'img/' + movie.ImagePath}
                                                        />
                                                        <Card.Body style={{ backgroundColor: "black" }}>
                                                            <Card.Title className="movie_title">
                                                                {movie.Title}
                                                            </Card.Title>
                                                            <Button size="sm" variant="danger" value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)} > Remove </Button>
                                                        </Card.Body>
                                                    </Card>
                                                );
                                            }
                                        })}
                                </Row>
                            </Card.Body>
                        </Col>

                        <Col>
                        <Card className="update-profile"  style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>Update Your Account</Card.Title>
                                <br />
                                <Form
                                    className="update-form"
                                    onSubmit={(e) =>
                                        this.editUser( 
                                            e,
                                            this.Username,
                                            this.Password,
                                            this.Email,
                                            this.Birthday
                                        )
                                    }
                                >
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Username"
                                            placeholder="* new username"
                                            onChange={(e) => this.setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="Password"
                                            placeholder="* new password"
                                            onChange={(e) => this.setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="Email"
                                            placeholder="* new email"
                                            onChange={(e) => this.setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <br />
                                    <Form.Group>
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="Birthday"
                                            onChange={(e) => this.setBirthday(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br />
                                    <div>
                                        <Button variant="outline-success" type="submit" onClick={this.editUser}>Update</Button>
                                    </div>
                                    <br />
                                    <div className="delete-btn">
                                        <Button className="delete-button" variant="danger" size="sm" onClick={() => this.onDeleteUser()} >!Delete</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                </Card>
                <br />
                <br />
                <br />

              {/* <div className="profile-button-div">
                <Button className="profile-button" variant="secondary" className="mt-3" onClick={() => { onBackClick(null); }}>Back</Button>
              </div> */}

              <div>
                    <Button size="sm" variant="online-light" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>

                <br />
           
             <br />
            </Container>
        );
    }
}

ProfileView.propTypes = {
    profile: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string,
    }),
};