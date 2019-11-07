import React from 'react'
import './School.css'
import { Link } from 'react-router-dom';
import { ModelContext } from '../../ModelContext'


class School extends React.Component {
  constructor(props) {
    super(props)
    this.state = {status: "LOADING", deptList: null}
  }
  
  async componentDidMount(props) {
    let code = this.props.match.params.code;
    const depts = await this.context.model.getDepatments(code);
    this.setState({status: "LOADED", deptList: depts});
  }

  render() {
    let htmlDepts = null;
    const { deptList } = this.state;
    if(this.state.status ==="LOADED"){
      htmlDepts = deptList.map(dept=>( 
        <Link to={`/department/${dept.code}/${dept.name}`}><button type="button" class="list-group-item list-group-item-action">{dept.code}<br/>{dept.name.split("/")[1]}</button></Link>
      ));
    }
    return (
      <div class="container-fluid">  
          <div class="row"><h1>School:<br/>{this.props.match.params.name}</h1></div>
          <div class="row">
            <div class="list-group mx-auto">
              {htmlDepts}
            </div>
            <p>{this.state.status ==="LOADING" ? 'Fetching departments...' : ''}</p>
          </div>
      </div>
    )
  }
}
School.contextType = ModelContext;
export default School