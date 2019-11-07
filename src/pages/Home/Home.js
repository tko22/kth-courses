import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {status: "LOADING", schoolList: null}
  }

  async componentDidMount() {
    const schools = await this.context.model.getSchools();
    this.setState({status: "LOADED", schoolList: schools});
  }

  render() {
    let htmlSchools = null;
    const { schoolList } = this.state;
    if(this.state.status ==="LOADED"){
      htmlSchools = schoolList.map(school=>( 
        <Link to={`/school/${school.name}`}><button type="button" class="list-group-item list-group-item-action">{school.name.split("/")[0]}<br/>{school.name.split("/")[1]}</button></Link>
      ));
    }
    return (
      <div class="container-fluid">
      <h1>Master's studies</h1>
      <div class="row">
        <div class="list-group mx-auto">
          {htmlSchools}
        </div>
        <p>{this.state.status ==="LOADING" ? 'Fetching schools...' : ''}</p>
      </div>
    </div> 
    ) 
  }
}
Home.contextType = ModelContext;
export default Home