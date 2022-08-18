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
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
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
    <div id='programFormCardLayout'>
      <div id='programForm'>
        <Form>
          <br />
          <h2>Create New Program</h2>
          <br />
          <br />
          <Row className='mb-3'>
            <Form.Group>
              <Form.Label>
                <h5>Program Name</h5>
              </Form.Label>
              <Form.Control
                type='text'
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
              <Form.Label>
                <h5>Program Photo</h5>
              </Form.Label>
              <ImgCropperComp setPhoto={setPhoto}></ImgCropperComp>
            </Form.Group>
          </Row>
          <br />
          <br></br>
          <Row>
            <Form.Group id='calendarContainer'>
              <Form.Label as={Col}>
                <h5>Program Dates</h5>
              </Form.Label>
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
                dateDisplayFormat='P'
              />
            </Form.Group>
          </Row>
          <br />
          <br />
          <Form.Label>
            <h5>Practice Days</h5>
          </Form.Label>

          <div id='practiceDaysArea'>
            {daysOfWeekAbbArr.map((day, i) => {
              return (
                <div
                  key={`dayButton-${day}`}
                  className={
                    weeklyPracticeObj[day] ? "dayButtonSelected" : "dayButton"
                  }
                  onClick={() => {
                    const newWeekPracObj = { ...weeklyPracticeObj };
                    newWeekPracObj[day]
                      ? (newWeekPracObj[day] = false)
                      : (newWeekPracObj[day] = true);
                    setWeeklyPracticeObj(newWeekPracObj);
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <Row>
            <Form.Label>
              <h5>Weekly Practice Schedule</h5>
            </Form.Label>
            <br />
            <hr />
            <br />
            {daysOfWeekAbbArr.map((day) => {
              return (
                <div
                  key={`daySec${day}`}
                  className={
                    weeklyPracticeObj[day]
                      ? "practiceDayMasterLayout"
                      : "practiceDayMasterLayoutHidden"
                  }
                >
                  <h3>{day}</h3>
                  <br />
                  <div className='practiceScheduleLayout'>
                    <div id='practiceClockTimeLayout'>
                      <div id='keepThisTight'>
                        <div className='timePickerLayout'>
                          <h5>Start Time:&nbsp;&nbsp;</h5>
                          <select
                            className='timeOption'
                            defaultValue={"DEFAULT"}
                          >
                            <option disabled value='DEFAULT'>
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
                            className='timeOption'
                            defaultValue={"DEFAULT"}
                          >
                            <option disabled value='DEFAULT'>
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
                          <select className='timeOption'>
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </div>
                        <div className='timePickerLayout'>
                          <h5>End Time:&nbsp;&nbsp;</h5>
                          <select
                            className='timeOption'
                            defaultValue={"DEFAULT"}
                          >
                            <option disabled value='DEFAULT'>
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
                            className='timeOption'
                            defaultValue={"DEFAULT"}
                          >
                            <option disabled value='DEFAULT'>
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
                          <select className='timeOption'>
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <br />
                    <div id='locationLayout'>
                      <Form.Label>Location</Form.Label>
                      <Form.Control
                        type='text'
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
                        type='checkbox'
                        label='Swim'
                        // onChange={(e) => {
                        //   setSwim(swim ? false : true);
                        // }}
                      />
                      <Form.Check
                        inline
                        type='checkbox'
                        label='Bike'
                        // onChange={(e) => {
                        //   setSwim(swim ? false : true);
                        // }}
                      />
                      <Form.Check
                        inline
                        type='checkbox'
                        label='Run'
                        // onChange={(e) => {
                        //   setSwim(swim ? false : true);
                        // }}
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <hr />
                  <br />
                </div>
              );
            })}
          </Row>
        </Form>
      </div>

      <div id='programCardContainer'>
        <div>
          <div>
            <h3>Preview</h3>
          </div>
          <Card id='programCard'>
            <Card.Img variant='top' src={photo} alt='' />
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
            <Button variant='dark'>More Details</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateProgramPage;
