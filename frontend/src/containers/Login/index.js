import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { Card, Logo, Form, Input, Button, Error } from '../../components/AuthForms';
import { useAuth } from "../../context/auth";

function Login(props) {
  console.log(props)
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens } = useAuth();

  function postLogin() {
    axios.post("https://strapi-upload.herokuapp.com", {
      identifier,
      password
    }).then(result => {
      if (result.status === 200) {
        setAuthTokens(result.data);
        setLoggedIn(true);
      } else {
        setIsError(true);
      }
    }).catch(e => {
      setIsError(true);
    });
  }

  function logOut() {
    setAuthTokens(false);
    localStorage.removeItem('token');
  }

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));

  // if (isLoggedIn) {
  //   return <Redirect to="/" />;
  // }

  return (
    <Card>
      <Logo src='https://strapi.io/assets/strapi-logo-light.png' />
      {
        existingTokens ? <Button onClick={logOut}>Log out</Button> : <Form>
          <Input
            type="identifier"
            value={identifier}
            onChange={e => {
              setIdentifier(e.target.value);
            }}
            placeholder="email"
          />
          <Input
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            placeholder="password"
          />
          <Button onClick={postLogin}>Sign In</Button>
        </Form>
      }
      <Link to="/signup">Don't have an account?</Link>
        { isError &&<Error>The username or password provided were incorrect!</Error> }
    </Card>
  );
}

export default Login;