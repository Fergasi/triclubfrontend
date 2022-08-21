import React, { useState } from "react";

const ProgramDetails = () => {
  const [program, setProgram] = useState(
    JSON.parse(localStorage.getItem("program"))
  );
  return (
    <>
      <div>
        <h1>{program.programName}</h1>
        <img src={program.photo} alt=""></img>
        <br />
        <br />
        <div>
          <span>Program Dates</span>
          <h4>
            {program.startDate} - {program.endDate}
          </h4>
        </div>
        <br />
        <div>
          <span>Weekly Practice Schedule</span>
          {console.log(Object.keys(program.weeklyPracticeObj))}
          {Object.keys(program.weeklyPracticeObj).map((key, i) => {
            return (
              <div key={`div-${key}`}>
                <h4 key={`dayTime-${key}`}>
                  {key} ...{" "}
                  {Object.values(program.weeklyPracticeObj)[i].startTimeHour} :{" "}
                  {Object.values(program.weeklyPracticeObj)[i].startTimeMinute}{" "}
                  {Object.values(program.weeklyPracticeObj)[i].startTimeAmPm} -{" "}
                  {Object.values(program.weeklyPracticeObj)[i].endTimeHour} :{" "}
                  {Object.values(program.weeklyPracticeObj)[i].endTimeMinute}{" "}
                  {Object.values(program.weeklyPracticeObj)[i].endTimeAmPm}
                </h4>
                {console.log(Object.values(program.weeklyPracticeObj)[i].sport)}
                {/* {Object.keys(program.weeklyPracticeObj)[i].sport.map(
                  (key, x) => {
                    return (
                      <h4 key={`sport-${key}`}>
                        {Object.values(program.weeklyPracticeObj)[i].sport[x]
                          ? key
                          : ""}
                      </h4>
                    );
                  }
                )} */}
                <br />
              </div>
            );
          })}
          {/* {console.log(Object.values(program.weeklyPracticeObj)[0].startTime)} */}
        </div>
      </div>
    </>
  );
};

export default ProgramDetails;
