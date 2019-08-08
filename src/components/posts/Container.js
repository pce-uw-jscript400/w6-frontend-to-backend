import React from "react";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";

import List from "./List/List";
import EditForm from "./Form/Edit.Form";
import NewForm from "./Form/New.Form";
import * as api from "../../api/posts";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [{ posts: [] }]
    };

    this.createPost = this.createPost.bind(this);
    this.destroyPost = this.destroyPost.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  // To-Do: Add this in later for specific user posts api call
  // async componentDidMount() {
  //   const token = window.localStorage.getItem("journal-app");
  //   if (token) {
  //     const users = await api.getAllUsers();
  //     this.setState({ users });
  //   }
  // }

  createPost(post) {
    console.log("Submitting Post:", post);
  }

  async destroyPost(userId, postId) {
    console.log("Destroying Post:", postId);
    const response = await api.deleteUserPost(userId, postId);
    console.log(response);
    this.props.history.push(`users/${userId}/posts`);
  }

  editPost(post) {
    console.log("Editting Post:", post);
  }

  render() {
    const { users } = this.props;
    return (
      <>
        <Route
          path="/users/:userId/posts"
          exact
          component={({ match }) => {
            const user = users.find(user => user._id === match.params.userId);
            return <List destroyPost={this.destroyPost} user={user} />;
          }}
        />
        <Route
          path="/users/:userId/posts/new"
          exact
          component={() => {
            return <NewForm onSubmit={this.createPost} />;
          }}
        />
        <Route
          path="/users/:userId/posts/:postId/edit"
          exact
          component={({ match }) => {
            const user = users.find(user => user._id === match.params.userId);
            const post = user.posts.find(
              user => user._id === match.params.postId
            );
            return <EditForm onSubmit={this.editPost} post={post} />;
          }}
        />
      </>
    );
  }
}

export default withRouter(Container);
