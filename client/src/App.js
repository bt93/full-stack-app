import React, { Component } from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

// Component imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

// Style imports
import './styles/global.css';


class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <hr />

          <Switch>
            <Route exact path={"/"} component={Courses}/>
            <Route path={"/courses/:id"} component={CourseDetail} />
          </Switch>
        </div>
      </Router>
    );
    }
}

export default App;
