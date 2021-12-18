import React from "react";
import { Navbar, Container, Button, NavItem } from "react-bootstrap";
import { Route } from "react-router-dom";

import "./navbar-view.scss";

export function NavBarView() {
  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  return (
    <Route
      render={({ history }) => (
        <Navbar>
          <Container>
            <Navbar.Brand className="navbar" onClick={() => history.push("/")} >𝕍ⅈ𝕤ⅈ𝕠𝕟𝕒𝕣𝕪𝔽𝕚𝕝𝕞</Navbar.Brand>
            <Navbar.Toggle />
            
            <Navbar.Collapse className="justify-content-end">
              <Button className="button-nav" variant="online-light" size="sm" onClick={() => { history.push("/profile"); }} > View Profile </Button>
              <Button size="sm" variant="online-light" onClick={onLoggedOut}>Log out</Button>
            </Navbar.Collapse>
            
          </Container>
        </Navbar>
      )}
    />
  );
}