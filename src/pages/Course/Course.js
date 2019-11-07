import React from 'react'
import './Course.css'
import { ModelContext } from '../../ModelContext'

class Course extends React.Component {
  constructor(props) {
    super(props)
    this.state = { status: "LOADING", course: null, commentList: null }
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const course = await this.context.model.getCourse(code);
    //const courses = deptJSON.courses;
    this.setState({ status: "LOADED", course: course });
  }

  render() {
    const { course } = this.state;
    let htmlInfo = null;
    if (this.state.status === "LOADED") {
      console.log(course)
      htmlInfo =
        [
          // <div class="row"><h3>{course.course.addOn.substring(3, course.course.addOn.length - 4)}</h3></div>,
          // <div class="row"><p>{course.course.applicationInfo.substring(3, course.course.applicationInfo.length - 4)}</p></div>,
          // <div class="row"><p>{course.course.recruitmentText.substring(3, course.course.recruitmentText.length - 4)}</p></div>,
          // <div class="row"><p>{course.course.supplInfoUrl}</p></div>
        ]
    }
    return (
      <div class="container">
        <div className="row">
          {course && course.course ?
            <>
              <h3>{course.course.courseCode}: {course.course.title}</h3>
              {course.course.addOn}
              {course.course.applicationInfo ? course.course.applicationInfo.substring(3, course.course.applicationInfo.length - 4) : ""}
              {course.course.recruitmentText}
            </>
            : null
          }
        </div>
        {htmlInfo}
        <div class="card">
          <div class="card-body">
            Overall rating
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
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment1
                    <span class="badge badge-primary badge-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment2
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment3
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
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
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment1
                    <span class="badge badge-primary badge-pill">14</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment2
                    <span class="badge badge-primary badge-pill">2</span>
                  </li>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    Comment3
                    <span class="badge badge-primary badge-pill">1</span>
                  </li>
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
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
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