import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link, useSearchParams } from "react-router-dom";
import NavBar from "./Components/NavBar";
import UserHomePage from "./Pages/UserHomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CoachRegistrationPage from "./Pages/CoachRegistrationPage";
import ProgramDetailsPage from "./Pages/ProgramDetailsPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import CreateProgramPage from "./Pages/CreateProgramPage";
import ManageProgramsPage from "./Pages/ManageProgramsPage";
import ProgramSchedulePage from "./Pages/ProgramSchedulePage";
import CoachApplicationsPage from "./Pages/CoachApplicationsPage";
import ProgramRegisterPage from "./Pages/ProgramRegisterPage";

import { useAuth } from "./Hooks/Auth";
import "./App.css";

//Checks whether a user is an Admin before allowing access to Admin routes
const AdminLayout = () => {
  const { verifyAdmin, isAdminLoginCheck, setIsAdminLoginCheck } = useAuth();

  useEffect(() => {
    const isAdminCheck = async () => {
      const isAdmin = await verifyAdmin();
      setIsAdminLoginCheck(isAdmin);
    };
    isAdminCheck();
  }, []); // This useEffect will trigger once when the user tries to visit /admin

  return (
    <div>
      {isAdminLoginCheck ? (
        <Outlet />
      ) : (
        <h3>You Must Be An Admin To View This Page. Sorry.</h3>
      )}
    </div>
  );
};

//Checks whether a user is a Coach before allowing access to Coach routes
const CoachLayout = () => {
  const { verifyCoach, isCoachLoginCheck, setIsCoachLoginCheck } = useAuth();

  useEffect(() => {
    const isCoachCheck = async () => {
      const isCoach = await verifyCoach();
      setIsCoachLoginCheck(isCoach);
    };
    isCoachCheck();
  }, []); // This useEffect will trigger once when the user tries to visit /admin

  return (
    <div>
      {isCoachLoginCheck ? (
        <Outlet />
      ) : (
        <h3>You Must Be An Coach To View This Page. Sorry.</h3>
      )}
    </div>
  );
};

//Checks whether Reset Password Token is valid allowing access to Reset Password routes
const ResetPasswordLayout = () => {
  const [isResetPassTokValid, setIsResetPassTokValid] = useState(false);
  const { verifyResetPassTok } = useAuth();
  const [searchParams] = useSearchParams();
  let rpt = searchParams.get("rpt");

  useEffect(() => {
    const resetPassTokCheck = async () => {
      const resetPassTokObj = await verifyResetPassTok(rpt);
      setIsResetPassTokValid(resetPassTokObj.success);
    };
    resetPassTokCheck();
  }, []); // This useEffect will trigger once when the user tries to visit /reset-password

  return (
    <div>
      {isResetPassTokValid ? (
        <Outlet context={rpt} />
      ) : (
        <>
          <h3>
            Your Password Reset Token is either Invalid or Expired.
            <br /> <br />
            Please Try Again.
          </h3>
          <br />
          <br />
          <div className="smallMessage">
            Forgot your password?{" "}
            <Link to="/forgot-password"> Forgot Password</Link>
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  const [fromPageToPage, setFromPageToPage] = useState("/");

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={<NavBar setFromPageToPage={setFromPageToPage} />}
          >
            <Route index element={<UserHomePage />} />
            <Route
              path="login"
              element={<LoginPage fromPageToPage={fromPageToPage} />}
            />
            <Route
              path="sign-up"
              element={<SignUpPage fromPageToPage={fromPageToPage} />}
            />
            <Route
              path="coach-registration"
              element={
                <CoachRegistrationPage
                  setFromPageToPage={setFromPageToPage}
                  fromPageToPage={fromPageToPage}
                />
              }
            />
            <Route path="program-register" element={<ProgramRegisterPage />} />
            <Route
              path="program-details"
              element={
                <ProgramDetailsPage setFromPageToPage={setFromPageToPage} />
              }
            />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/*" element={<ResetPasswordLayout />}>
              <Route index element={<ResetPasswordPage />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="create-program" element={<CreateProgramPage />} />
              <Route path="manage-programs" element={<ManageProgramsPage />} />
              <Route
                path="program-schedule"
                element={<ProgramSchedulePage />}
              />
              <Route
                path="coach-applications"
                element={<CoachApplicationsPage />}
              />
            </Route>
            <Route path="coach" element={<CoachLayout />}>
              <Route path="create-program" element={<CreateProgramPage />} />
              <Route path="manage-programs" element={<ManageProgramsPage />} />
              <Route
                path="program-schedule"
                element={<ProgramSchedulePage />}
              />
            </Route>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
