import { Component } from "react";

import "./index.css";

class Data extends Component {
  render() {
    const { userDetails } = this.props;
    console.log(userDetails);

    const { userId, id, title, body } = userDetails;

    return (
      <div className="user-item-container">
        <div className="user-item-ids-container">
          <p className="user-item-user-id">userId: {userId}</p>
          <p className="user-item-post-id">postId: {id}</p>
        </div>
        <h1 className="user-item-title">
          <span className="sub-header">Title:</span>
          {title}
        </h1>
        <p className="user-item-body">
          <span className="sub-header">Post:</span>
          {body}
        </p>
      </div>
    );
  }
}

export default Data;