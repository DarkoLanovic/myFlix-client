import React from "react";
import PropTypes from "prop-types";
import "./movie-view.scss";
import { Row, Container, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export class MovieView extends React.Component {
  addToFavs() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const { movie } = this.props;

    axios
      .post(
        `https://visionary-film-club.herokuapp.com/users/${Username}/FavoriteMovies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(movie._id);
        alert("✅ Succesfuly added!  ");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container fluid className="moviesContainer">
        <Row className="justify-content-md-center">
          <Col>
            <div className="movie-view">
              <div className="movie-poster" style={{ textAlign: "center", marginBottom: "30px" }}>
                 <center> <img src={window.location.href.split("/")[0] + "/img/" + movie.ImagePath} width="400" height="500" /> </center>
              </div>
              <div className="alignCenter">
                <Button className="button" size="sm" variant="online-light"onClick={() => {this.addToFavs(); }}>Add To Favorite!</Button>
              </div>
              <br />
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value" id="title">
                  {movie.Title}
                </span>
              </div>
              <br />
              <div className="movie-director">
                <span className="label">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span className="value">{movie.Director.Name}</span>
                </Link>
              </div>
              <br />
              <div className="movie-description">
                <span className="label">Description: </span> <br />
                <span className="value">{movie.Description}</span>
              </div>
              <br />
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <span className="value">{movie.Genre.Name}</span>
                </Link>
              </div>
              <br />
              <br />
              <Button className="button-back" size="sm" variant="online-light" onClick={() => {onBackClick(null); }}>Back</Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    //Genre: PropTypes.string,
    Director: PropTypes.array,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};