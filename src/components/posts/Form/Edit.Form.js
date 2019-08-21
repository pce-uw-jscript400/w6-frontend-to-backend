import React from "react";
import Form from "./Form";

export default ({ onSubmit, post, postError }) => (
  <section className="container">
    <h1>Edit Your Post</h1>
    {postError ? (
      <span style={{ color: "red" }}>Invalid post. Please try again.</span>
    ) : (
      ""
    )}
    <hr />
    <Form post={post} onSubmit={onSubmit} />
  </section>
);
