import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { validateEmail } from "../Utils/Validation";
import { forgotPassword } from "../Hooks/Auth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailMssg, setEmailMssg] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Form>
        <h2>Forgot Password</h2>
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
      </Form>
      <Button
        variant="secondary"
        type="submit"
        onClick={async () => {
          const validateEmailObj = validateEmail(email);

          if (validateEmailObj.isValid === false) {
            setEmailMssg(validateEmailObj.emailMssg);
          }

          if (validateEmailObj.isValid === true) {
            setEmailMssg("");
            const serverRes = await forgotPassword(email);
            setEmailMssg(serverRes.message);
            // *** DO SOME STUFF - LIKE HIT THE BACKEND FOR RESET PASSWORD URL - SHOW MESSAGE SUCCESS OR FAIL ***
          }
        }}
      >
        Submit
      </Button>
      <br />
      <br />
      <div className="smallMessage">
        Already have an account? <Link to="/login"> Log In</Link>
      </div>
      <div className="smallMessage">
        Don't have an account yet? <Link to="/sign-up"> Sign Up</Link>
      </div>
      <br />
      <div className="mediumMessage">{emailMssg}</div>
    </div>
  );
};

export default ForgotPasswordPage;
