import React, { useState, useEffect } from "react";
import { ListGroup, Button, Offcanvas, Image, Alert } from "react-bootstrap";
import { getPendingCoaches } from "../Hooks/Users.js";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseFill } from "react-icons/ri";
import { acceptDenyPendingCoaches } from "../Hooks/Users.js";

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

const CoachApplications = ({ setShowAlert }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [pendingCoaches, setPendingCoaches] = useState([]);
  const [coachDecision, setCoachDecision] = useState(false);

  useEffect(() => {
    const getThePendingCoaches = async () => {
      const coaches = await getPendingCoaches();
      setPendingCoaches(coaches.users);
    };
    getThePendingCoaches();
  }, [coachDecision]);

  console.log(pendingCoaches);

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
              <Button variant='secondary' onClick={handleShow}>
                Details
              </Button>
              <Offcanvas
                show={show}
                onHide={handleClose}
                id='offCanvas'
                backdrop={false}
              >
                <Offcanvas.Header id='offcanvasHeaderFixed' closeButton>
                  <Offcanvas.Title></Offcanvas.Title>
                  <h2 id='offcanvasHeaderName'>
                    {coach.coachInfo.firstName + " " + coach.coachInfo.lastName}
                  </h2>
                </Offcanvas.Header>
                <Offcanvas.Body>
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
                          setCoachDecision(true);
                          const done = await acceptDenyPendingCoaches(
                            coach.uid,
                            true
                          );
                          setCoachDecision(false);
                        }}
                      >
                        Accept
                      </Button>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Button
                        id='coachAppDeclineButton'
                        onClick={async () => {
                          setCoachDecision(true);
                          const done = await acceptDenyPendingCoaches(
                            coach.uid,
                            false
                          );
                          setCoachDecision(false);
                        }}
                      >
                        Decline
                      </Button>
                    </div>
                    <br />
                    <br />
                    <AlertDismissibleExample />
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}{" "}
      {pendingCoaches.length === 0 && (
        <h5 className='smallMessage'>
          There are currently no new or pending coach applications
        </h5>
      )}
    </>
  );
};

export default CoachApplications;
