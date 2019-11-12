import React from 'react'
import "./CourseSidebar.css"
import { Link } from 'react-router-dom'

class CourseSidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { courseKTH } = this.props

    if (!courseKTH) {
      return <div className="filter-box"><p>"Loading"</p></div>
    }

    const { course } = courseKTH
    return (
      <div className="filter-box" >
        <h4><a className="course-id-header" href={courseKTH.socialCoursePageUrl}>{course.courseCode}</a></h4>
        <hr />
        <div className="container">
          {
            course.cancelled || course.deactivated ? <span className="badge badge-pill badge-danger">Course cancelled</span> : <span className="badge badge-pill badge-success">Course running</span>
          }
          <p>{course.credits} {course.creditUnitLabel}</p>
          <p><b>Course state:</b> {course.state}</p>
          <p><b>Department:</b> <Link to={`/department/${course.department.code}/${course.department.name}`}>{course.department.name}</Link></p>
        </div>
      </div >
    )
  }
}

export default CourseSidebar