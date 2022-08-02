import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Auth";

const LoginPage = ({ setIsAuthLoading }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <br />
      <br />
      <br />
      <h3>Login</h3>
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
        id='login'
        type='submit'
        onClick={async () => {
          setIsAuthLoading(true);
          const isUserLoggedIn = await loginUser(username, password);
          if (isUserLoggedIn) {
            setIsAuthLoading(false);
            navigate("/");
          } else {
            alert("Username or password are incorrect");
          }
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
