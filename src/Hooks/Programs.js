// import { useState, useEffect, createContext, useContext, useMemo } from "react";

// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

// const ProgramContext = createContext();

// export const ProgramProvider = ({ childer }) => {
//   const [programObj, setProgramObj] = useState({});
// };

//Function to get Programs to display on UserHomePage
export const getActivePrograms = async () => {
  const url = `${urlEndpoint}/programs/get-active-programs`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

//Function to get Programs to display on ManageProgramsPage
export const getAllPrograms = async () => {
  const url = `${urlEndpoint}/programs/get-all-programs`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

//Function to get Programs to display on ManageProgramsPage
export const deleteProgram = async (uid) => {
  const url = `${urlEndpoint}/programs/delete-program`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      uid: uid,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export const submitProgram = async (programData) => {
  const response = await fetch(`${urlEndpoint}/programs/submit-program`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(programData),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

// REVIST THIS LATER --
// export const addAthleteToProgram = async (programId, token, kid) => {
//   const response = await fetch(`${urlEndpoint}/programs/add-athlete`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       token: token,
//     },
//     body: JSON.stringify({ programId, kid }),
//   });
//   const responseJSON = await response.json();
//   return responseJSON;
// };
