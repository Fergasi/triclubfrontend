import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import TriClubLogo from "../assets/TriClub.png";
import { useAuth } from "../Hooks/Auth";

const NavBar = () => {
  const {
    userToken,
    logoutUser,
    setFromBecomeCoach,
    isAdminLoginCheck,
    isCoachLoginCheck,
  } = useAuth();
  const navigate = useNavigate();
  console.log("adminLoginCheck: " + isAdminLoginCheck);
  return (
    <>
      <Navbar collapseOnSelect expand='sm' bg='dark' variant='dark' fixed='top'>
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

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <div className='nav-links'>
              <LinkContainer to='/'>
                <Nav.Link>Programs</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/coach-registration'>
                <Nav.Link>Become a Coach</Nav.Link>
              </LinkContainer>
              {!userToken && (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/sign-up'>
                    <Nav.Link>Sign Up</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </div>
            {userToken && isAdminLoginCheck && (
              <>
                <LinkContainer to='/admin'>
                  <Nav.Link>Admin Dashboard</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userToken && isCoachLoginCheck && (
              <>
                <LinkContainer to='/coach'>
                  <Nav.Link>Coach Dashboard</Nav.Link>
                </LinkContainer>
              </>
            )}
            {userToken && (
              <div className='nav-logout'>
                <Button
                  variant='secondary'
                  onClick={async () => {
                    const logoutSuccess = await logoutUser();
                    if (logoutSuccess) {
                      setFromBecomeCoach(false);
                      navigate("/");
                    }
                  }}
                >
                  Logout
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Outlet />
      <br />
    </>
  );
};

export default NavBar;
