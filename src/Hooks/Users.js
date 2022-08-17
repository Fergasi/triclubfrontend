// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

//Function to get pending coaches to display in Coach Application Page on Admin Dashboard
export const getPendingCoaches = async () => {
  const url = `${urlEndpoint}/users/get-pending-coaches`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

//Function to accept and deny coach applications in Coach Application Page on Admin Dashboard, and det their userType in the DB
export const acceptDenyPendingCoaches = async (uid, decision) => {
  const url = `${urlEndpoint}/users/set-pending-coaches`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      decision,
      uid,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};
