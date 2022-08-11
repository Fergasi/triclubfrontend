import React, { useState } from "react";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { validatePassword } from "../Utils/Validation";
import { resetPassword } from "../Hooks/Auth";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [passwordMssg, setPasswordMssg] = useState("");
  const rpt = useOutletContext();
  const navigate = useNavigate();
  return (
    <div>
      <Form>
        <h2>Reset Password</h2>
        <br />
        <br />
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>
      </Form>
      <Button
        variant='secondary'
        type='submit'
        onClick={async () => {
          const validatePasswordObj = validatePassword(password);

          if (validatePasswordObj.isValid === false) {
            setPasswordMssg(validatePasswordObj.passwordMssg);
            return;
          }

          if (validatePasswordObj.isValid === true) {
            setPasswordMssg("");
            const isPasswordReset = await resetPassword(rpt, password);
            if (isPasswordReset.success) {
              navigate("/login");
              return;
            }
            setPasswordMssg(isPasswordReset.message);
            return;
          }
        }}
      >
        Submit
      </Button>
      <br />
      <br />
      <div className='mediumMessage'>{passwordMssg}</div>
    </div>
  );
};

export default ResetPasswordPage;
