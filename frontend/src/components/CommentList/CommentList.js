import React from 'react'
import "./CommentList.css"

export default ({ comments }) => (
  <>
    {
      comments && comments.length > 0 ? comments.map(comment => (
        <li key={comment} className="list-group-item d-flex justify-content-between align-items-center">
          {comment}
          {/* <span className="badge badge-primary badge-pill">14</span> */}
        </li>
      )) :
        <p className="no-comment-text">No Comments</p>
    }
  </>
)