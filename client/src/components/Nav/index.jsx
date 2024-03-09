import { useState } from 'react';
import './style.css';
import 'animate.css';

import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
    <Nav
    activeKey="/home"
    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
  >
    <Nav.Item>
      <NavLink to="/">Home</NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink to="/login">Log in</NavLink>
    </Nav.Item>
    <Nav.Item>
      <NavLink to="/scores">Scores</NavLink>
    </Nav.Item>
  </Nav>
  );
}

export default NavBar;