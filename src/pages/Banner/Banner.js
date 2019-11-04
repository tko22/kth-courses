import React from 'react'
import './Banner.css'
const Banner = () => (
  <div id="header" class="header d-flex align-items-center justify-content-center container-fluid">
    <div class="row">
      <h1 class="display-4 mx-auto">COURSE RATE</h1>
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Input" aria-label="Input" aria-describedby="basic-addon2"/>
        <div class="input-group-append">
          <button class="btn btn-dark" type="button">Search</button>
        </div>
      </div>
    </div>
  </div>
)

export default Banner