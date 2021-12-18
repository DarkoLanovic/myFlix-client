import React, { useState } from 'react';
import PropTypes           from "prop-types";
import axios               from 'axios';

import {Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';


import './registration-view.scss';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState(''); 
  const [ Birthday, setBirthday] = useState('');

  
  const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, Birthday);
        axios.post('https://visionary-film-club.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email:    email,
          Birthday: Birthday
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("✅ Successfully registered!")
          props.onRegistration(data);
  
        })
        .catch((e) => {
          console.log('🚫 Registration incorrect!')
          alert("🚫 Registration incorrect!")
        }); 
      };

  return (
    <Container fluid className="registerContainer" >
      <Row>
        <Col>
          <CardGroup>
            <Card className="registerCard">
              <Card.Body>
                <br />
                <Card.Subtitle className="text-center">W E L C O M E</Card.Subtitle>
                <br />
                
                <Card.Subtitle className="text-center">Register please</Card.Subtitle>
                <br />
                <Form className="register-card" onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formRegisterUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="* register Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formRegisterPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="* register Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="* register Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control className="mb-3" type="date" value={Birthday} onChange={(e) => setBirthday(e.target.value)} />
                  </Form.Group>
                  
                  <Button size="sm" variant="online-light" type="submit" onClick={handleSubmit}>Register</Button> 
                  <Button className="loginButton" size="sm" variant="online-light" type="button" onClick={()=>window.location.replace("/")}>Login</Button>
          
                </Form>
              </Card.Body>
            </Card>
        </CardGroup>
        </Col>
      </Row>
    </Container>

  );
}

RegistrationView.propTypes = {
  registeration: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
  onRegistration: PropTypes.func,
};






