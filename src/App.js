import React from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home'
import SelectProgram from './pages/SelectProgram'
import Course from './pages/Course';


import './App.css';

function App() {
  return (
    <div className="App">

      <Route exact path="/" component={Home} />
      <Route
        path="/programme"
        component={SelectProgram}
      />
      <Route path="/programme/:type" component={SpecificDish} />
      <Route path="/course/:id" component={Course} />
    </div>
  );
}

export default App;
