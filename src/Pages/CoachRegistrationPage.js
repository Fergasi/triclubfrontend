import React, { useState } from "react";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import { stateAbbArr } from "../assets/stateAbbArr";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";
import coachImg from "../assets/stockCoach.webp";

const CoachRegistrationPage = () => {
  const { becomeCoach, userToken, setFromBecomeCoach } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [stateAbb, setStateAbb] = useState("Choose...");
  const [zipCode, setZipCode] = useState("");
  const [swim, setSwim] = useState(false);
  const [bike, setBike] = useState(false);
  const [run, setRun] = useState(false);
  const [about, setAbout] = useState("");
  const pendingCoach = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    telephone: telephone,
    addressOne: addressOne,
    addressTwo: addressTwo,
    city: city,
    stateAbb: stateAbb,
    zipCode: zipCode,
    coachProficiency: {
      swim: swim,
      bike: bike,
      run: run,
    },
    about: about,
  };
  const navigate = useNavigate();
  return (
    <>
      {!userToken && (
        <>
          <Card id='coachCard' bg='dark'>
            <Card.Img variant='top' src={coachImg} alt='' />
            <Card.Body>
              <Card.Title>Become a Youth Tri Coach</Card.Title>
              <Card.Text>
                Our Team is looking for knowledgeable, enthusiastic & caring
                Youth Triathlon Coaches.
                <br />
              </Card.Text>
            </Card.Body>
            <Button
              variant='dark'
              onClick={() => {
                setFromBecomeCoach(true);
                navigate("/sign-up");
              }}
            >
              Apply Now
            </Button>
          </Card>
        </>
      )}
      {userToken && (
        <>
          <Form>
            <br />
            <br />
            <h2>Coach Application</h2>
            <br />
            <br />
            <Row className='mb-3'>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter First Name'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Last Name'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>

            <Form.Group className='mb-3' controlId='formGridTelephone'>
              <Form.Label>Telephone Number</Form.Label>
              <Form.Control
                placeholder='555 555 5555'
                value={telephone}
                onChange={(e) => {
                  setTelephone(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGridAddress1'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                placeholder='1234 Main St'
                value={addressOne}
                onChange={(e) => {
                  setAddressOne(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGridAddress2'>
              <Form.Label>Address 2</Form.Label>
              <Form.Control
                placeholder='Apartment, studio, or floor'
                value={addressTwo}
                onChange={(e) => {
                  setAddressTwo(e.target.value);
                }}
              />
            </Form.Group>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder='Enter City'
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridState'>
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={stateAbb}
                  onChange={(e) => {
                    setStateAbb(e.target.value);
                  }}
                >
                  <option>Choose...</option>
                  {stateAbbArr.map((abb, index) => {
                    return <option key={index}>{abb}</option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId='formGridZip'>
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  placeholder='Enter Zip Code'
                  value={zipCode}
                  onChange={(e) => {
                    setZipCode(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group className='mb-3' id='formGridCheckbox'>
                <Form.Label>Coach Proficiency</Form.Label>
                <Form.Check
                  type='checkbox'
                  label='Swim'
                  onChange={(e) => {
                    setSwim(swim ? false : true);
                  }}
                />
                <Form.Check
                  type='checkbox'
                  label='Bike'
                  onChange={(e) => {
                    setBike(bike ? false : true);
                    console.log(bike);
                  }}
                />
                <Form.Check
                  type='checkbox'
                  label='Run'
                  value={run}
                  onChange={(e) => {
                    setRun(run ? false : true);
                  }}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                className='mb-3'
                controlId='exampleForm.ControlTextarea1'
              >
                <Form.Label>About You</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={7}
                  placeholder='Please tell us more about yourself and include all relevant information such as past coaching experience and certifications, experience working with youth, and athletic experience.'
                  value={about}
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <br />
            <Button
              variant='primary'
              type='submit'
              onClick={async () => {
                becomeCoach(pendingCoach);
              }}
            >
              Submit
            </Button>
          </Form>
        </>
      )}
    </>
  );
};
export default CoachRegistrationPage;
