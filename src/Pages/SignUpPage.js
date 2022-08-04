import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser, loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";

const SignUpPage = ({ setIsAuthLoading }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form>
        <h2>Create Account</h2>
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
            }}
          />
        </Form.Group>
      </Form>

      <Button
        variant='secondary'
        type='submit'
        id='signup'
        onClick={async () => {
          setIsAuthLoading(true);
          const isUserRegistered = await signUpUser(username, password);
          if (isUserRegistered) {
            const isUserLoggedIn = await loginUser(username, password);
            if (isUserLoggedIn) {
              setIsAuthLoading(false);
              navigate("/");
            }
          }
        }}
      >
        Sign Up
      </Button>
      <br />
      <br />
      <div className='smallMessage'>
        Already have an account <Link to='/login'>Log In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
