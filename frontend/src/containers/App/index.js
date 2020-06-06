import React from "react";


import Nav from "../../components/Nav";
import Articles from "../Articles";
import Article from "../Article";
import Category from "../Category";
import Private from "../Private";

import { AuthContext } from "../../context/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from '../../PrivateRoute';
import Login from "../Login";
import Signup from '../Signup';

function App() {
  return (
    <div className="App">
      <AuthContext.Provider value={false}>
        <Router>
          <Nav />
          <Route path="/" component={Articles} exact />
          <Route path="/article/:id" component={Article} exact />
          <Route path="/category/:id" component={Category} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/private" component={Private} />
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
