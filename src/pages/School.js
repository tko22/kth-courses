import React from 'react'
import { Link } from 'react-router-dom';

class SelectProgram extends React.Component {
  constructor(props) {
    super(props)
    
  }

  render() {
    console.log(this.props)
    return (
      
      <div class="container-fluid">
        <h1>
        School: {this.props.match.params.type}
        </h1>
        <div class="row">
          <div class="list-group mx-auto">
            <Link to="/programme/light"><button type="button" class="list-group-item list-group-item-action">Architectural Lighting Design (One year)</button></Link>
            <button type="button" class="list-group-item list-group-item-action">Architecture</button>
            <button type="button" class="list-group-item list-group-item-action">Civil and Architectural Engineering</button>
            <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
            <button type="button" class="list-group-item list-group-item-action">Vestibulum at eros</button>
          </div>
        </div>
    </div>
    )
  }
}

export default SelectProgram