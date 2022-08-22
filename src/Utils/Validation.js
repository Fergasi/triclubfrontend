const validateUser = (userData) => {
  if (userData.email.includes("@") && userData.password) {
    return { isValid: true, emailMssg: "", passwordMssg: "" };
  }
  const emailMssg = userData.email.includes("@")
    ? ""
    : "Please enter a valid email.";
  const passwordMssg = userData.password ? "" : "Please include a password.";

  return { isValid: false, emailMssg: emailMssg, passwordMssg: passwordMssg };
};

const validateEmail = (email) => {
  if (email.includes("@")) {
    return { isValid: true, emailMssg: "" };
  }
  const emailMssg = email.includes("@") ? "" : "Please enter a valid email.";

  return { isValid: false, emailMssg: emailMssg };
};

const validatePassword = (password) => {
  if (password) {
    return { isValid: true, passwordMssg: "" };
  }

  const passwordMssg = password ? "" : "Please include a password.";

  return { isValid: false, passwordMssg: passwordMssg };
};

const validateCoachRegistration = (coachInfo) => {
  let mssg = "Please include:";
  if (
    coachInfo.firstName !== "" &&
    coachInfo.lastName !== "" &&
    coachInfo.telephone !== "" &&
    coachInfo.addressOne !== "" &&
    coachInfo.city !== "" &&
    coachInfo.stateAbb !== "" &&
    coachInfo.zipCode !== "" &&
    Object.keys(coachInfo.coachProficiency).length > 0 &&
    coachInfo.about !== ""
  ) {
    return { isValid: true };
  }
  if (coachInfo.firstName === "") {
    mssg += " - First Name,";
  }
  if (coachInfo.lastName === "") {
    mssg += " - Last Name,";
  }
  if (coachInfo.telephone === "") {
    mssg += " - Telephone Number,";
  }
  if (coachInfo.addressOne === "") {
    mssg += " - Address One,";
  }
  if (coachInfo.city === "") {
    mssg += " - City,";
  }
  if (coachInfo.stateAbb === "Choose...") {
    mssg += " - State,";
  }
  if (coachInfo.zipCode === "") {
    mssg += " - Zip Code,";
  }
  if (Object.keys(coachInfo.coachProficiency).length === 0) {
    mssg += " - Sport Proficiencies,";
  }
  if (coachInfo.about === "") {
    mssg += " - About You,";
  }
  return { isValid: false, mssg: mssg };
};

const validateProgramPage = (newProgramData) => {
  let mssg = "Please include:";
  if (
    Object.keys(newProgramData.programDaysObj).length > 0 &&
    newProgramData.programName !== "" &&
    Object.keys(newProgramData.weeklyPracticeObj).length > 0
  ) {
    return { isValid: true };
  }
  if (!newProgramData.programName) {
    mssg += " - Program Name,";
  }

  if (Object.keys(newProgramData.programDaysObj).length === 0) {
    mssg += " - Date Range,";
  }

  if (Object.keys(newProgramData.weeklyPracticeObj).length === 0) {
    mssg += " - Weekly Schedule,";
  }
  return { isValid: false, mssg: mssg };
};

module.exports = {
  validateUser,
  validateEmail,
  validatePassword,
  validateProgramPage,
  validateCoachRegistration,
};
