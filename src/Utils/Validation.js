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

module.exports = { validateUser, validateEmail, validatePassword };
