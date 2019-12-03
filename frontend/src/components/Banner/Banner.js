import React from 'react'
import { withRouter } from 'react-router-dom'
import './Banner.css'
import { ModelContext } from '../../ModelContext'
import { Link } from "react-router-dom"

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: "" };
  }

  onSearchInputChange = e => {
    this.setState({ searchInput: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
        this.search(); 
    }
  }

  search = () => {
    this.props.history.push(`/search/${this.state.searchInput}`);
  }
  render() {

    return (
      <div className="row">
        <div className="container">
          <ul class="nav justify-content-center">
            <li class="nav-item">
              <a class="nav-item nav-link active"onClick={() => this.props.history.push("/")}>Home<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-item nav-link" onClick={() => this.props.history.push("/profile")}>Profile</a>
            </li>
          </ul>
        </div>
          <div id="header" className="header d-flex align-items-center justify-content-center container-fluid">
            <div className="row">
              <h1 className="display-4 mx-auto">KTH COURSE RATE</h1>            
              <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search Courses with Keywords" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onSearchInputChange} value={this.state.searchInput} onKeyUp={this.handleKeyPress.bind(this)}/>
                <div className="input-group-append">
                  <button className="btn btn-dark" type="button" onClick={this.search}>Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
Banner.contextType = ModelContext;
export default withRouter(Banner)