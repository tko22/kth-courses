import React from 'react'
import { useHistory } from "react-router-dom";
import './Banner.css'
import { ModelContext } from '../../ModelContext'

class Banner extends React.Component {
  constructor(props){
    super(props);
    this.state = {searchInput: "Input"};
  }

  onSearchInputChange = e => {
    this.setState({ searchInput: e.target.value });
  }
  render(){
    
    return(
      <div id="header" class="header d-flex align-items-center justify-content-center container-fluid">
        <div class="row">
          <h1 class="display-4 mx-auto">COURSE RATE</h1>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2" onChange={this.onSearchInputChange} value={this.state.searchInput}/>
            <div class="input-group-append">
              <button class="btn btn-dark" type="button" onClick={Search()}></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function Search() {
  useSearch();
  return null;
}
function useSearch() {
  let history = useHistory();
  history.push(`/search/${this.state.searchInput}`);
}
Banner.contextType = ModelContext;
export default Banner