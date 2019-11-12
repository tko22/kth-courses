import React from 'react'
import './Course.css'
import { ModelContext } from '../../ModelContext'
import TextToJSX from '../../components/TextToJSX/TextToJSX'
import CommentList from '../../components/CommentList/CommentList'
import CommentGroup from '../../components/CommentGroup/CommentGroup'

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
    console.log(courseDB)
    return (
      <div class="container">
        <div className="row">
          {courseKTH && courseKTH.course ?
            <>
              <h3>{courseKTH.course.courseCode}: {courseKTH.course.title}</h3>
              {courseKTH.course.addOn ? <TextToJSX text={courseKTH.course.addOn} /> : ""}
              {courseKTH.course.applicationInfo ? <TextToJSX text={courseKTH.course.applicationInfo.substring(3, courseKTH.course.applicationInfo.length - 4)} /> : ""}
              {courseKTH.course.recruitmentText ? <TextToJSX text={courseKTH.course.recruitmentText.substring(3, courseKTH.course.recruitmentText.length - 4)} /> : ""}
            </>
            : null
          }
        </div>
        <div class="card">
          <div class="card-body">
            Overall rating: {courseDB && courseDB.ratings ? Math.round(((courseDB.ratings.reduce((accumulator, x) => accumulator + x, 0)) / courseDB.ratings.length) * 100) / 100 : "DNE"}
          </div>
        </div>

        <div id="accordion">
          <CommentGroup title="Overall comments" commentType="overallComments" comments={courseDB ? courseDB.overallComments : null} />
          <CommentGroup title="Course Contents" commentType="courseContents" comments={courseDB ? courseDB.courseContents : null} />
          <CommentGroup title="Examination" commentType="examination" comments={courseDB ? courseDB.examination : null} />
        </div>

      </div >
    )
  }
}
Course.contextType = ModelContext;
export default Course