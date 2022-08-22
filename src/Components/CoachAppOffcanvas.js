import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { RiCloseFill } from "react-icons/ri";
import { acceptDenyPendingCoaches } from "../Hooks/Users.js";
import { Button, Offcanvas, Image } from "react-bootstrap";

const CoachAppOffcanvas = ({
  show,
  handleClose,
  offcanvasContent,
  AlertDismissibleExample,
  setCoachDecision,
}) => {
  return (
    <Offcanvas show={show} onHide={handleClose} id='offCanvas' backdrop={false}>
      <Offcanvas.Header id='offcanvasHeaderFixed' closeButton>
        <Offcanvas.Title></Offcanvas.Title>
        <h2 id='offcanvasHeaderName'>
          {offcanvasContent.coachInfo.firstName +
            " " +
            offcanvasContent.coachInfo.lastName}
        </h2>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div id='OffcanvasHeader'>
          <Image
            id='OffcanvasImage'
            src={offcanvasContent.coachInfo.photo.file}
          ></Image>
        </div>
        <br />
        <div className='coachProfContainer'>
          <div className='coachProficiency'>
            <h5 className='coachProfTitle'>Swim</h5>
            {offcanvasContent.coachInfo.coachProficiency.swim ? (
              <FcCheckmark className='FcCheckmark' />
            ) : (
              <RiCloseFill className='RiCloseFill' />
            )}
          </div>
          <div className='coachProficiency'>
            <h5 className='coachProfTitle'>Bike</h5>
            {offcanvasContent.coachInfo.coachProficiency.bike ? (
              <FcCheckmark className='FcCheckmark' />
            ) : (
              <RiCloseFill className='RiCloseFill' />
            )}
          </div>
          <div className='coachProficiency'>
            <h5 className='coachProfTitle'>Run</h5>
            {offcanvasContent.coachInfo.coachProficiency.run ? (
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
          <a>{offcanvasContent.coachInfo.about}</a>
        </div>
        <br />
        <br />
        <div className='offcanvasText'>
          <h5>Contact</h5>
          <div className='offcanvasTextLineItem'>
            Phone Number:
            <a href={`tel:${offcanvasContent.coachInfo.telephone}`}>
              {offcanvasContent.coachInfo.telephone}
            </a>
          </div>
          <div className='offcanvasTextLineItem'>
            Email:{" "}
            <a href={`mailto:${offcanvasContent.email}`}>
              {offcanvasContent.email}
            </a>
          </div>
          <br />
          <br />
          <h5>Address</h5>
          <div className='offcanvasText'>
            <a>{offcanvasContent.coachInfo.addressOne}</a>
            <a>{offcanvasContent.coachInfo.addressTwo}</a>
            <a>{offcanvasContent.coachInfo.city}</a>
            <a>
              {offcanvasContent.coachInfo.stateAbb +
                " " +
                offcanvasContent.coachInfo.zipCode}
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
                  offcanvasContent.uid,
                  true
                );
                setCoachDecision(false);
                handleClose();
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
                  offcanvasContent.uid,
                  false
                );
                setCoachDecision(false);
                handleClose();
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
  );
};

export default CoachAppOffcanvas;
