import React, { Component } from 'react'
import './Listed.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'
import ListGroupItem from '../../components/ListGroupItem/ListGroupItem';


class Listed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "LOADING", htmlList: null, url: null };
  }

  async componentDidMount() {
    let url = this.props.match.url.split("/")[1];
    let code = this.props.match.params.code;
    switch (url) {
      case "":
        const schools = await this.context.model.getSchools();
        let htmlSchools = schools.map(school => (
          <ListGroupItem link={`/school/${school.name}`} name={<>{school.name.split("/")[0]}<br />{school.name.split("/")[1]}</>} />
        ));
        this.setState({ status: "LOADED", htmlList: htmlSchools, url: "Master's Studies" });
        break;

      case "school":
        const depts = await this.context.model.getDepartments(code);
        console.log(depts)
        let htmlDepts = depts.map(dept => (
          <ListGroupItem link={`/department/${dept.code}/${dept.name}`} name={<>{dept.code}<br />{dept.name.split("/")[1]}</>} />
        ));
        this.setState({ status: "LOADED", htmlList: htmlDepts, url: `School ${code}` });
        break;

      case "department":
        const deptJSON = await this.context.model.getCourses(code);
        const courses = deptJSON.courses;
        console.log(deptJSON)
        let htmlCourses = courses.map(course => (
          <ListGroupItem link={`/course/${course.code}`} name={<>{course.code}<br />{course.title}</>} />
        ));
        this.setState({ status: "LOADED", htmlList: htmlCourses, url: `Department ${deptJSON.department}` });
        break;

      case "search":
        let input = this.props.match.params.input;
        const results = await this.context.model.search(input);
        const { searchHits } = results
        let htmlResults = searchHits.map(course => (
          <Link to={`/course/${course.course.courseCode}`}><button type="button" class="list-group-item list-group-item-action">{course.course.courseCode}<br />{course.course.title}</button></Link>
        ));
        this.setState({ status: "LOADED", htmlList: htmlResults });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div class="container">
        <h1>{this.state.url}</h1>
        <div class="row">
          <div class="list-group mx-auto">
            {this.state.htmlList}
          </div>
          <p>{this.state.status === "LOADING" ? 'Fetching...' : ''}</p>
        </div>
      </div>
    )
  }
}
Listed.contextType = ModelContext;
export default Listed