import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom"; 

import './movie-card.scss';

import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    console.log(movie.ImagePath)
    return (
  
      <Container className="movieContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card className="movieCard text-center " >
                <Card.Img className="cardImage" variant="top" src={'img/' + movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Link to={`/movies/${movie._id}`}>
                    <Button size="sm" variant="online-light">Details</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
  
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  //onMovieClick: PropTypes.func.isRequired
};