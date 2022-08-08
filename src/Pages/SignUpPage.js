import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUpUser, loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";

const SignUpPage = ({ setIsAuthLoading, fromBecomeCoach }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [missingEmailMssg, setMissingEmailMssg] = useState("");
  const [missingPassword, setMissingPasswordMssg] = useState("");
  const [userValid, setUserValid] = useState(false);
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
          setUserValid(true);
          setMissingEmailMssg("");
          setMissingPasswordMssg("");
          console.log(email);
          if (!email.includes("@")) {
            setMissingEmailMssg("Valid email required.");
            setUserValid(false);
          }
          if (password === "") {
            setMissingPasswordMssg("Please include a password.");
            console.log("does not include block");
            setUserValid(false);
          }
          if (userValid) {
            setIsAuthLoading(true);
            const isUserRegistered = await signUpUser(email, password);
            if (isUserRegistered) {
              const isUserLoggedIn = await loginUser(email, password);
              if (isUserLoggedIn) {
                setIsAuthLoading(false);
                if (fromBecomeCoach) {
                  navigate("/coach-registration");
                }
                if (!fromBecomeCoach) {
                  navigate("/");
                }
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
      <div className="mediumMessage">
        {missingEmailMssg}
        <br />
        {missingPassword}
      </div>
    </div>
  );
};

export default SignUpPage;
