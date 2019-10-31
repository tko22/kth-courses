import React from 'react'
class Course extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        Specific page for a course, depending on id prop
      </div>
    )
  }
}

export default Course