import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link, useSearchParams } from "react-router-dom";
import NavBar from "./Components/NavBar";
import UserHomePage from "./Pages/UserHomePage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import CoachRegistrationPage from "./Pages/CoachRegistrationPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AdminDashboard from "./Pages/AdminDashboard";
import CoachDashboard from "./Pages/CoachDashboard";
import { useAuth } from "./Hooks/Auth";
import "./App.css";

//Checks whether a user is an Admin before allowing access to Admin routes
const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { verifyAdmin } = useAuth();

  useEffect(() => {
    const isAdminCheck = async () => {
      const isAdmin = await verifyAdmin();
      setIsAdmin(isAdmin);
    };
    isAdminCheck();
  }, []); // This useEffect will trigger once when the user tries to visit /admin

  return (
    <div>
      {!isAdmin && <h3>You Must Be An Admin To View This Page. Sorry.</h3>}
      {isAdmin && <Outlet />}
    </div>
  );
};

//Checks whether a user is a Coach before allowing access to Coach routes
const CoachLayout = () => {
  const [isCoach, setIsCoach] = useState(false);
  const { verifyCoach } = useAuth();

  useEffect(() => {
    const isCoachCheck = async () => {
      const isCoach = await verifyCoach();
      setIsCoach(isCoach);
    };
    isCoachCheck();
  }, []); // This useEffect will trigger once when the user tries to visit /admin

  return (
    <div>
      {!isCoach && <h3>You Must Be A Coach To View This Page. Sorry.</h3>}
      {isCoach && <Outlet />}
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
      {!isResetPassTokValid && (
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
      {isResetPassTokValid && <Outlet context={rpt} />}
    </div>
  );
};

function App() {
  const [fromPageToPage, setFromPageToPage] = useState("");

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
                <CoachRegistrationPage setFromPageToPage={setFromPageToPage} />
              }
            />
            <Route
              path="forgot-password"
              element={<ForgotPasswordPage></ForgotPasswordPage>}
            />
            <Route path="reset-password/*" element={<ResetPasswordLayout />}>
              <Route index element={<ResetPasswordPage />} />
            </Route>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path="coach" element={<CoachLayout />}>
              <Route index element={<CoachDashboard />} />
            </Route>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
