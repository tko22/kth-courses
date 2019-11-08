import React from 'react'
import './Course.css'
import { ModelContext } from '../../ModelContext'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", courseKTH: null, courseDB:null, overallCommentList: null, contentsList: null, examinationList:null}
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const courseKTH = await this.context.model.getCourseKTH(code);
    //const courses = deptJSON.courses;
    let courseDB = await this.context.model.getCourseDB(code);
    courseDB = courseDB[0];
    let htmlOverallComments = courseDB.overallComments.map(comment => (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {comment}
        <span class="badge badge-primary badge-pill">14</span>
      </li>
    ));
    let htmlCourseContents = courseDB.courseContents.map(comment => (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {comment}
        <span class="badge badge-primary badge-pill">14</span>
      </li>
    ));
    let htmlExamination = courseDB.examination.map(comment => (
      <li class="list-group-item d-flex justify-content-between align-items-center">
        {comment}
        <span class="badge badge-primary badge-pill">14</span>
      </li>
    ));
    this.setState({status: "LOADED", courseKTH:courseKTH, courseDB:courseDB, overallCommentList:htmlOverallComments, contentsList:htmlCourseContents, examinationList:htmlExamination});
  }

  render() {
    const { courseKTH, courseDB, overallCommentList, contentsList, examinationList} = this.state;
    return (
      <div class="container">
        <div className="row">
          {courseKTH && courseKTH.course ?
            <>
              <h3>{courseKTH.course.courseCode}: {courseKTH.course.title}</h3>
              {courseKTH.course.addOn ? courseKTH.course.addOn : ""}
              {courseKTH.course.applicationInfo ? courseKTH.course.applicationInfo.substring(3, courseKTH.course.applicationInfo.length - 4) : ""}
              {courseKTH.course.recruitmentText ? courseKTH.course.recruitmentText.substring(3, courseKTH.course.recruitmentText.length - 4) : ""}
            </>
            : null
          }
        </div>
        <div class="card">
          <div class="card-body">
            Overall rating: {courseDB ? Math.round(((courseDB.ratings.reduce((accumulator, x)=>accumulator+x,0))/courseDB.ratings.length)*100)/100 : null}
          </div>
        </div>

        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Overall comments
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <ul class="list-group">
                  {overallCommentList}
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  Course contents
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">
                <ul class="list-group">
                  {contentsList}
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Examination
                </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body">
                <ul class="list-group">
                  {examinationList}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
Course.contextType = ModelContext;
export default Course