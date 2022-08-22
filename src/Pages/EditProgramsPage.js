import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Col, Card, Button, Row } from "react-bootstrap";
import programImg from "../assets/kids1.jpeg";
import { daysOfWeekAbbArr } from "../assets/daysOfWeekAbbArr";
import { DateRange } from "react-date-range";
import { addDays, differenceInCalendarDays } from "date-fns";
import format from "date-fns/format";
import "cropperjs/dist/cropper.css";
import ImgCropperComp from "../Components/ImgCropperComp";
import { editProgram } from "../Hooks/Programs";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const EditProgramPage = ({
  programDaysObjProps,
  programNameProps,
  photoProps,
  startDateProps,
  endDateProps,
  isActiveProps,
  weeklyPracticeObjProps,
  uidProps,
}) => {
  const navigate = useNavigate();
  const [programDaysObj, setProgramDaysObj] = useState(programDaysObjProps);
  const [programName, setProgramName] = useState(programNameProps);
  const [photo, setPhoto] = useState(photoProps);
  const [startDate, setStartDate] = useState(startDateProps);
  const [endDate, setEndDate] = useState(endDateProps);
  const [isActive, setIsActive] = useState(isActiveProps);
  const [hideDay, setHideDay] = useState(false);

  const newWeeklyPracObj = {};
  daysOfWeekAbbArr.map((day) => {
    if (weeklyPracticeObjProps[day]) {
      newWeeklyPracObj[day] = { ...weeklyPracticeObjProps[day] };
    } else {
      newWeeklyPracObj[day] = {
        show: false,
        startTimeHour: "",
        startTimeMinute: "",
        startTimeAmPm: "AM",
        endTimeHour: "",
        endTimeMinute: "",
        endTimeAmPm: "AM",
        location: "",
        sport: { swim: false, bike: false, run: false },
      };
    }
  });

  const [weeklyPracticeObj, setWeeklyPracticeObj] = useState(newWeeklyPracObj);

  const [state, setState] = useState([
    {
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      key: "selection",
    },
  ]);

  const programData = {
    programName: programName,
    photo: photo,
    startDate: startDate,
    endDate: endDate,
    isActive: isActive,
    weeklyPracticeObj: weeklyPracticeObj,
    programDaysObj: programDaysObj,
  };

  useEffect(() => {
    const updateProgramDaysObj = () => {
      const practiceDays = [];
      const newProgramDayObj = {};
      const pStartDate = state[0].startDate;
      const pEndDate = state[0].endDate;
      Object.keys(weeklyPracticeObj).forEach((key, index) => {
        if (weeklyPracticeObj[key].show) {
          practiceDays.push(key);
        }
      });
      const programDaysNum =
        differenceInCalendarDays(new Date(pEndDate), new Date(pStartDate)) + 1;
      for (let i = 0; i < programDaysNum; i++) {
        const pDay = addDays(new Date(pStartDate), i);
        console.log("pDay " + pDay);
        const fPDay = format(pDay, "eee");
        console.log("fPDay " + fPDay);
        if (practiceDays.includes(fPDay)) {
          newProgramDayObj[pDay] = {};
        }
      }
      setProgramDaysObj(newProgramDayObj);
    };
    updateProgramDaysObj();
    setHideDay(false);
  }, [hideDay, state]);

  useEffect(() => {
    const updateWeekPracObj = () => {
      Object.keys(weeklyPracticeObj).forEach((key, index) => {
        if (weeklyPracticeObj[key].show === false) {
          const newWeekPracObj = { ...weeklyPracticeObj };
          newWeekPracObj[key].startTimeHour = "";
          newWeekPracObj[key].startTimeMinute = "";
          newWeekPracObj[key].startTimeAmPm = "AM";
          newWeekPracObj[key].endTimeHour = "";
          newWeekPracObj[key].endTimeMinute = "";
          newWeekPracObj[key].endTimeAmPm = "AM";
          newWeekPracObj[key].location = "";
          newWeekPracObj[key].sport.swim = false;
          newWeekPracObj[key].sport.bike = false;
          newWeekPracObj[key].sport.run = false;
          setWeeklyPracticeObj(newWeekPracObj);
        }
      });
    };
    updateWeekPracObj();
    setHideDay(false);
  }, [hideDay]);

  return (
    <div id='editProgramFormCardLayout'>
      <div id='editProgramForm'>
        <Form id='editForm'>
          <br />
          <h5>Program Name</h5>
          <Row className='mb-3'>
            <Form.Group>
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
          <h5>Program Photo</h5>
          {/* <Row style={{ width: "80%" }}> */}
          <Form.Group>
            <ImgCropperComp
              setPhoto={setPhoto}
              editPhoto={photo}
            ></ImgCropperComp>
          </Form.Group>
          {/* </Row> */}
          <br />
          <br></br>
          <h5>Program Dates</h5>
          <Row>
            <Form.Group id='calendarContainer'>
              <DateRange
                as={Col}
                editableDateInputs={true}
                maxDate={addDays(new Date(), 900)}
                onChange={(item) => {
                  setState([item.selection]);
                  setStartDate(
                    format(item.selection.startDate, "eee") +
                      " " +
                      format(item.selection.startDate, "MMM") +
                      " " +
                      format(item.selection.startDate, "d")
                  );
                  setEndDate(
                    format(item.selection.endDate, "eee") +
                      " " +
                      format(item.selection.endDate, "MMM") +
                      " " +
                      format(item.selection.endDate, "d")
                  );
                  console.log(state);
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
                    weeklyPracticeObj[day].show
                      ? "dayButtonSelected"
                      : "dayButton"
                  }
                  onClick={() => {
                    setHideDay(true);
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
          <br />
          <Form.Label>
            <h5>Weekly Practice Schedule</h5>
          </Form.Label>
          <Row>
            <br />
            <hr />
            <br />
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
                  <h3
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {day}
                  </h3>
                  <br />
                  <div
                    className='practiceScheduleLayout'
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div id='practiceClockTimeLayout'>
                      <div id='keepThisTight'>
                        <div className='timePickerLayout'>
                          <h6>Start:&nbsp;&nbsp;</h6>
                          <select
                            className='timeOption'
                            value={
                              weeklyPracticeObj[day].startTimeHour === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].startTimeHour
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].startTimeHour =
                                e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
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
                            value={
                              weeklyPracticeObj[day].startTimeMinute === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].startTimeMinute
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].startTimeMinute =
                                e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
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
                          <select
                            className='timeOption'
                            value={
                              weeklyPracticeObj[day].startTimeAmPm === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].startTimeAmPm
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].startTimeAmPm =
                                e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
                          >
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </div>
                        <div className='timePickerLayout'>
                          <h6>End:&nbsp;&nbsp;</h6>
                          <select
                            className='timeOption'
                            value={
                              weeklyPracticeObj[day].endTimeHour === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].endTimeHour
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].endTimeHour = e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
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
                            value={
                              weeklyPracticeObj[day].endTimeMinute === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].endTimeMinute
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].endTimeMinute =
                                e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
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
                          <select
                            className='timeOption'
                            value={
                              weeklyPracticeObj[day].endTimeAmPm === ""
                                ? "DEFAULT"
                                : weeklyPracticeObj[day].endTimeAmPm
                            }
                            onChange={(e) => {
                              const newWeekPracObj = {
                                ...weeklyPracticeObj,
                              };
                              newWeekPracObj[day].endTimeAmPm = e.target.value;
                              setWeeklyPracticeObj(newWeekPracObj);
                            }}
                          >
                            <option>AM</option>
                            <option>PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <br />
                    <h5>Location</h5>
                    <div id='locationLayout'>
                      <Form.Control
                        type='text'
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
                        }}
                      />
                    </div>
                  </div>
                  <br />
                  <h5
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    Sport
                  </h5>
                  <br />
                  <Row>
                    <Form.Group
                      as={Col}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Form.Check
                        inline
                        type='checkbox'
                        label='Swim'
                        checked={weeklyPracticeObj[day].sport.swim}
                        onChange={(e) => {
                          const newWeekPracObj = {
                            ...weeklyPracticeObj,
                          };
                          newWeekPracObj[day].sport.swim
                            ? (newWeekPracObj[day].sport.swim = false)
                            : (newWeekPracObj[day].sport.swim = true);
                          setWeeklyPracticeObj(newWeekPracObj);
                        }}
                      />
                      <Form.Check
                        inline
                        type='checkbox'
                        label='Bike'
                        checked={weeklyPracticeObj[day].sport.bike}
                        onChange={(e) => {
                          const newWeekPracObj = {
                            ...weeklyPracticeObj,
                          };
                          newWeekPracObj[day].sport.bike
                            ? (newWeekPracObj[day].sport.bike = false)
                            : (newWeekPracObj[day].sport.bike = true);
                          setWeeklyPracticeObj(newWeekPracObj);
                        }}
                      />
                      <Form.Check
                        inline
                        type='checkbox'
                        label='Run'
                        checked={weeklyPracticeObj[day].sport.run}
                        onChange={(e) => {
                          const newWeekPracObj = {
                            ...weeklyPracticeObj,
                          };
                          newWeekPracObj[day].sport.run
                            ? (newWeekPracObj[day].sport.run = false)
                            : (newWeekPracObj[day].sport.run = true);
                          setWeeklyPracticeObj(newWeekPracObj);
                        }}
                      />
                    </Form.Group>
                  </Row>
                  <br />
                  <br />
                  <div className='copyCloneLayoutArea'>
                    <div className='copyCloneSelector'>
                      <h6>Copy to: &nbsp;</h6>

                      <select
                        value={"DEFAULT"}
                        onChange={(e) => {
                          setHideDay(true);
                          const newWeekPracObj = { ...weeklyPracticeObj };
                          const ogDayObj = { ...newWeekPracObj[day] };
                          const ogDaySportsObj = {
                            ...weeklyPracticeObj[day].sport,
                          };
                          newWeekPracObj[e.target.value] = ogDayObj;
                          newWeekPracObj[e.target.value].sport = ogDaySportsObj;
                          setWeeklyPracticeObj(newWeekPracObj);
                        }}
                      >
                        <option disabled value='DEFAULT'>
                          Day
                        </option>
                        {daysOfWeekAbbArr.map((day) => {
                          return <option key={`copyDay-${day}`}>{day}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <br />
                  <hr />
                </div>
              );
            })}
          </Row>
        </Form>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10%",
        }}
      >
        <div>
          <h3>Preview</h3>
        </div>
        <br />
        <Card id='programCard'>
          <Card.Img variant='top' src={photo} alt='' />
          <Card.Body id='editProgramCardBody'>
            <Card.Title>
              {programName === ""
                ? "Middle School Fall Swim Training for Triathletes"
                : programName}
            </Card.Title>
            <Row>
              <Card.Text as={Col}>Start: {startDate}</Card.Text>
              <Card.Text as={Col}>End: {endDate}</Card.Text>
            </Row>
          </Card.Body>
          <Button variant='dark'>More Details</Button>
        </Card>
        <br />
        <br />
        <div id='isActiveLayout'>
          <Form.Check
            type='switch'
            className='custom-control-input'
            id='custom-switch'
            label='Set Program to Active'
            checked={isActive}
            onChange={(e) => {
              let newActive = isActive;
              newActive ? (newActive = false) : (newActive = true);
              setIsActive(newActive);
              console.log(newActive);
            }}
          />
        </div>
        <br />
        <button
          type='button'
          className='btn btn-dark'
          style={{
            display: "flex",
            flexDirection: "row",
            alignSelfs: "center",
          }}
          onClick={async () => {
            const newProgramData = { ...programData };
            newProgramData.programName = programName;
            newProgramData.photo = photo;
            newProgramData.startDate = startDate;
            newProgramData.endDate = endDate;
            newProgramData.isActive = isActive;
            const newWeeklyPracObj = {};
            Object.keys(weeklyPracticeObj).forEach((key, index) => {
              if (weeklyPracticeObj[key].show) {
                newWeeklyPracObj[key] = { ...weeklyPracticeObj[key] };
              }
            });
            newProgramData.weeklyPracticeObj = newWeeklyPracObj;
            newProgramData.programDaysObj = programDaysObj;
            console.log(newProgramData);
            const programSubmitted = await editProgram(
              newProgramData,
              uidProps
            );
            if (!programSubmitted.success) {
              // DO SOMETHING
            }
            if (programSubmitted.success) {
              // DO SOMETHING
              navigate("/");
            }
          }}
        >
          Submit Program
        </button>
      </div>
    </div>
  );
};

export default EditProgramPage;
