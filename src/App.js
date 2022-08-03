import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import UserHomePage from "./Pages/UserHomePage";
import AdminHomePage from "./Pages/AdminHomePage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import CoachRegistrationPage from "./Pages/CoachRegistrationPage";
import { useState } from "react";

// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <Routes>
          <Route
            path='/'
            element={
              <NavBar
                isAuthLoading={isAuthLoading}
                setIsAuthLoading={setIsAuthLoading}
              />
            }
          >
            <Route index element={<UserHomePage />} />
            <Route
              path='login'
              element={
                <LoginPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                />
              }
            />
            <Route
              path='registration'
              element={
                <RegistrationPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                />
              }
            />
            <Route
              path='coach-registration'
              element={
                <CoachRegistrationPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                />
              }
            />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
