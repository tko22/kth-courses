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
    this.state = { status: "LOADING", courseKTH: null, courseDB: null, commentInput: null }
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const courseKTH = await this.context.model.getCourseKTH(code);
    let courseDB = await this.context.model.getCourseDBDetails(code);
    this.setState({ status: "LOADED", courseKTH, courseDB });
  }

  onCommentInputChange = e => {
    this.setState({ commentInput: e.target.value });
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
            <div className="row pb-3"><span style={{ fontSize: "14px" }} className="badge badge-pill badge-primary p-2">Overall rating: {courseDB && courseDB.ratings ? Math.round(((courseDB.ratings.reduce((accumulator, x) => accumulator + x, 0)) / courseDB.ratings.length) * 100) / 100 : "DNE"}</span></div>
            <div className="row">
              {courseKTH && courseKTH.course &&
                <div className="course-info">
                  {courseKTH.course.addOn ? <TextToJSX text={courseKTH.course.addOn} /> : ""}
                  {courseKTH.course.applicationInfo ? <TextToJSX text={courseKTH.course.applicationInfo.substring(3, courseKTH.course.applicationInfo.length - 4)} /> : ""}
                  {courseKTH.course.recruitmentText ? <TextToJSX text={courseKTH.course.recruitmentText.substring(3, courseKTH.course.recruitmentText.length - 4)} /> : ""}
                </div>
              }
            </div>

            <div id="accordion">
              <h3 className="header-left">Comments</h3>
              <hr />
              <CommentGroup title="Overall comments" commentType="overallComments" comments={courseDB ? courseDB.overallComments : []} />
              <CommentGroup title="Course Contents" commentType="courseContents" comments={courseDB ? courseDB.courseContents : []} />
              <CommentGroup title="Examination" commentType="examination" comments={courseDB ? courseDB.examination : []} />
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Course.contextType = ModelContext;
export default Course