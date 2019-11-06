import React, { Component } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    var schoolList = this.context.model.getSchools().map(school=>{ 
      return <Link to={`/school/${school.code}`}><button type="button" class="list-group-item list-group-item-action">{school.name}</button></Link>
    });
    return (
      <div class="container-fluid">
        <h1>Master's studies</h1>
        <div class="row">
          <div class="list-group mx-auto">
            {schoolList}
          </div>
        </div>
      </div>
    )
  }
}
Home.contextType = ModelContext;
export default Home