// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

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
