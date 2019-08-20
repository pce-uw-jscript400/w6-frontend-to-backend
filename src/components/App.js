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
import * as token from "../helpers/local-storage";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUserId: null,
      loading: true
    };

    this.loginUser = this.loginUser.bind(this);
    this.signupUser = this.signupUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  async componentDidMount() {
    const token = window.localStorage.getItem("journal_app");
    if (token) {
      const profile = await auth.profile();
      this.setState({ currentUserId: profile._id });
    }
    this.setState({ loading: false });
  }

  async loginUser(user) {
    await auth.login(user);
    const profile = await auth.profile();
    this.setState({ currentUserId: profile.user._id });
  }

  async signupUser(user) {
    await auth.signup(user);
    const profile = await auth.profile();

    this.setState({ currentUserId: profile.user._id });
  }

  logoutUser() {
    window.localStorage.removeItem("journal_app");
    this.setState({ currentUserId: null });
    // history.push("/login");
  }

  render() {
    const { currentUserId, loading } = this.state;
    if (loading) return <span />;

    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={currentUserId}
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route
            path="/login"
            exact
            component={() => {
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
            component={() => {
              // return <Signup onSubmit={this.signupUser} />;
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
                <UsersContainer currentUserId={currentUserId} />
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
