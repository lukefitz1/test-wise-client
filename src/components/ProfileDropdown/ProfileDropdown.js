import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { DropdownItem } from "reactstrap";

const ProfileDropdown = ({ showDropdown }) => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  return (
    <div>
      {showDropdown && (
        <div className="dropdown-menu">
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <DropdownItem
                id="qsLogoutBtn"
                onClick={() => logoutWithRedirect()}
              >
                Log out
              </DropdownItem>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
