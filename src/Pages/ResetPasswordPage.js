import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { validatePassword } from "../Utils/Validation";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordMssg, setPasswordMssg] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Form>
        <h2>Reset Password</h2>
        <br />
        <br />
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
        onClick={async () => {
          const validatePasswordObj = validatePassword(password);

          if (validatePasswordObj.isValid === false) {
            setPasswordMssg(validatePasswordObj.passwordMssg);
          }

          if (validatePasswordObj.isValid === true) {
            setPasswordMssg("");
          }
        }}
      >
        Submit
      </Button>
      <br />
      <br />
      <div className="mediumMessage">{passwordMssg}</div>
    </div>
  );
};

export default ResetPasswordPage;
