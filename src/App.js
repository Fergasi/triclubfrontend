import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import UserHomePage from "./Pages/UserHomePage";
// import AdminHomePage from "./Pages/AdminHomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CoachRegistrationPage from "./Pages/CoachRegistrationPage";
import { useState } from "react";
import ResetPasswordPage from "./Pages/ResetPasswordPage";

function App() {
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [fromBecomeCoach, setFromBecomeCoach] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={
              <NavBar
                isAuthLoading={isAuthLoading}
                setIsAuthLoading={setIsAuthLoading}
                setFromBecomeCoach={setFromBecomeCoach}
              />
            }
          >
            <Route index element={<UserHomePage />} />
            <Route
              path="login"
              element={
                <LoginPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                  fromBecomeCoach={fromBecomeCoach}
                />
              }
            />

            <Route
              path="sign-up"
              element={
                <SignUpPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                  fromBecomeCoach={fromBecomeCoach}
                />
              }
            />

            <Route
              path="coach-registration"
              element={
                <CoachRegistrationPage
                  isAuthLoading={isAuthLoading}
                  setIsAuthLoading={setIsAuthLoading}
                  setFromBecomeCoach={setFromBecomeCoach}
                />
              }
            />

            <Route
              path="forgot-password"
              element={<ForgotPasswordPage></ForgotPasswordPage>}
            />

            <Route
              path="reset-password/*"
              element={<ResetPasswordPage></ResetPasswordPage>}
            />
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
