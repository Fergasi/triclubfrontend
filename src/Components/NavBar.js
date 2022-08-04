import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { getUserToken, logoutUser } from "../Auth";
import { Navbar, Nav, Button } from "react-bootstrap";
import TriClubLogo from "../assets/TriClub.png";

const NavBar = ({ isAuthLoading, setIsAuthLoading }) => {
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = getUserToken();
    setUserToken(userToken);
  }, [isAuthLoading]);

  return (
    <>
      <Navbar
        collaspeonselect='true'
        expand='sm'
        bg='dark'
        variant='dark'
        fixed='top'
      >
        <Navbar.Brand>
          TriClub{" "}
          <img
            src={TriClubLogo}
            alt=''
            width='40'
            height='40'
            className='d-inline-block align-middle'
          />{" "}
        </Navbar.Brand>
        {!userToken && (
          <>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav>
                <Nav.Link href='/'>Programs</Nav.Link>{" "}
                <Nav.Link href='/coach-registration'>Become a Coach</Nav.Link>{" "}
                <Nav.Link href='/login'>Login</Nav.Link>{" "}
                <Nav.Link href='/sign-up'>Sign Up</Nav.Link>{" "}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
        {userToken && (
          <div id='footer'>
            <span>
              <strong id='loginMsg'></strong>
            </span>
            <br />
            <Button
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
            </Button>
          </div>
        )}
      </Navbar>

      <Outlet />
      <br />
    </>
  );
};

export default NavBar;
