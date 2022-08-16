import React, { useState, useRef, useEffect } from "react";
import { Form, Col, Card, Button, Row } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";
import { daysOfWeekAbbArr } from "../assets/daysOfWeekAbbArr";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CreateProgramPage = () => {
  const [programName, setProgramName] = useState("");
  const [photo, setPhoto] = useState(programImg);
  const [formData, setFormData] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [practiceDaysObj, setPracticeDaysObj] = useState({});
  const [mondayButton, setMondayButton] = useState(false);
  const [tuesdayButton, setTuesdayButton] = useState(false);
  const [wednesdayButton, setWednesdayButton] = useState(false);
  const [thursdayButton, setThursdayButton] = useState(false);
  const [fridayButton, setFridayButton] = useState(false);
  const [saturdayButton, setSaturdayButton] = useState(false);
  const [sundayButton, setSundayButton] = useState(false);
  const [startDate, setStartDate] = useState("Tue Aug 16");
  const [startTime, setStartTime] = useState("6pm");
  const [location, setLocation] = useState("Longmont Rec Center");
  const [weeklyPracticeObj, setWeeklyPracticeObj] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
            <Row>
              <Form.Group>
                <Form.Label as={Col}>Program Dates</Form.Label>
                <DateRange
                  as={Col}
                  editableDateInputs={true}
                  minDate={new Date()}
                  maxDate={addDays(new Date(), 900)}
                  onChange={(item) => {
                    setState([item.selection]);
                    console.log(item.selection.startDate, " start date");
                    console.log(item.selection.endDate, " end date");

                    console.log("format ... ");
                    console.log(
                      format(item.selection.startDate, "eee") +
                        " " +
                        format(item.selection.startDate, "MMM") +
                        " " +
                        format(item.selection.startDate, "d")
                    );
                    setStartDate(
                      format(item.selection.startDate, "eee") +
                        " " +
                        format(item.selection.startDate, "MMM") +
                        " " +
                        format(item.selection.startDate, "d")
                    );
                  }}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  ranges={state}
                  weekStartsOn={1}
                  dateDisplayFormat="P"
                />
              </Form.Group>
            </Row>
            <br />
            <Form.Label>Practice Days</Form.Label>
            <br />
            <div id="practiceDaysArea">
              <div
                className={mondayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  mondayButton ? setMondayButton(false) : setMondayButton(true);
                }}
              >
                Mon
              </div>
              <div
                className={tuesdayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  tuesdayButton
                    ? setTuesdayButton(false)
                    : setTuesdayButton(true);
                }}
              >
                Tue
              </div>
              <div
                className={wednesdayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  wednesdayButton
                    ? setWednesdayButton(false)
                    : setWednesdayButton(true);
                }}
              >
                Wed
              </div>
              <div
                className={thursdayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  thursdayButton
                    ? setThursdayButton(false)
                    : setThursdayButton(true);
                }}
              >
                Thu
              </div>
              <div
                className={fridayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  fridayButton ? setFridayButton(false) : setFridayButton(true);
                }}
              >
                Fri
              </div>
              <div
                className={saturdayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  saturdayButton
                    ? setSaturdayButton(false)
                    : setSaturdayButton(true);
                }}
              >
                Sat
              </div>
              <div
                className={sundayButton ? "dayButtonSelected" : "dayButton"}
                onClick={() => {
                  sundayButton ? setSundayButton(false) : setSundayButton(true);
                  console.log(sundayButton);
                }}
              >
                Sun
              </div>
            </div>
            <br />
            <Row>
              <Form.Label>Weekly Practice Schedule</Form.Label>

              <div
                className={
                  mondayButton
                    ? "practiceDayMasterLayout"
                    : "practiceDayMasterLayoutHidden"
                }
              >
                <h3>Monday</h3>
                <div className="practiceScheduleLayout">
                  <div id="practiceClockTimeLayout">
                    <div id="keepThisTight">
                      <div className="timePickerLayout">
                        <h5>Start Time:&nbsp;&nbsp;</h5>
                        <select className="timeOption" defaultValue={"DEFAULT"}>
                          <option disabled value="DEFAULT">
                            HH
                          </option>
                          {[...Array(12)].map((hour, index) => {
                            return (
                              <option key={`hour-${index}`}>{index + 1}</option>
                            );
                          })}
                        </select>
                        <h5>&nbsp;&nbsp;:&nbsp;&nbsp;</h5>
                        <select className="timeOption" defaultValue={"DEFAULT"}>
                          <option disabled value="DEFAULT">
                            MM
                          </option>
                          {[...Array(60)].map((hour, index) => {
                            return (
                              <option key={`hour-${index}`}>
                                {index < 10 ? `0${index}` : index}
                              </option>
                            );
                          })}
                        </select>
                        <div>&nbsp;&nbsp;</div>
                        <select className="timeOption">
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                      <div className="timePickerLayout">
                        <h5>End Time:&nbsp;&nbsp;</h5>
                        <select className="timeOption" defaultValue={"DEFAULT"}>
                          <option disabled value="DEFAULT">
                            HH
                          </option>
                          {[...Array(12)].map((hour, index) => {
                            return (
                              <option key={`hour-${index}`}>{index + 1}</option>
                            );
                          })}
                        </select>
                        <h5>&nbsp;&nbsp;:&nbsp;&nbsp;</h5>
                        <select className="timeOption" defaultValue={"DEFAULT"}>
                          <option disabled value="DEFAULT">
                            MM
                          </option>
                          {[...Array(60)].map((hour, index) => {
                            return (
                              <option key={`hour-${index}`}>
                                {index < 10 ? `0${index}` : index}
                              </option>
                            );
                          })}
                        </select>
                        <div>&nbsp;&nbsp;</div>
                        <select className="timeOption">
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div id="locationLayout">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='ex. "Middle School Fall Swim Training for Triathletes"'
                      value={programName === "" ? "" : programName}
                      onChange={(e) => {
                        setProgramName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <br />
                <Row>
                  <Form.Label>Sport</Form.Label>
                  <Form.Group as={Col}>
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
                </Row>
              </div>
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
                Start: {startDate} at {startTime}
                <br />
                Place: {location}
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
