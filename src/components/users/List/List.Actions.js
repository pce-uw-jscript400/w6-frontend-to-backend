import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

export default ({ currentUserId, user }) => (
  <div className="card-footer text-muted d-flex justify-content-around">
    {currentUserId === user._id && (
      <>
        <Link className="btn btn-link" to={`/users/${user._id}/edit`}>
          Edit Name
        </Link>
      </>
    )}

    <span className="btn btn-link text-muted" disabled>
      Created {moment(post.created_at).fromNow()}
    </span>
  </div>
);
