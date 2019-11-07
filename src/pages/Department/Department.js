import React from 'react'
import './Department.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'


class Department extends React.Component {
  constructor(props) {
    super(props)
    this.state = {status: "LOADING", courseList: null}
  }

  async componentDidMount() {
    let code = this.props.match.params.code;
    const deptJSON = await this.context.model.getCourses(code);
    const courses = deptJSON.courses;
    this.setState({status: "LOADED", courseList: courses});
  }

  render() {
    const { courseList } = this.state;
    let htmlCourses = null;
    if(this.state.status ==="LOADED"){
      htmlCourses = courseList.map(course=>( 
        <Link to={`/course/${course.code}`}><button type="button" class="list-group-item list-group-item-action">{course.code}<br/>{course.title}</button></Link>
      ));
    }
    return (
      <div class="container-fluid">
        <h1>
          Department:<br/>{this.props.match.params.name}
        </h1>
        <div class="row">
          <div class="list-group mx-auto">
            {htmlCourses}
          </div>
          <p>{this.state.status ==="LOADING" ? 'Fetching courses...' : ''}</p>
        </div>
    </div>
    )
  }
}
Department.contextType = ModelContext;
export default Department