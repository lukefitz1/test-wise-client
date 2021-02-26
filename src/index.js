import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import history from "./utils/history";
import config from "./auth_config.json";
import reducers from "./redux/reducers";
import thunk from "redux-thunk";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Auth0Provider
    domain={config.domain}
    clientId={config.clientId}
    audience={config.audience}
    redirectUri={`${window.location.origin}/organization`}
    onRedirectCallback={onRedirectCallback}
    scope={config.scope}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.querySelector("#root")
);
