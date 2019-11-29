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

  goBack = () => {
    this.props.history.goBack();
  }

  courseClicked = code => {
    this.props.history.push(`/course/${code}`)
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
        let htmlDepts = depts.map(dept => (
          <ListGroupItem link={`/department/${dept.code}/${dept.name}`} name={<>{dept.code}<br />{dept.name.split("/")[1]}</>} />
        ));
        this.setState({ status: "LOADED", htmlList: htmlDepts, url: `School: ${this.props.match.params.name}` });
        break;

      case "department":
        const deptJSON = await this.context.model.getCourses(code);
        const courses = deptJSON.courses;
        let htmlCourses = (
          <div>
            <table className="table table-sm table-hover text-left">
              <tr className="text-secondary">
                <th scope="col">Code</th>
                <th scope="col">Title</th>
                <th scope="col">Credits</th>
                <th scope="col">Level</th>
                <th scope="col">State</th>
              </tr>
              <tbody>
                {courses.map(course => (
                  <tr key={course.code} onClick={() => this.courseClicked(course.code)}>
                    <th>{course.code}</th>
                    <th>{course.title}</th>
                    <th>{course.credits} {course.creditUnitAbbr}</th>
                    <th>{course.level}</th>
                    <th><span className={`badge ${course.state === "CANCELLED" ? "badge-danger" : (course.state === "ESTABLISHED" ? "badge-primary" : "badge-secondary")}`}>{course.state}</span></th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        this.setState({ status: "LOADED", htmlList: htmlCourses, url: `Department ${deptJSON.department}` });
        break;

      default:
        break;
    }
  }

  render() {
    const url = this.props.match.url.split("/")[1]
    return (
      <div className="container">

        <h1 className="mt-4">{this.state.url}</h1>
        {url !== "" && this.state.status !== "LOADING" ?
          <div className="row">
            <button onClick={this.goBack} className="btn btn-primary float-left">Back</button>
          </div>
          : null}
        <div className="row mt-3">
          <div className="list-group mx-auto">
            {this.state.htmlList}
          </div>
          <span className="mx-auto">{this.state.status === "LOADING" ? (
            <div class="spinner-border mt-3" role="status">
              <span className="sr-only">Loading...</span>
            </div>) : ''}
          </span>
        </div>
      </div>
    )
  }
}
Listed.contextType = ModelContext;
export default Listed