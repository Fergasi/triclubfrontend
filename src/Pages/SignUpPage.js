import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser, loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";

const SignUpPage = ({ setIsAuthLoading, fromBecomeCoach }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div>
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
          setIsAuthLoading(true);
          const isUserRegistered = await signUpUser(email, password);
          if (isUserRegistered) {
            const isUserLoggedIn = await loginUser(email, password);
            if (isUserLoggedIn) {
              setIsAuthLoading(false);
              if (fromBecomeCoach) {
                console.log("in from coach block");
                navigate("/coach-registration");
              }
              if (!fromBecomeCoach) {
                navigate("/");
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
        Already have an account <Link to="/login">Log In</Link>
      </div>
    </div>
  );
};

export default SignUpPage;
