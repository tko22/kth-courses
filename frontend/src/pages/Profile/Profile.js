import React from 'react'


class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <h4>Your Favorited Courses</h4>
          <table className="table table-sm table-hover text-left">
            <tr className="text-secondary">
              <th scope="col">Course Code</th>
              <th scope="col">Title</th>
              <th scope="col">Credits</th>
              <th scope="col">Educational Level</th>
            </tr>
          </table>
        </div>
      </div>
    )
  }

}

export default ProfilePage