import React from 'react'

export default ({ comments }) => (
  <>
    {
      comments ? comments.map(comment => (
        <li class="list-group-item d-flex justify-content-between align-items-center">
          {comment}
          <span class="badge badge-primary badge-pill">14</span>
        </li>
      )) : null
    }
  </>
)