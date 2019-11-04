import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="container-fluid">
        <h1>Master's studies</h1>
        <div class="row">
          <div class="list-group mx-auto">
            <Link to="/school/arch"><button type="button" class="list-group-item list-group-item-action">School of Architecture and the Built Environment</button></Link>
            <button type="button" class="list-group-item list-group-item-action">School of Engineering Sciences in Chemistry, Biotechnology and Health</button>
            <button type="button" class="list-group-item list-group-item-action">School of Electrical Engineering and Computer Science</button>
            <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
            <button type="button" class="list-group-item list-group-item-action">Vestibulum at eros</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Home