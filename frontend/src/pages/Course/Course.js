import React from 'react'
import './Course.css'
import { Link } from 'react-router-dom'
import { ModelContext } from '../../ModelContext'
import TextToJSX from '../../components/TextToJSX/TextToJSX'
import CommentGroup from '../../components/CommentGroup/CommentGroup'
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", courseKTH: null, courseDB: null }
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const courseKTH = await this.context.model.getCourseKTH(code);
    let courseDB = await this.context.model.getCourseDBDetails(code);
    this.setState({ status: "LOADED", courseKTH, courseDB });
  }

  postRating = (userRating) => {
    let code = this.state.courseKTH.course.courseCode
    this.context.model.rate(code, userRating, this.state.courseKTH.course.title)
    let newCourseDB = this.state.courseDB
    newCourseDB.ratings.push(userRating)
    this.setState({ courseDB: newCourseDB });
    window.alert("Rated Course!")
  }

  render() {
    const { courseKTH, courseDB, status } = this.state;
    if (status === "LOADING" || !courseKTH) {
      return (
        <div class="spinner-border mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    }
    const { course } = courseKTH
    return (
      <div className="container pt-4">

        <div className="row">
          <div className="col-md-4">
            <CourseSidebar courseKTH={courseKTH} />
          </div>
          <div className="col-md-8">
            <div className="row">{courseKTH && courseKTH.course && <h2>{courseKTH.course.courseCode}: {courseKTH.course.title}</h2>}</div>
            <div className="row pb-3 ml-2">
              <div className="col"><span style={{ fontSize: "14px" }} className="badge badge-pill badge-primary p-2">Overall rating: {courseDB && courseDB.ratings ? Math.round(((courseDB.ratings.reduce((accumulator, x) => accumulator + x, 0)) / courseDB.ratings.length) * 100) / 100 : "DNE"}</span></div>
              <div className="col"></div>
              <div className="col">
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Rate
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {
                      [...Array(10).keys()].map(num => (
                        <a key={num} className="dropdown-item btn" href="#" onClick={() => { this.postRating(num) }}>{num}</a>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            <div className="row ml-2 mb-5">
              {courseKTH && courseKTH.course &&
                <div className="course-info">
                  {courseKTH.course.addOn ? <TextToJSX text={courseKTH.course.addOn} /> : ""}
                  {courseKTH.course.applicationInfo ? <TextToJSX text={courseKTH.course.applicationInfo.substring(3, courseKTH.course.applicationInfo.length - 4)} /> : ""}
                  {courseKTH.course.recruitmentText ? <TextToJSX text={courseKTH.course.recruitmentText.substring(3, courseKTH.course.recruitmentText.length - 4)} /> : ""}
                </div>
              }
            </div>

            <div id="accordion">
              <h4 className="header-left">Comments</h4>
              <hr />
              <CommentGroup courseCode={courseKTH.course.courseCode} title="Overall comments" commentType="overallComments" comments={courseDB ? courseDB.overallComments : []} />
              <CommentGroup courseCode={courseKTH.course.courseCode} title="Course Contents" commentType="courseContents" comments={courseDB ? courseDB.courseContents : []} />
              <CommentGroup courseCode={courseKTH.course.courseCode} title="Examination" commentType="examination" comments={courseDB ? courseDB.examination : []} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Course.contextType = ModelContext;
export default Course