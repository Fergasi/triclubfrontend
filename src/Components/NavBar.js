import { Outlet, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, NavDropdown, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import TriClubLogo from "../assets/TriClub.png";
import { useAuth } from "../Hooks/Auth";
import ppSample from "../assets/default-user-icon-13.jpeg";

const NavBar = ({ setFromPageToPage }) => {
  const { userToken, logoutUser, isAdminLoginCheck, isCoachLoginCheck } =
    useAuth();
  const navigate = useNavigate();

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
              {!isCoachLoginCheck && !isAdminLoginCheck && (
                <LinkContainer to='/coach-registration'>
                  <Nav.Link>Become a Coach</Nav.Link>
                </LinkContainer>
              )}
              {userToken && isAdminLoginCheck && (
                <NavDropdown
                  title='Admin Dashboard'
                  className='collapsible-nav-dropdown bg-dark'
                >
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/admin/coach-applications'>
                      <Nav.Link>Coach Applications</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/admin/create-program'>
                      <Nav.Link>Create Program</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/admin/manage-programs'>
                      <Nav.Link>Manage Programs</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/admin/program-schedule'>
                      <Nav.Link>Schedule</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {userToken && isCoachLoginCheck && (
                <NavDropdown
                  title='Coach Dashboard'
                  className='collapsible-nav-dropdown bg-dark'
                >
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/coach/create-program'>
                      <Nav.Link>Create Program</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/coach/manage-programs'>
                      <Nav.Link>Manage Programs</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as='span'>
                    <LinkContainer to='/coach/program-schedule'>
                      <Nav.Link>Schedule</Nav.Link>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </div>

            {!userToken && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: "10px",
                }}
              >
                <LinkContainer to='/login'>
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/sign-up'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </div>
            )}

            {userToken && (
              <NavDropdown
                className='nav-logout'
                id='profileDropdown'
                title={
                  <div id='profilePic'>
                    <Image
                      className='thumbnail-image'
                      src={ppSample}
                      alt='user pic'
                      roundedCircle
                    />
                  </div>
                }
              >
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as='span'>
                  <Button
                    variant='dark'
                    onClick={async () => {
                      const logoutSuccess = await logoutUser();
                      if (logoutSuccess) {
                        setFromPageToPage("/");
                        navigate("/");
                      }
                    }}
                  >
                    Logout
                  </Button>
                </NavDropdown.Item>
              </NavDropdown>
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
