import React, { useState, useEffect } from "react";
import { useAuth } from "../Hooks/Auth";
import { useNavigate } from "react-router-dom";

const ProgramDetails = ({ setFromPageToPage }) => {
  const { userToken } = useAuth();
  const [program, setProgram] = useState(
    JSON.parse(localStorage.getItem("program"))
  );
  const [programDaysObj, setProgramDaysObj] = useState(program.programDaysObj);
  const [programName, setProgramName] = useState(program.programName);
  const [photo, setPhoto] = useState(program.photo);
  const [startDate, setStartDate] = useState(program.startDate);
  const [endDate, setEndDate] = useState(program.endDate);
  const [weeklyPracticeObj, setWeeklyPracticeObj] = useState(
    program.weeklyPracticeObj
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();

  console.log(program);
  setFromPageToPage("/");

  return (
    <div id='programDetailsPageContainer'>
      <h2 id='programDetailsProgramName'>{programName}</h2>
      <br />
      <img src={photo} alt='' style={{ width: "60%" }}></img>
      <br />
      <br />
      <button
        type='button'
        className='btn btn-dark'
        onClick={() => {
          console.log("click");
          console.log(userToken);
          if (!userToken) {
            setFromPageToPage("/program-details");
            navigate("/sign-up");
            return;
          }
          navigate("/program-register");
        }}
      >
        Register
      </button>
      <br />
      <br />
      <div>
        <h4>Program Dates</h4>
        <h6>
          {startDate} - {endDate}
        </h6>
      </div>
      <br />
      <div>
        <h4>Weekly Practice Schedule</h4>
        {Object.keys(weeklyPracticeObj).map((key, i) => {
          return (
            <div key={`div-${key}`}>
              <h4>{key}</h4>
              <h6 key={`dayTime-${key}`}>
                Practice Time:{" "}
                {Object.values(weeklyPracticeObj)[i].startTimeHour}:
                {Object.values(weeklyPracticeObj)[i].startTimeMinute}{" "}
                {Object.values(weeklyPracticeObj)[i].startTimeAmPm} -{" "}
                {Object.values(weeklyPracticeObj)[i].endTimeHour}:
                {Object.values(weeklyPracticeObj)[i].endTimeMinute}{" "}
                {Object.values(weeklyPracticeObj)[i].endTimeAmPm}
              </h6>

              <div className='oneLine'>
                <h6>Sports: </h6>
                {Object.values(weeklyPracticeObj[key].sport).map((bool, y) => {
                  return (
                    <>
                      {bool === true ? (
                        <h6 className='sports'>
                          {Object.keys(weeklyPracticeObj[key].sport)[y]}
                        </h6>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </div>

              <div className='oneLine'>
                <h6>Location:&nbsp;</h6>
                <h6>{weeklyPracticeObj[key].location}</h6>
              </div>

              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramDetails;
