import React, { Component } from 'react'
import './Listed.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'


class Listed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: "LOADING", htmlList: null};
  }

  async componentDidMount() {
    let url = this.props.match.url.split("/")[1];
    let code = this.props.match.params.code;
    switch(url){
      case "":
        const schools = await this.context.model.getSchools();
        let htmlSchools = schools.map(school=>( 
          <Link to={`/school/${school.name}`}><button type="button" class="list-group-item list-group-item-action">{school.name.split("/")[0]}<br/>{school.name.split("/")[1]}</button></Link>
        ));
        this.setState({status: "LOADED", htmlList: htmlSchools});
        break;

      case "school":
        const depts = await this.context.model.getDepatments(code);
        let htmlDepts = depts.map(dept=>( 
          <Link to={`/department/${dept.code}/${dept.name}`}><button type="button" class="list-group-item list-group-item-action">{dept.code}<br/>{dept.name.split("/")[1]}</button></Link>
        ));
        this.setState({status: "LOADED", htmlList: htmlDepts});
        break;

      case "department":
        const deptJSON = await this.context.model.getCourses(code);
        const courses = deptJSON.courses;
        let htmlCourses = courses.map(course=>( 
          <Link to={`/course/${course.code}`}><button type="button" class="list-group-item list-group-item-action">{course.code}<br/>{course.title}</button></Link>
        ));
        this.setState({status: "LOADED", htmlList: htmlCourses});
        break;
      
      case "search":
        let input = this.props.match.params.input;
        const results = await this.context.model.search(input);
        let htmlResults = results.map(course=>(
          <Link to={`/course/${course.code}`}><button type="button" class="list-group-item list-group-item-action">{course.code}<br/>{course.title}</button></Link>
        ));
        this.setState({status: "LOADED", htmlList: htmlResults});
        break;
    }
  }

  render() {
    return (
      <div class="container-fluid">
      <h1>Master's studies</h1>
      <div class="row">
        <div class="list-group mx-auto">
          {this.state.htmlList}
        </div>
        <p>{this.state.status ==="LOADING" ? 'Fetching schools...' : ''}</p>
      </div>
    </div> 
    ) 
  }
}
Listed.contextType = ModelContext;
export default Listed