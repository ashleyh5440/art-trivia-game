import { useState } from 'react';
import './style.css';
import 'animate.css';

import { NavLink, useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Auth from '../../utils/auth';

function NavBar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Auth.logout();
    navigate('/');
  }
  return (
    <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <NavLink to="/">Home</NavLink>
      </Nav.Item>
      {(Auth.loggedIn() ? (<> <Nav.Item>
        <NavLink to="/" onClick={handleLogout} >Log out</NavLink>
      </Nav.Item> </>) : (<><Nav.Item>
        <NavLink to="/login">Log in</NavLink>
      </Nav.Item></>))
      }

      <Nav.Item>
        <NavLink to="/scores">Scores</NavLink>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;