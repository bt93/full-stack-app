import React from 'react';
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom';
// Style imports
import './styles/global.css';

// Component imports
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

// Context import
import withContext from './Context';

// Components with Context
const UserSignUpWithContext = withContext(UserSignUp);


export default () => (
      <Router>
        <div className="App">
          <Header />
          <hr />

          <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUpWithContext} />
            <Route path="/signout" component={UserSignOut} />
          </Switch>
        </div>
      </Router>
);