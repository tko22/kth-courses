import React, { Component } from 'react'
import './Listed.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'
import ListGroupItem from '../../components/ListGroupItem/ListGroupItem';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary'



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

  listCourses(courses) {
    let htmlCourses = (
      <ErrorBoundary>
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
                  <td>{course.code}</td>
                  <td>{course.title}</td>
                  <td>{course.credits} {course.creditUnitAbbr}</td>
                  <td>{course.level}</td>
                  <td><span className={`badge ${course.state === "CANCELLED" ? "badge-danger" : (course.state === "ESTABLISHED" ? "badge-primary" : "badge-secondary")}`}>{course.state}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ErrorBoundary>
    );
    return htmlCourses
  }
  async getCourseAsync(courseID) {
    return await this.context.model.getCourseKTH(courseID)
  }

  async componentDidMount() {
    let url = this.props.match.url.split("/")[1];
    let code = this.props.match.params.code;
    switch (url) {
      case "":
        const schools = await this.context.model.getSchools();
        let htmlSchools = schools.map(school => (
          <ErrorBoundary><ListGroupItem link={`/school/${school.name}`} name={<>{school.name.split("/")[0]}<br />{school.name.split("/")[1]}</>} /></ErrorBoundary>
        ));
        this.setState({ status: "LOADED", htmlList: htmlSchools, url: "All schools:" });
        break;

      case "school":
        const depts = await this.context.model.getDepartments(code);
        let htmlDepts = depts.map(dept => (
          <ErrorBoundary><ListGroupItem link={`/department/${dept.code}/${dept.name}`} name={<>{dept.code}<br />{dept.name.split("/")[1]}</>} /></ErrorBoundary>
        ));
        this.setState({ status: "LOADED", htmlList: htmlDepts, url: `School:\n${this.props.match.params.name}` });
        break;

      case "department":
        const deptJSON = await this.context.model.getCourses(code);
        const courses = deptJSON.courses;
        let htmlCourses = this.listCourses(courses);
        this.setState({ status: "LOADED", htmlList: htmlCourses, url: `Department:\n${deptJSON.department}` });
        break;

      case "profile":
        let favCourses = this.context.model.getCookie("favourites").split(",");
        if (favCourses[0]!=="") {
          let promises = favCourses.map(async courseID => {
            const course = await this.context.model.getCourseKTH(courseID);
            course.code = course.course.courseCode;
            course.title = course.course.title;
            course.credits = course.course.credits;
            course.level = course.course.educationalLevelCode;
            course.state = course.course.state;
            return course;
            });
            Promise.all(promises).then( favCourses =>{
              let htmlFavourites = this.listCourses(favCourses);
              this.setState({ status: "LOADED", htmlList: htmlFavourites, url: "Profile page"});
            });
          }else{
            this.setState({ status: "LOADED", htmlList: "You have no favourites yet", url: "Profile page"});
          }
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
            <button onClick={this.goBack} className="btn btn-outline-info float-left">Back</button>
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