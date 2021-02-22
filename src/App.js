import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignInScreen from "./SignIn";
import { AuthProvider } from "./Auth";
import {Hero, Navbar, CompanyLocation, About, Contact} from './components/index'
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
        <Navbar />
          <PrivateRoute exact path="/order" component={CompanyLocation} />
          <Route exact path='/' component={Hero} />
          <Route exact path='/home' component={Hero} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path="/login" component={SignInScreen} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;