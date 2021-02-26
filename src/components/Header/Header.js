import React, { useState } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";
import logo from "./test_wise_logo.png";
// import Navigation from "../Navigation/Navigation";
import ProfileDropdown from "../ProfileDropdown/ProfileDropdown";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const toggleProfileDropdown = () => {
    setIsOpen(!isOpen);
  };

  // const logoutWithRedirect = () => {
  //   logout({
  //     returnTo: window.location.origin,
  //   });
  // };

  return (
    <div>
      <div className="header">
        <div className="header-left">
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                tag={RouterNavLink}
                to="/"
                exact
                activeClassName="router-link-exact-active"
              >
                Home
              </NavLink>
            </NavItem>
            {isAuthenticated && (
              <NavItem>
                <NavLink
                  tag={RouterNavLink}
                  to="/external-api"
                  exact
                  activeClassName="router-link-exact-active"
                >
                  External API
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <div className="header-center">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <div className="header-right">
          <Nav className="d-none d-md-block" navbar>
            {!isAuthenticated && (
              <NavItem>
                <Button
                  id="qsLoginBtn"
                  color="primary"
                  className="btn-margin"
                  onClick={() => loginWithRedirect()}
                >
                  Log in
                </Button>
              </NavItem>
            )}
            {isAuthenticated && (
              <div>
                <div className="user-display" onClick={toggleProfileDropdown}>
                  <div className="img">
                    <img
                      src={user.picture}
                      alt="Profile"
                      className="nav-user-profile rounded-circle"
                      width="50"
                    />
                  </div>
                  <div className="user-name">{user.name}</div>
                </div>
                <ProfileDropdown showDropdown={isOpen} />
              </div>
            )}
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
