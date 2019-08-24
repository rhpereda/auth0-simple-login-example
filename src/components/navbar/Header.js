import React from "react";
import { useAuth0 } from "../../react-auth0-wrapper";
import Link from "react-router-dom/Link";
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Header.css";

const Header = () => {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const getLoginButton = () => {
    return <a className="login" onClick={() => loginWithRedirect({})} >Iniciar sesión</a>;
  }

  const getProfileMenu = () => {
    return <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">Hello {user.name}</Dropdown.Toggle>
      <Dropdown.Menu>
        <Link className="dropdown-item" to="/profile">Profile</Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>;
  }

  const getTitle = () => {
    return "Hello " + user.name;
  }

  const getMenu = () => {
    return <Navbar bg="none" expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="/">Home</Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title={getTitle()} id="basic-nav-dropdown">
            <Link className="dropdown-item" to="/profile">Profile</Link>
            <NavDropdown.Divider />
            <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  }

  return (
    <div className="header">
      <div className="leftSection col-xs-1">
         <span className={"home link"}>
          <Link to="/">
            <img className="homeIcon" src={process.env.PUBLIC_URL + "/home.png"} alt="Home" title="Home"></img>
          </Link>
        </span>
      </div>
      <div className="rightSection col-xs-11">
        {!isAuthenticated ? getLoginButton() : getMenu()}
      </div>
    </div>
  );
};

export default Header;