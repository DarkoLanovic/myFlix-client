import React     from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';

import { Container, Row, Col, Button } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
      <Container className="directorContainer">
        <Row>
          <Col>
            <div className="director-view">   
              <div className="director-name">
                <span className="name">Name:</span> <br />
                <span className="value">{director.Name}</span>
              </div>
              <br />
              <div>
                <span className="description">Bio:</span> <br />
                <span className="value">{director.Bio}</span>
              </div>
              <br />
              <div>
                <span className="description">Birth:</span> <br />
                <span className="value">{director.Birth}</span>
              </div>
              <br />
              <div>
                <span className="description">Death:</span> <br />
                <span className="value">{director.Death}</span>
              </div>
              <br />
              <div className="director-button">
                <Button size="sm" variant="online-light" onClick={() => { onBackClick(null); }}>Back</Button>
              </div>
              
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}


DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.number,
    Death: PropTypes.number,
  }).isRequired,
};




