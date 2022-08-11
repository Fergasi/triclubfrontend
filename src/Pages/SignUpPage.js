import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";
import { Button, Form } from "react-bootstrap";
import { validateUser } from "../Utils/Validation";

const SignUpPage = ({ fromPageToPage }) => {
  const { loginUser, signUpUser } = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailMssg, setEmailMssg] = useState("");
  const [passwordMssg, setPasswordMssg] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      {console.log("TOP from become coach ... ", fromPageToPage)}
      <Form>
        <h2>Create Account</h2>
        <br />
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
      </Form>

      <Button
        variant="secondary"
        type="submit"
        id="signup"
        onClick={async () => {
          const validateUserObj = validateUser({
            email: email,
            password: password,
          });

          if (validateUserObj.isValid === false) {
            setEmailMssg(validateUserObj.emailMssg);
            setPasswordMssg(validateUserObj.passwordMssg);
          }

          if (validateUserObj.isValid === true) {
            setEmailMssg("");
            setPasswordMssg("");
            const isUserRegistered = await signUpUser(email, password);

            if (!isUserRegistered.success) {
              setEmailMssg(isUserRegistered.message);
            }
            if (isUserRegistered.success) {
              const isUserLoggedIn = await loginUser(email, password);
              console.log("from page ... ", fromPageToPage);
              if (isUserLoggedIn) {
                navigate(fromPageToPage);
              }
            }
          }
        }}
      >
        Sign Up
      </Button>
      <br />
      <br />
      <div className="smallMessage">
        Already have an account? <Link to="/login"> Log In</Link>
      </div>
      <br />
      <div className="mediumMessage">
        {emailMssg} <br /> {passwordMssg}
      </div>
    </div>
  );
};

export default SignUpPage;
