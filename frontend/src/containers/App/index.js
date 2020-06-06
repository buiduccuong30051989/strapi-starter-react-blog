import React, { useState } from "react"


import Nav from "../../components/Nav";
import Articles from "../Articles";
import Article from "../Article";
import Category from "../Category";
import Private from "../Private";
import PublicHome from '../PublicHome';

import { AuthContext } from "../../context/auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from '../../PrivateRoute';
import Login from "../Login";
import Signup from '../Signup';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Nav />
          <Route path="/" component={PublicHome} exact />
          <PrivateRoute path="/article/:id" component={Article} exact />
          <PrivateRoute path="/category/:id" component={Category} exact />
          <PrivateRoute path="/articles" component={Articles} exact />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/private" component={Private} />
        </Router>
        </AuthContext.Provider>
    </div>
  );
}

export default App;
