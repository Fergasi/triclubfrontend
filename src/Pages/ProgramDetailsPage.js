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
    <div>
      <h1 id="programDetailsProgramName">{programName}</h1>
      <img src={photo} alt=""></img>
      <br />
      <br />
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          console.log("click");
          console.log(userToken);
          if (!userToken) {
            setFromPageToPage("/program-details");
            navigate("/sign-up");
          }
          navigate("/program-register");
        }}
      >
        Register
      </button>
      <br />
      <br />
      <div>
        <span>Program Dates</span>
        <h4>
          {startDate} - {endDate}
        </h4>
      </div>
      <br />
      <div>
        <span>Weekly Practice Schedule</span>
        {Object.keys(weeklyPracticeObj).map((key, i) => {
          return (
            <div key={`div-${key}`}>
              <h4>{key}</h4>
              <h4 key={`dayTime-${key}`}>
                Practice Time:{" "}
                {Object.values(weeklyPracticeObj)[i].startTimeHour}:
                {Object.values(weeklyPracticeObj)[i].startTimeMinute}{" "}
                {Object.values(weeklyPracticeObj)[i].startTimeAmPm} -{" "}
                {Object.values(weeklyPracticeObj)[i].endTimeHour}:
                {Object.values(weeklyPracticeObj)[i].endTimeMinute}{" "}
                {Object.values(weeklyPracticeObj)[i].endTimeAmPm}
              </h4>

              <div className="oneLine">
                <h4>Sports:</h4>
                {Object.values(weeklyPracticeObj[key].sport).map((bool, y) => {
                  return (
                    <h4 key={`sports-${y}`}>
                      {bool === true
                        ? Object.keys(weeklyPracticeObj[key].sport)[y]
                        : ""}{" "}
                      &nbsp;
                    </h4>
                  );
                })}
              </div>

              <div className="oneLine">
                <h4>Location:&nbsp;</h4>
                <h4>{Object.values(weeklyPracticeObj[key].location)}</h4>
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
