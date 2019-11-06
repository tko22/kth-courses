import React from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home/Home'
import SelectProgram from './pages/School'
import Programme from './pages/Programme'
import Course from './pages/Course';
import Banner from './pages/Banner/Banner';
import modelInstance from "./data/CourseModel";
import { ModelContext } from "./ModelContext"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner/>
        {/* We rended diffrent component based on the path */}
        <ModelContext.Provider value={{ model: modelInstance }}>
          <Route exact path="/" component={Home} />
          <Route path="/school/:type" component={SelectProgram} />
          <Route path="/programme/:type" component={Programme}/>
          <Route path="/course/:id" component={Course} />
        </ModelContext.Provider>
      </header>
    </div>
  );
}

export default App;
