import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Auth";

const RegistrationPage = ({ setIsAuthLoading }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <br />
      <br />
      <h3>Registration</h3>
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
          const isUserRegistered = await registerUser(username, password);
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
      </button>
    </div>
  );
};

export default RegistrationPage;
