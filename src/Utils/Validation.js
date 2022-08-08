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

export default validateUser;
