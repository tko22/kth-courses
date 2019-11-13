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
    this.context.model.rate(code, userRating)
    //this.componentDidMount()
    //let newCourseDB = await this.context.model.getCourseDBDetails(code);
    //this.setState({courseDB:newCourseDB });
  }

  render() {
    const { courseKTH, courseDB, status } = this.state;
    if (status === "LOADING" || !courseKTH) {
      return <p className="mt-5">Loading....</p>
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
              <div className="col">
                <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Rate
                  </button>
                  {/*TODO: Improve */}
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(0)}}>0</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(1)}}>1</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(2)}}>2</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(3)}}>3</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(4)}}>4</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(5)}}>5</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(6)}}>6</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(7)}}>7</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(8)}}>8</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(9)}}>9</a>
                    <a class="dropdown-item btn" href="#" onClick={() => {this.postRating(10)}}>10</a>
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
              <CommentGroup courseCode = {courseKTH.course.courseCode} title="Overall comments" commentType="overallComments" comments={courseDB ? courseDB.overallComments : []} />
              <CommentGroup courseCode = {courseKTH.course.courseCode} title="Course Contents" commentType="courseContents" comments={courseDB ? courseDB.courseContents : []} />
              <CommentGroup courseCode = {courseKTH.course.courseCode} title="Examination" commentType="examination" comments={courseDB ? courseDB.examination : []} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Course.contextType = ModelContext;
export default Course