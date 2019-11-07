import React from 'react';
import { Route } from "react-router-dom";
import Home from './pages/Home/Home'
import School from './pages/School/School'
import Department from './pages/Department/Department'
import Course from './pages/Course/Course';
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
          <Route path="/school/:code/:name" component={School} />
          <Route path="/department/:code/:schoolCode/:name" component={Department}/>
          <Route path="/course/:code" component={Course} />
        </ModelContext.Provider>
      </header>
    </div>
  );
}

export default App;
