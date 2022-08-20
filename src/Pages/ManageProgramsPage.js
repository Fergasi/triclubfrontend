import React, { useState, useEffect } from "react";
import { ListGroup, Button, Offcanvas, Image, Alert } from "react-bootstrap";
import { getPendingCoaches } from "../Hooks/Users.js";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseFill } from "react-icons/ri";
// import { acceptDenyPendingCoaches } from "../Hooks/Users.js";
// import CreateProgramPage from "./CreateProgramPage.js";
import { getAllPrograms } from "../Hooks/Programs.js";
import { deleteProgram } from "../Hooks/Programs.js";

const ManageProgramsPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [allPrograms, setAllPrograms] = useState([]);
  const [programChange, setProgramChange] = useState(false);

  useEffect(() => {
    const getPrograms = async () => {
      const programs = await getAllPrograms();
      setAllPrograms(programs.programs);
    };
    getPrograms();
  }, [programChange]);

  console.log(allPrograms);

  return (
    <>
      <h2>Manage Programs</h2>
      <br />
      {allPrograms.length > 0 && (
        <ListGroup xs={1} md={1} id='applicantList'>
          {allPrograms.map((program, idx) => (
            <ListGroup.Item key={idx} id='listItems'>
              <a>{program.programName}</a>
              <div>
                <Button
                  variant='secondary'
                  onClick={() => {
                    setProgramChange(true);
                    handleShow();
                    setProgramChange(false);
                  }}
                >
                  Edit
                </Button>
                &nbsp;
                <Button
                  variant='danger'
                  onClick={() => {
                    setProgramChange(true);
                    deleteProgram(program.uid);
                    setProgramChange(false);
                  }}
                >
                  Delete
                </Button>
              </div>

              <Offcanvas
                show={show}
                onHide={handleClose}
                id='offCanvas'
                backdrop={false}
              >
                <Offcanvas.Header id='offcanvasHeaderFixed' closeButton>
                  {/* <Offcanvas.Title></Offcanvas.Title>
                  <h2 id='offcanvasHeaderName'>
                    {coach.coachInfo.firstName + " " + coach.coachInfo.lastName}
                  </h2> */}
                </Offcanvas.Header>
                {/* <Offcanvas.Body>
                  <div id='OffcanvasHeader'>
                    <Image
                      id='OffcanvasImage'
                      src={coach.coachInfo.photo.file}
                    ></Image>
                  </div>
                  <br />
                  <div className='coachProfContainer'>
                    <div className='coachProficiency'>
                      <h5 className='coachProfTitle'>Swim</h5>
                      {coach.coachInfo.coachProficiency.swim ? (
                        <FcCheckmark className='FcCheckmark' />
                      ) : (
                        <RiCloseFill className='RiCloseFill' />
                      )}
                    </div>
                    <div className='coachProficiency'>
                      <h5 className='coachProfTitle'>Bike</h5>
                      {coach.coachInfo.coachProficiency.bike ? (
                        <FcCheckmark className='FcCheckmark' />
                      ) : (
                        <RiCloseFill className='RiCloseFill' />
                      )}
                    </div>
                    <div className='coachProficiency'>
                      <h5 className='coachProfTitle'>Run</h5>
                      {coach.coachInfo.coachProficiency.run ? (
                        <FcCheckmark className='FcCheckmark' />
                      ) : (
                        <RiCloseFill className='RiCloseFill' />
                      )}
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className='offcanvasText'>
                    <h5>About</h5>
                    <a>{coach.coachInfo.about}</a>
                  </div>
                  <br />
                  <br />
                  <div className='offcanvasText'>
                    <h5>Contact</h5>
                    <div className='offcanvasTextLineItem'>
                      Phone Number:
                      <a href={`tel:${coach.coachInfo.telephone}`}>
                        {coach.coachInfo.telephone}
                      </a>
                    </div>
                    <div className='offcanvasTextLineItem'>
                      Email: <a href={`mailto:${coach.email}`}>{coach.email}</a>
                    </div>
                    <br />
                    <br />
                    <h5>Address</h5>
                    <div className='offcanvasText'>
                      <a>{coach.coachInfo.addressOne}</a>
                      <a>{coach.coachInfo.addressTwo}</a>
                      <a>{coach.coachInfo.city}</a>
                      <a>
                        {coach.coachInfo.stateAbb +
                          " " +
                          coach.coachInfo.zipCode}
                      </a>
                    </div>
                    <br />
                    <br />
                    <div id='acceptDenyCoachAppl'>
                      <Button
                        id='coachAppAcceptButton'
                        onClick={async () => {
                          setProgramChange(true);
                          const done = await acceptDenyPendingCoaches(
                            coach.uid,
                            true
                          );
                          setProgramChange(false);
                        }}
                      >
                        Accept
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        id='coachAppDeclineButton'
                        onClick={async () => {
                          setProgramChange(true);
                          const done = await acceptDenyPendingCoaches(
                            coach.uid,
                            false
                          );
                          setProgramChange(false);
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                    <br />
                  </div>
                </Offcanvas.Body> */}
              </Offcanvas>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {allPrograms.length === 0 && (
        <h5 className='smallMessage'>There are currently no programs</h5>
      )}
    </>
  );
};

export default ManageProgramsPage;
