import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = (props) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button
        onClick={() =>
          loginWithRedirect({ audience: `https://test-wise-api.com` })
        }
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
