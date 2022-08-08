import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../Auth";
import { Button, Form } from "react-bootstrap";
import validateUser from "../Utils/Validation";

const LoginPage = ({ setIsAuthLoading, fromBecomeCoach }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailMssg, setEmailMssg] = useState("");
  const [passwordMssg, setPasswordMssg] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Form>
        <h2>Log In</h2>
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
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              console.log(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button
        variant="secondary"
        type="submit"
        id="login"
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
            setIsAuthLoading(true);
            const isUserLoggedIn = await loginUser(email, password);
            if (!isUserLoggedIn.success) {
              setEmailMssg(isUserLoggedIn.message);
            }
            if (isUserLoggedIn.success) {
              setIsAuthLoading(false);
              console.log(isUserLoggedIn);
              if (fromBecomeCoach) {
                navigate("/coach-registration");
              }
              if (!fromBecomeCoach) {
                navigate("/");
              }
            }
          }
        }}
      >
        Log in
      </Button>
      <br />
      <br />
      <div className="smallMessage">
        Dont have an account yet <Link to="/sign-up">Sign Up</Link>
      </div>
      <div className="mediumMessage">
        {emailMssg} <br /> {passwordMssg}
      </div>
    </div>
  );
};

export default LoginPage;
