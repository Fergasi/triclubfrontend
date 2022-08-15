import React, { useState, useRef } from "react";
import { Form, Col, Card, Button, Row } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";
import { daysOfWeekAbbArr } from "../assets/daysOfWeekAbbArr";

const CreateProgramPage = () => {
  const [programName, setProgramName] = useState("");
  const [photo, setPhoto] = useState(programImg);
  const [formData, setFormData] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [practiceDaysObj, setPracticeDaysObj] = useState({});
  const fileInput = useRef(null);
  return (
    <>
      <div id="programFormCardLayout">
        <div id="programForm">
          <Form>
            <br />
            <h2>Create New Program</h2>
            <br />
            <br />
            <Row className="mb-3">
              <Form.Group>
                <Form.Label>Program Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder='ex. "Middle School Fall Swim Training for Triathletes"'
                  value={programName === "" ? "" : programName}
                  onChange={(e) => {
                    setProgramName(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <br />
            <Row>
              <Form.Group>
                <Form.Label>Program Photo</Form.Label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setPhotoFileName(file.name);
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (e) => {
                      setPhoto(e.target.result);
                      setFormData({ file: e.target.result });
                    };
                  }}
                  style={{ display: "none" }}
                  ref={fileInput}
                />
                <Form.Control
                  placeholder='ex. "Youth_Tri_Race_Start.png"'
                  value={photoFileName}
                  disabled
                />
                <br />
                <Button
                  variant="dark"
                  onClick={() => {
                    fileInput.current.click();
                  }}
                >
                  Upload Program Photo
                </Button>
              </Form.Group>
            </Row>
            <br />
            <Form.Group controlId="dob">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
              />
            </Form.Group>
            <br />

            <Form.Group controlId="dob">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
              />
            </Form.Group>
            <br />

            <Row></Row>
            <Form.Label>Practice Days</Form.Label>
            <br />
            {daysOfWeekAbbArr.map((day, index) => {
              return (
                <Button
                  type="checkbox"
                  variant="outline-primary"
                  // onClick={() => {
                  //   console.log(day);
                  // }}
                >
                  {day}
                </Button>
                // <div class="btn-group-toggle" data-toggle="buttons">
                //   <label class="btn btn-secondary active">
                //     <input type="checkbox" checked autocomplete="off" /> Checked
                //   </label>
                // </div>
              );
            })}

            <br />
            <Row>
              <Form.Label>Weekly Practice Schedule</Form.Label>
              <Form.Group>
                {daysOfWeekAbbArr.map((day, index) => {
                  return (
                    <div>
                      <div id="practiceTimeLayout">
                        <Form.Check id={day} />
                        <h4>{day}</h4>

                        <Form.Select id="hours">
                          <option selected disabled>
                            00
                          </option>
                          {[...Array(12)].map((e, i) => {
                            return <option>{i + 1}</option>;
                          })}
                        </Form.Select>
                        <h3>&nbsp;:&nbsp;</h3>
                        <Form.Select id="minutes">
                          <option selected disabled>
                            00
                          </option>
                          {[...Array(12)].map((e, i) => {
                            return <option>{i + 1}</option>;
                          })}
                        </Form.Select>

                        <Form.Select id="amPm">
                          <option>AM</option>
                          <option>PM</option>
                        </Form.Select>
                      </div>
                      <div id="practiceLocationLayout">
                        <Form.Group as={Col}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Practice Location"
                            // value={firstName}
                            // onChange={(e) => {
                            //   setFirstName(e.target.value);
                            // }}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Swim"
                            // onChange={(e) => {
                            //   setSwim(swim ? false : true);
                            // }}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Bike"
                            // onChange={(e) => {
                            //   setSwim(swim ? false : true);
                            // }}
                          />
                          <Form.Check
                            inline
                            type="checkbox"
                            label="Run"
                            // onChange={(e) => {
                            //   setSwim(swim ? false : true);
                            // }}
                          />
                        </Form.Group>
                      </div>
                      <br />
                    </div>
                  );
                })}
              </Form.Group>
            </Row>
          </Form>
        </div>

        <div id="programCard">
          <Card>
            <Card.Img variant="top" src={photo} alt="" />
            <Card.Body>
              <Card.Title>
                {programName === ""
                  ? "Middle School Fall Swim Training for Triathletes"
                  : programName}
              </Card.Title>
              <Card.Text>
                Time: Tuesday 15th August, 5pm
                <br />
                Place: Longmount Public Pool
                <br />
                Type: Swim
              </Card.Text>
            </Card.Body>
            <Button variant="dark">More Details</Button>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CreateProgramPage;
