import React, { useState } from 'react';
import PropTypes from "prop-types";
import axios from 'axios';

import { Navbar, Form, Button, Card, Container} from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication 
    axios.post('https://visionary-film-club.herokuapp.com/login', {
      Username: username,
      Password: password
  })
  .then((response) => {
    const data = response.data;
    props.onLoggedIn(data); //This method triggers the "onLoggedIn' method of your “main-view.jsx” file
  })
  .catch((e) => {
    console.log('🚫 Try again please!')
    alert('🚫 Unknown User!')
  });
};

  return (
    <Container fluid className="loginContainer" >
      <Card className="loginCard">
        <Card.Body>
          <Card.Title className="text-center">Login please</Card.Title>
          <br />
          <Form >
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="* enter Username" value={username}  onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>
            <br />
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control className="mb-3" type="password" placeholder="* enter Password " value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button size="sm" variant="online-light" type="submit" onClick={handleSubmit}>Login</Button>
            <Button className="loginButton" size="sm" variant="online-light" type="button" onClick={()=>window.location.replace("/register")}>Register</Button>
            
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
    
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};






