// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

export const becomeCoach = async (coachObj) => {
  const response = await fetch(`${urlEndpoint}/auth/become-coach`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(coachObj),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export const signUpUser = async (email, password) => {
  const response = await fetch(`${urlEndpoint}/auth/sign-up-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${urlEndpoint}/auth/login-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const responseJSON = await response.json();
  if (responseJSON.success) {
    console.log(responseJSON.token);
    localStorage.setItem("token", JSON.stringify(responseJSON.token));
    localStorage.setItem("userType", responseJSON.userType);
  }
  return responseJSON;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");

  return true;
};

export const getUserToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

export const getUserType = () => {
  return localStorage.getItem("userType");
};

// export default Auth;
