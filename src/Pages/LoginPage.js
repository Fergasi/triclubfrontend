import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";

const LoginPage = ({ setIsAuthLoading }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form>
        <h2>Log In</h2>
        <br />
        <br />
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={username}
            onChange={(event) => {
              const newUsername = event.target.value;
              setUsername(newUsername);
            }}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => {
              const newPassword = event.target.value;
              setPassword(newPassword);
              console.log(newPassword);
            }}
          />
        </Form.Group>
      </Form>
      <Button
        variant='primary'
        type='submit'
        id='login'
        onClick={async () => {
          setIsAuthLoading(true);
          const isUserLoggedIn = await loginUser(username, password);
          if (isUserLoggedIn) {
            setIsAuthLoading(false);
            navigate("/");
          } else {
            alert("Username or password are incorrect");
          }
        }}
      >
        Log in
      </Button>
      <br />
      <br />
      <div className='smallMessage'>
        Dont have an account yet <Link to='/sign-up'>Sign Up</Link>
      </div>
    </div>
  );
};

export default LoginPage;
