import React from 'react'
import './Course.css'
import { Link } from 'react-router-dom'
import { ModelContext } from '../../ModelContext'
import TextToJSX from '../../components/TextToJSX/TextToJSX'
import CommentGroup from '../../components/CommentGroup/CommentGroup'
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import { getAvgRating } from '../../common/utilities'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", courseKTH: null, courseDB: null }
  }

  goBack = () => {
    this.props.history.goBack();
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const courseKTH = await this.context.model.getCourseKTH(code);
    if (courseKTH === undefined) {
      this.setState({
        status: "DNE"
      })
      return
    }
    let courseDB = await this.context.model.getCourseDBDetails(code);
    this.setState({ status: "LOADED", courseKTH, courseDB });
    if (courseDB === undefined) {
      await this.context.model.createDBCourse(code, courseKTH.course.title)
      courseDB = await this.context.model.getCourseDBDetails(code);
      this.setState({ status: "LOADED", courseDB })
    }
  }

  postRating = (userRating) => {
    let code = this.state.courseKTH.course.courseCode
    this.context.model.rate(code, userRating, this.state.courseKTH.course.title)
    let newCourseDB = this.state.courseDB
    if (newCourseDB.ratings !== undefined) {
      newCourseDB.ratings.push(userRating)
    }
    else {
      newCourseDB.ratings = [userRating]
    }
    this.setState({ courseDB: newCourseDB });
    window.alert("Rated Course!")
  }

  render() {
    const { courseKTH, courseDB, status } = this.state;
    if (status === "DNE") {
      return (
        <p>Course Doesnt Exist</p>
      )
    }
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
            <button className="btn btn-primary float-left" onClick={this.goBack}>Back</button>
          </div>
          <div className="col-md-8">
            <div className="row">{courseKTH && courseKTH.course && <h2>{courseKTH.course.courseCode}: {courseKTH.course.title}</h2>}</div>
            <div className="row pb-3 ml-2">
              <div className="col"><span style={{ fontSize: "14px" }} className="badge badge-pill badge-info p-2">Overall rating: {courseDB && courseDB.ratings ? getAvgRating(courseDB.ratings) : "DNE"}</span></div>
              <div className="col"></div>
              <div className="col">
                <div class="dropdown">
                  <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                  {courseKTH.course.courseDeposition ? <><h4>Course Desposition</h4> <TextToJSX text={courseKTH.course.courseDeposition.substring(4, courseKTH.course.recruitmentText.length - 4)} /></> : ""}
                </div>
              }
            </div>

            <div id="accordion">
              <h4 className="header-left">Comments</h4>
              <hr />
              <CommentGroup courseName={courseKTH.course.title} courseCode={courseKTH.course.courseCode} title="Overall comments" commentType="overallComments" comments={courseDB ? courseDB.overallComments : []} />
              <CommentGroup courseName={courseKTH.course.title} courseCode={courseKTH.course.courseCode} title="Course Contents" commentType="courseContents" comments={courseDB ? courseDB.courseContents : []} ratings={courseDB ? courseDB.courseRating : []} ratingType="courseRating" />
              <CommentGroup courseName={courseKTH.course.title} courseCode={courseKTH.course.courseCode} title="Examination" commentType="examination" comments={courseDB ? courseDB.examination : []} ratings={courseDB ? courseDB.examinationRating : []} ratingType="examinationRating" />
              <CommentGroup courseName={courseKTH.course.title} courseCode={courseKTH.course.courseCode} title="Literature" commentType="literature" comments={courseDB ? courseDB.literature : []} ratings={courseDB ? courseDB.literatureRating : []} ratingType="literatureRating" />
              <CommentGroup courseName={courseKTH.course.title} courseCode={courseKTH.course.courseCode} title="Recommended Prerequisites" commentType="recommendedPrerequisites" comments={courseDB ? courseDB.recommendedPrerequisites : []} ratings={courseDB ? courseDB.recommendedPrerequisitesRating : []} ratingType="recommendedPrerequisitesRating" />
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Course.contextType = ModelContext;
export default Course