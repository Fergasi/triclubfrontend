import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser, loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";

const SignUpPage = ({ setIsAuthLoading }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form>
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
          <Form.Text className='text-muted'>
            We'll never share your email with anyone
          </Form.Text>
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
        variant='primary'
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
      {/* 
      <br />
      <br />
      <br />
      <h3>Sign Up</h3>
      <br />
      <label>Username: </label>
      <input
        type='text'
        value={username}
        onChange={(event) => {
          const newUsername = event.target.value;
          setUsername(newUsername);
        }}
      ></input>
      <br />
      <br />
      <label>Password: </label>
      <input
        type='password'
        value={password}
        onChange={(event) => {
          const newPassword = event.target.value;
          setPassword(newPassword);
        }}
      ></input>
      <br />
      <br />
      <button
        id='signup'
        type='submit'
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
      </button> */}
    </div>
  );
};

export default SignUpPage;
