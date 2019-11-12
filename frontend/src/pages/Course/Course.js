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
          {/* <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn collapsed" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                  Overall comments
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body">
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
                  <div class="input-group-append">
                    <button class="btn btn-dark" type="button" onClick={this.context.model.comment()}>Comment</button>
                  </div>
                </div>
                <ul class="list-group">
                  <CommentList comments={courseDB ? courseDB.overallComments : null} />

                </ul>
              </div>
            </div>
          </div> */}
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
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
                  <div class="input-group-append">
                    <button class="btn btn-dark" type="button" onClick={this.context.model.comment()}>Comment</button>
                  </div>
                </div>
                <ul class="list-group">
                  <CommentList comments={courseDB ? courseDB.courseContents : null} />
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
                <div class="input-group mb-3">
                  <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onCommentInputChange} value={this.state.commentInput} />
                  <div class="input-group-append">
                    <button class="btn btn-dark" type="button" onClick={this.context.model.comment()}>Comment</button>
                  </div>
                </div>
                <ul class="list-group">
                  <CommentList comments={courseDB ? courseDB.examination : null} />
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div >
    )
  }
}
Course.contextType = ModelContext;
export default Course