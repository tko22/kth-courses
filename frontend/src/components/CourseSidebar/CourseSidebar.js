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
            course.cancelled || course.deactivated ? <span className="badge badge-pill badge-danger mb-2">Course cancelled</span> : <span className="badge badge-pill badge-success mb-2">Course running</span>
          }
          <p>{course.credits} {course.creditUnitLabel}</p>
          <p><b>Course state:</b> {course.state}</p>
          <p><b>Department:</b> <Link to={`/department/${course.department.code}/${course.department.name}`}>{course.department.name}</Link></p>

          <p><b>Main Subjects: </b> {courseKTH.mainSubjects.join(', ')}</p>
          <p><b>Contact: </b> {course.infoContactName}</p>
          <p>Grade Scales:  {courseKTH.formattedGradeScales[course.gradeScaleCode]}
          </p>
          {
            !course.cancelled && !course.deactivated ? <p style={{ fontSize: "14px" }}><a href={courseKTH.socialCoursePageUrl}>visit course site</a></p> : <p></p>
          }
          
        </div>
      </div >
    )
  }
}

export default CourseSidebar