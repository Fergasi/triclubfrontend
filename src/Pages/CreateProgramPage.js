import React, { useState, useRef } from "react";
import { Form, Col, Card, Button, Row } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";
import { daysOfWeekAbbArr } from "../assets/daysOfWeekAbbArr";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import format from "date-fns/format";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import ImgCropperComp from "../Components/ImgCropperComp";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CreateProgramPage = () => {
  const [programName, setProgramName] = useState("");
  const [photo, setPhoto] = useState(programImg);
  const [formData, setFormData] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");
  const [practiceDaysObj, setPracticeDaysObj] = useState({});
  const [startDate, setStartDate] = useState("Tue Aug 16");
  const [location, setLocation] = useState("Longmont Rec Center");
  const [weeklyPracticeObj, setWeeklyPracticeObj] = useState({
    Mon: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Tue: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Wed: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Thu: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Fri: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Sat: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
    Sun: {
      show: false,
      startTime: "",
      endTime: "",
      location: "",
      sport: { swim: false, bike: false, run: false },
    },
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
                <ImgCropperComp setPhoto={setPhoto}></ImgCropperComp>
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
              {daysOfWeekAbbArr.map((day, i) => {
                return (
                  <div
                    key={`dayButton-${day}`}
                    className={
                      weeklyPracticeObj[day].show
                        ? "dayButtonSelected"
                        : "dayButton"
                    }
                    onClick={() => {
                      const newWeekPracObj = { ...weeklyPracticeObj };
                      newWeekPracObj[day].show
                        ? (newWeekPracObj[day].show = false)
                        : (newWeekPracObj[day].show = true);
                      setWeeklyPracticeObj(newWeekPracObj);
                    }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <br />
            <Row>
              <Form.Label>Weekly Practice Schedule</Form.Label>

              {daysOfWeekAbbArr.map((day) => {
                return (
                  <div
                    key={`daySec${day}`}
                    className={
                      weeklyPracticeObj[day].show
                        ? "practiceDayMasterLayout"
                        : "practiceDayMasterLayoutHidden"
                    }
                  >
                    <h3>{day}</h3>
                    <div className="practiceScheduleLayout">
                      <div id="practiceClockTimeLayout">
                        <div id="keepThisTight">
                          <div className="timePickerLayout">
                            <h5>Start Time:&nbsp;&nbsp;</h5>
                            <select
                              className="timeOption"
                              defaultValue={"DEFAULT"}
                            >
                              <option disabled value="DEFAULT">
                                HH
                              </option>
                              {[...Array(12)].map((hour, index) => {
                                return (
                                  <option key={`hour-${index}`}>
                                    {index + 1}
                                  </option>
                                );
                              })}
                            </select>
                            <h5>&nbsp;&nbsp;:&nbsp;&nbsp;</h5>
                            <select
                              className="timeOption"
                              defaultValue={"DEFAULT"}
                            >
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
                            <select
                              className="timeOption"
                              defaultValue={"DEFAULT"}
                            >
                              <option disabled value="DEFAULT">
                                HH
                              </option>
                              {[...Array(12)].map((hour, index) => {
                                return (
                                  <option key={`hour-${index}`}>
                                    {index + 1}
                                  </option>
                                );
                              })}
                            </select>
                            <h5>&nbsp;&nbsp;:&nbsp;&nbsp;</h5>
                            <select
                              className="timeOption"
                              defaultValue={"DEFAULT"}
                            >
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
                          placeholder='ex. "Longmont Rec Center"'
                          value={
                            weeklyPracticeObj[day].location === ""
                              ? ""
                              : weeklyPracticeObj[day].location
                          }
                          onChange={(e) => {
                            const newWeeklyPracObj = { ...weeklyPracticeObj };
                            newWeeklyPracObj[day].location = e.target.value;
                            setWeeklyPracticeObj(newWeeklyPracObj);
                            console.log(weeklyPracticeObj);
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
                    <div>-------------------</div>
                    <br />
                  </div>
                );
              })}
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
                Start: {startDate}
                <br />
                Place: {location}
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
