import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import Login from "./components/Login";
import Steps from "./components/Steps";
import Scenarios from "./components/Scenarios";
import Features from "./components/Features";
import Projects from "./components/Projects";
import Organization from "./components/Organization";
// import Steps from "./views/Steps";
import history from "./utils/history";
import Loading from "./components/Loading";
import Header from "./components/Header/Header";
import Home from "./views/Home/Home";
import Project from "./components/Project";
import Feature from "./components/Feature";
import "./App.css";

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/scenarios" exact component={Scenarios} />
        <Route path="/steps" exact component={Steps} />
        <Route path="/features" exact component={Features} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/project/:id" component={Project} />
        <Route path="/feature/:id" component={Feature} />
        <Route path="/organization" exact component={Organization} />
      </Switch>
    </Router>
  );
}

export default App;
