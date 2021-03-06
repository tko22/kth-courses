import React from 'react';
import { Route } from "react-router-dom";
import Listed from './pages/Listed/Listed'
import Course from './pages/Course/Course';
import Banner from './components/Banner/Banner';
import Search from './pages/Search/Search';
import modelInstance from "./data/CourseModel";
import { ModelContext } from "./ModelContext"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Banner />
        {/* We rended diffrent component based on the path */}
        <ModelContext.Provider value={{ model: modelInstance }}>
          <Route exact path="/" component={Listed} />
          <Route path="/school/:code/:name" component={Listed} />
          <Route path="/department/:code/:schoolCode/:name" component={Listed} />
          <Route path="/search/:input" component={Search} />
          <Route path="/course/:code" component={Course} />
          <Route path="/profile" component={Listed} />
        </ModelContext.Provider>
      </header>
    </div>
  );
}

export default App;
