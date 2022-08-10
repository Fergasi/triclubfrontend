import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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

function App() {
  const [fromBecomeCoach, setFromBecomeCoach] = useState(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <Routes>
          <Route
            path='/'
            element={<NavBar setFromBecomeCoach={setFromBecomeCoach} />}
          >
            <Route index element={<UserHomePage />} />
            <Route
              path='login'
              element={<LoginPage fromBecomeCoach={fromBecomeCoach} />}
            />
            <Route
              path='sign-up'
              element={<SignUpPage fromBecomeCoach={fromBecomeCoach} />}
            />
            <Route
              path='coach-registration'
              element={
                <CoachRegistrationPage
                  setFromBecomeCoach={setFromBecomeCoach}
                />
              }
            />
            <Route
              path='forgot-password'
              element={<ForgotPasswordPage></ForgotPasswordPage>}
            />
            <Route
              path='reset-password/*'
              element={<ResetPasswordPage></ResetPasswordPage>}
            />
            <Route path='admin' element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
            <Route path='coach' element={<CoachLayout />}>
              <Route index element={<CoachDashboard />} />
            </Route>
          </Route>
        </Routes>
      </header>
    </div>
  );
}

export default App;
