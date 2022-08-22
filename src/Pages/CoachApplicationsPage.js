import React, { useState, useEffect } from "react";
import { ListGroup, Button, Offcanvas, Image, Alert } from "react-bootstrap";
import { getPendingCoaches } from "../Hooks/Users.js";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseFill } from "react-icons/ri";
import { acceptDenyPendingCoaches } from "../Hooks/Users.js";
import CoachAppOffcanvas from "../Components/CoachAppOffcanvas.js";

function AlertDismissibleExample() {
  const [showAlert, setShowAlert] = useState(true);

  if (showAlert) {
    return (
      <Alert variant='success' onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Please Note:</Alert.Heading>
        <p>
          Coach applicants will not be automatically informed of your decision.
          Please make sure to notify applicants of your decision directly.
          Accepted coaches will immediatley be granted Coach access priveledges,
          while declined applicants will retain their standard user account.
        </p>
      </Alert>
    );
  }
}

const CoachApplications = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pendingCoaches, setPendingCoaches] = useState([]);
  const [coachDecision, setCoachDecision] = useState(false);
  const [offcanvasContent, setOffcanvasContent] = useState({});

  useEffect(() => {
    const getThePendingCoaches = async () => {
      const coaches = await getPendingCoaches();
      setPendingCoaches(coaches.users);
    };
    getThePendingCoaches();
  }, [coachDecision]);

  return (
    <>
      <h2>Coach Applications</h2>
      <br />
      {pendingCoaches.length > 0 && (
        <ListGroup xs={1} md={1} id='applicantList'>
          {pendingCoaches.map((coach, idx) => (
            <ListGroup.Item key={idx} id='listItems'>
              <a>
                {coach.coachInfo.firstName + " " + coach.coachInfo.lastName}
              </a>
              <Button
                variant='dark'
                onClick={async () => {
                  await setOffcanvasContent(pendingCoaches.at(idx));
                  handleShow();
                }}
              >
                Details
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}{" "}
      {pendingCoaches.length === 0 && (
        <h5 className='smallMessage'>
          There are currently no new or pending coach applications
        </h5>
      )}
      {show && (
        <CoachAppOffcanvas
          AlertDismissibleExample={AlertDismissibleExample}
          show={show}
          handleClose={handleClose}
          setCoachDecision={setCoachDecision}
          offcanvasContent={offcanvasContent}
        />
      )}
    </>
  );
};

export default CoachApplications;
