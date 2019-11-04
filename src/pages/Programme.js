import React from 'react'
import { Link } from 'react-router-dom';

class Programme extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="container-fluid">
        <h1>
          Programme: {this.props.match.params.type}
        </h1>
        <div class="row">
          <div class="list-group mx-auto">
            <Link to="/course/c1"><button type="button" class="list-group-item list-group-item-action">Course 1</button></Link>
            <button type="button" class="list-group-item list-group-item-action">Course 2</button>
            <button type="button" class="list-group-item list-group-item-action">Civil and Architectural Engineering</button>
            <button type="button" class="list-group-item list-group-item-action">Porta ac consectetur ac</button>
            <button type="button" class="list-group-item list-group-item-action">Vestibulum at eros</button>
          </div>
        </div>
    </div>
    )
  }
}

export default Programme