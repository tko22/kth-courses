import React from 'react'
import './Course.css'
import { Link } from 'react-router-dom'
import { ModelContext } from '../../ModelContext'
import TextToJSX from '../../components/TextToJSX/TextToJSX'
import CommentGroup from '../../components/CommentGroup/CommentGroup'
import CourseSidebar from '../../components/CourseSidebar/CourseSidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { getAvgRating, timeout } from '../../common/utilities'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", courseKTH: null, courseDB: null, ratings: [[5, "Awesome - 5 stars", "full"], [4.5, "Really good - 4.5 stars", "half"], [4, "Good - 4 stars", "full"], [3.5, "3.5 stars", "half"], [3, "3 stars", "full"], [2.5, "Average - 2.5 stars", "half"], [2, "2 stars", "full"], [1.5, "1.5 stars", "half"], [1, "Meh - 1 stars", "full"], [0.5, "Bad - 0.5 star", "half"]]}
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
      await timeout(1000)
      courseDB = await this.context.model.getCourseDBDetails(code);
      this.setState({ status: "LOADED", courseDB })
    }
  }

  postRating = async (userRating) => {
    let code = this.state.courseKTH.course.courseCode
    this.context.model.rate(code, userRating, this.state.courseKTH.course.title)
    let newCourseDB = this.state.courseDB
    if (newCourseDB === undefined) {
      newCourseDB = await this.context.model.getCourseDBDetails(code);
    }
    if (newCourseDB.ratings !== undefined) {
      newCourseDB.ratings.push(userRating)
    }
    else {
      newCourseDB.ratings = [userRating]
    }
    this.setState({ courseDB: newCourseDB });
    window.alert("Rated Course!")
  }

  setFavourite(courseCode) {
    let cookieStr = this.context.model.getCookie("favourites");
    if (cookieStr!="") {
      cookieStr = cookieStr + "," + courseCode
    }else{
      cookieStr = courseCode
    }
    var expiration_date = new Date();
    expiration_date.setFullYear(expiration_date.getFullYear() + 1);
    document.cookie ="favourites="+cookieStr+";expires="+expiration_date.toUTCString()+";path=/profile"; 
    window.alert("Favourited Course!") 
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
            <button className="btn btn-outline-info float-left" onClick={this.goBack}>Back</button>
          </div>
          <div className="col-md-8">
            <div className="row">{courseKTH && courseKTH.course && <h2>{courseKTH.course.courseCode}: {courseKTH.course.title}</h2>}</div>
            <div className="row pb-3 ml-2">
              <div className="col"><span style={{ fontSize: "14px" }} className="badge badge-pill badge-info p-2">Overall rating: {courseDB && courseDB.ratings ? getAvgRating(courseDB.ratings) : "DNE"}</span></div>
              <div className="col">
                <fieldset class="rating">
                  {this.state.ratings.map(rating=>{
                    let type = "half";
                    if(rating[2]=="full") {
                      type="full"
                    }
                      return <><input type="radio" id={`star${rating[0]}`} className="rating" value={rating[0]} onClick={() => {this.postRating(rating[0])}}/><label className ={type} for={`star${rating[0]}`} title={rating[1]}></label></>;  
                  })}
                </fieldset>
              </div>
            </div>
            <div className="row">
              <div className="col"><button className="btn btn-info" type="button" id="favButton" onClick={() => {this.setFavourite(courseKTH.course.courseCode)}}>Favourite</button></div>
            </div>
            <div className="row ml-2 mb-5">
              {courseKTH && courseKTH.course &&
                <div className="course-info">
                  {courseKTH.course.addOn ? <TextToJSX text={courseKTH.course.addOn} /> : ""}
                  {courseKTH.course.applicationInfo ? <TextToJSX text={courseKTH.course.applicationInfo.substring(3, courseKTH.course.applicationInfo.length - 4)} /> : ""}
                  {courseKTH.course.recruitmentText ? <TextToJSX text={courseKTH.course.recruitmentText.substring(3, courseKTH.course.recruitmentText.length - 4)} /> : ""}
                  {courseKTH.course.courseDeposition ? <><h4>Course Desposition</h4> <TextToJSX text={courseKTH.course.courseDeposition.substring(4, courseKTH.course.courseDeposition.length - 4)} /></> : ""}
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