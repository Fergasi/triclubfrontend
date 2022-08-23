import React, { useState, useEffect } from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";
import { stateAbbArr } from "../assets/stateAbbArr";
import Calendar from "react-calendar";
import { getUserChildren, getUserInfo, purchaseProgram } from "../Hooks/Users";
import "react-calendar/dist/Calendar.css";

const ProgramRegisterPage = () => {
  const { userToken } = useAuth();
  const [program, setProgram] = useState(
    JSON.parse(localStorage.getItem("program"))
  );
  const [dropDown, setDropDown] = useState("");
  const [programDaysObj, setProgramDaysObj] = useState(program.programDaysObj);
  const [programName, setProgramName] = useState(program.programName);
  const [children, setChildren] = useState([]);
  const [firstNameChild, setFirstNameChild] = useState("");
  const [lastNameChild, setLastNameChild] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [city, setCity] = useState("");
  const [stateAbb, setStateAbb] = useState("Choose...");
  const [zipCode, setZipCode] = useState("");
  const [date, setDate] = useState(new Date());
  const [mssg, setMssg] = useState("");
  const userInfo = {
    firstName: firstName,
    lastName: lastName,
    telephone: telephone,
    addressOne: addressOne,
    addressTwo: addressTwo,
    city: city,
    stateAbb: stateAbb,
    zipCode: zipCode,
    child: {
      firstNameChild: firstNameChild,
      lastNameChild: lastNameChild,
      dob: date,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchUser = await getUserInfo(userToken);
      const fetchUserInfo = fetchUser.obj;
      setFirstName(fetchUserInfo.firstName ? fetchUserInfo.firstName : "");
      setLastName(fetchUserInfo.lastName ? fetchUserInfo.lastName : "");
      setTelephone(fetchUserInfo.telephone ? fetchUserInfo.telephone : "");
      setAddressOne(fetchUserInfo.addressOne ? fetchUserInfo.addressOne : "");
      setAddressTwo(fetchUserInfo.addressTwo ? fetchUserInfo.addressTwo : "");
      setCity(fetchUserInfo.city ? fetchUserInfo.city : "");
      setStateAbb(
        fetchUserInfo.stateAbb ? fetchUserInfo.stateAbb : "Choose..."
      );
      setZipCode(fetchUserInfo.zipCode ? fetchUserInfo.zipCode : "");
    };
    const fetchChildren = async () => {
      const fetchUserChildren = await getUserChildren(userToken);
      const userChildren = fetchUserChildren.obj;
      console.log("use effect");
      console.log(userChildren);
      setChildren(userChildren ? userChildren : []);
    };
    fetchUser();
    fetchChildren();
  }, [userToken]);

  const navigate = useNavigate();

  return (
    <>
      <Form>
        <br />
        <h2>{programName} Registration</h2>
        <br />
        <br />
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridTelephone">
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control
            placeholder="555 555 5555"
            value={telephone}
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="1234 Main St"
            value={addressOne}
            onChange={(e) => {
              setAddressOne(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            placeholder="Apartment, studio, or floor"
            value={addressTwo}
            onChange={(e) => {
              setAddressTwo(e.target.value);
            }}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              placeholder="Enter City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Select
              value={stateAbb}
              onChange={(e) => {
                setStateAbb(e.target.value);
              }}
            >
              <option defaultValue="selected" disabled={true}>
                Choose...
              </option>
              {stateAbbArr.map((abb, index) => {
                return <option key={index}>{abb}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              placeholder="Enter Zip Code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Add Child</Form.Label>
          <Form.Select
            value={dropDown ? dropDown : "Choose..."}
            onChange={(e) => {
              setFirstNameChild(children[e.target.value].firstNameChild);
              setLastNameChild(children[e.target.value].lastNameChild);
              setDate(new Date(children[e.target.value].dob));
            }}
          >
            <option defaultValue="selected" disabled={true}>
              Choose...
            </option>
            {children.map((kid, index) => {
              return (
                <option key={kid.firstNameChild} value={index}>
                  {kid.firstNameChild}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Child First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              value={firstNameChild}
              onChange={(e) => {
                setFirstNameChild(e.target.value);
                console.log(firstNameChild);
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Child Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              value={lastNameChild}
              onChange={(e) => {
                setLastNameChild(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
        <div className="dobCal">
          <Row>
            <Form.Label>Date of Birth</Form.Label>
            <Calendar onChange={setDate} value={date}></Calendar>
          </Row>
        </div>

        <br />
      </Form>

      <Button
        variant="primary"
        type="submit"
        onClick={async () => {
          console.log(userInfo);
          console.log(userToken);
          const programPurchased = await purchaseProgram(
            userToken,
            userInfo,
            program.uid
          );
          if (!programPurchased.success) {
            setMssg(programPurchased.message);
          }
          if (programPurchased.success) {
            setMssg(programPurchased.message);
            navigate("/");
          }
        }}
      >
        Purchase
      </Button>
      <br />
      <br />
      <div className="mediumMessage">
        {mssg} <br />
      </div>
    </>
  );
};

export default ProgramRegisterPage;
