import React, { useState, useEffect } from "react";
import { ListGroup, Button, Offcanvas, Image, Alert } from "react-bootstrap";
import { getPendingCoaches } from "../Hooks/Users.js";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseFill } from "react-icons/ri";
// import { acceptDenyPendingCoaches } from "../Hooks/Users.js";
import { getAllPrograms } from "../Hooks/Programs.js";
import { deleteProgram } from "../Hooks/Programs.js";
import EditProgramPage from "./EditProgramsPage.js";
import Spinner from "react-bootstrap/Spinner";

const ManageProgramsPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [offcanvasContent, setOffcanvasContent] = useState({});
  const [allPrograms, setAllPrograms] = useState(null);
  const [programChange, setProgramChange] = useState(false);

  useEffect(() => {
    const getPrograms = async () => {
      const programs = await getAllPrograms();
      setAllPrograms(programs.programs);
    };
    getPrograms();
    setProgramChange(false);
  }, [programChange]);

  return (
    <div id='applicantListContainer'>
      <h2>Manage Programs</h2>
      <br />
      {Array.isArray(allPrograms) && allPrograms.length > 0 && (
        <ListGroup xs={1} md={1} id='applicantList'>
          {allPrograms.map((program, idx) => (
            <ListGroup.Item key={idx} id='listItems'>
              <a style={{ textAlign: "left" }}>{program.programName}</a>
              <div id='coachAppButtonsDiv' style={{ textAlign: "right" }}>
                <Button
                  style={{ margin: "2px" }}
                  variant='dark'
                  onClick={() => {
                    setOffcanvasContent(allPrograms.at(idx));
                    handleShow();
                    // setProgramChange(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  style={{ margin: "2px" }}
                  variant='danger'
                  onClick={() => {
                    deleteProgram(program.uid);
                    setProgramChange(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {Array.isArray(allPrograms) && allPrograms.length === 0 && (
        <h5 className='smallMessage'>There are currently no programs</h5>
      )}
      {allPrograms === null && <Spinner animation='border' />}

      <Offcanvas
        show={show}
        onHide={handleClose}
        id='offCanvas'
        backdrop={false}
      >
        <Offcanvas.Header id='offcanvasHeaderFixed' closeButton>
          <div style={{ width: "30px" }} />
          <h2>Edit Program</h2>
        </Offcanvas.Header>
        <EditProgramPage
          programDaysObjProps={offcanvasContent.programDaysObj}
          programNameProps={offcanvasContent.programName}
          photoProps={offcanvasContent.photo}
          startDateProps={offcanvasContent.startDate}
          endDateProps={offcanvasContent.endDate}
          isActiveProps={offcanvasContent.isActive}
          weeklyPracticeObjProps={offcanvasContent.weeklyPracticeObj}
          uidProps={offcanvasContent.uid}
        />
      </Offcanvas>
    </div>
  );
};

export default ManageProgramsPage;
