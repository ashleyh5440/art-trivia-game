import { useState } from 'react';
import './style.css';
import 'animate.css';

import { NavLink, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Nav>
      <Nav.Item>
        <NavLink to="/">Home</NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to="/scores">Scores</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;