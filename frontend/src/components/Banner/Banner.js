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

  search = () => {
    this.props.history.push(`/search/${this.state.searchInput}`);
  }
  render() {

    return (
      <div id="header" className="header d-flex align-items-center justify-content-center container-fluid">
        <div className="row">
          <h1 className="display-4 mx-auto"><Link className="header-banner" to="/">KTH COURSE RATE</Link></h1>
          <Link to="/profile"><button type="button" className="btn btn-light">Profile</button></Link>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search Courses with Keywords" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onSearchInputChange} value={this.state.searchInput} />
            <div className="input-group-append">
              <button className="btn btn-dark" type="button" onClick={this.search}>Search</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
Banner.contextType = ModelContext;
export default withRouter(Banner)