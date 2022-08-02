import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth";

const NavBar = ({ isAuthLoading, setIsAuthLoading }) => {
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getUserToken();
    setUserToken(userToken);
  }, [isAuthLoading]);

  return (
    <div>
      <header>
        <nav>
          <div>
            {!userToken && (
              <>
                <div>
                  <Link id='navItem' to='/'>
                    Home
                  </Link>
                </div>
                <div>
                  <Link id='navItem' to='/login'>
                    Login
                  </Link>
                </div>
                <div>
                  <Link id='navItem' to='/registration'>
                    Registration
                  </Link>
                </div>
              </>
            )}

            {userToken && (
              <div id='footer'>
                <span>
                  <strong id='loginMsg'></strong>
                </span>
                <br />
                <button
                  onClick={async () => {
                    setIsAuthLoading(true);
                    const logoutSuccess = await logoutUser();
                    if (logoutSuccess) {
                      setIsAuthLoading(false);
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
      <Outlet />
      <br />
    </div>
  );
};

export default NavBar;
