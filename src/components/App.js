import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Header from "./shared/Header";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./auth/Login.Form";
import Signup from "./auth/Signup.Form";
import UsersContainer from "./users/Container";

import * as auth from "../api/auth";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserId: null
    };

    this.loginUser = this.loginUser.bind(this);
    this.signupUser = this.signupUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  // If there's a token the user will remain logged in if
  // refresh the page. This is also where we want to be making
  // api calls.
  // TO-DO: Need to gracefully handle login errors
  async componentDidMount() {
    const token = window.localStorage.getItem("journal-app");
    if (token) {
      const profile = await auth.profile();
      this.setState({ currentUserId: profile.user._id });
    }
  }

  // async loginUser(user) {
  //   console.log("Logging In User:", user);
  //   const response = await fetch("http://localhost:5000/api/login", {
  //     body: JSON.stringify(user),
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     method: "POST"
  //   });
  //   const json = await response.json();
  //   console.log(json);
  // }

  async loginUser(user) {
    const response = await auth.login(user);
    const profile = await auth.profile();
    this.setState({ currentUserId: profile.user._id });
    console.log("### user login:", response, profile);
  }

  async signupUser(user) {
    const response = await auth.signup(user);
    const profile = await auth.profile();
    this.setState({ currentUserId: profile.user._id });
    console.log("### user sign up:", response, profile);
    console.log("Signing Up User:", user);
  }

  logoutUser = () => {
    window.localStorage.removeItem("journal-app");
    this.setState({ currentUserId: null });
  };

  render() {
    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route
            path="/login"
            exact
            render={() => {
              return this.state.currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Login onSubmit={this.loginUser} />
              );
            }}
          />
          <Route
            path="/signup"
            exact
            // component={() => {
            //   return <Signup onSubmit={this.signupUser} />;
            // }}
            render={() => {
              return this.state.currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Signup onSubmit={this.signupUser} />
              );
            }}
          />
          <Route
            path="/users"
            render={() => {
              return this.state.currentUserId ? (
                <UsersContainer />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />

          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
