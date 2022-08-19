import { useState, useEffect, createContext, useContext, useMemo } from "react";

// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAdminLoginCheck, setIsAdminLoginCheck] = useState(false);
  const [isCoachLoginCheck, setIsCoachLoginCheck] = useState(false);
  console.log(
    "userToken: " + userToken,
    " isAuthLoading: " + isAuthLoading,
    " isAdminLoginCheck: " + isAdminLoginCheck,
    " isCoachLoginCheck: " + isCoachLoginCheck
  );

  //UseEffect to check and update UserToken
  useEffect(() => {
    const tokenCheck = async () => {
      const token = await getLocalUserToken();
      setUserToken(token);
    };
    tokenCheck();
  }, [isAuthLoading]);

  //UseEffect to check and update isAdminLoginCheck
  useEffect(() => {
    const isAdminCheck = async () => {
      const adminBool = await verifyAdmin();
      setIsAdminLoginCheck(adminBool);
    };
    if (userToken) {
      isAdminCheck();
    }
  }, [userToken]);

  //UseEffect to check and update isCoachLoginCheck
  useEffect(() => {
    const isCoachCheck = async () => {
      const coachBool = await verifyCoach();
      setIsCoachLoginCheck(coachBool);
    };
    if (userToken) {
      isCoachCheck();
    }
  }, [userToken]);

  // call this function when you want to register the user
  const signUpUser = async (email, password) => {
    setIsAuthLoading(true);
    const signUpResult = await validateSignUpUser(email, password);
    setIsAuthLoading(false);
    return signUpResult;
  };

  // call this function when you want to authenticate the user
  const loginUser = async (email, password) => {
    setIsAuthLoading(true);
    const loginResult = await validateLoginUser(email, password);
    if (loginResult.success) {
      setLocalUserToken(loginResult.token);
    }
    setIsAuthLoading(false);
    return loginResult;
  };

  // call this function when you want to register the user
  const applyForCoach = async (coachInfo, token) => {
    setIsAuthLoading(true);
    const applyForCoachResult = await validateApplyForCoach(coachInfo, token);
    setIsAuthLoading(false);
    return applyForCoachResult;
  };

  // call this function to sign out logged in user
  const logoutUser = async () => {
    setIsAuthLoading(true);
    await removeUserToken();
    setIsAdminLoginCheck(false);
    setIsCoachLoginCheck(false);
    setIsAuthLoading(false);
    return true;
  };

  const verifyAdmin = async () => {
    setIsAuthLoading(true);
    const isAdminResult = await validateAdmin(userToken);
    if (isAdminResult.success) {
      setIsAuthLoading(false);
      return isAdminResult.isAdmin;
    } else {
      setIsAuthLoading(false);
    }
    return false;
  };

  const verifyCoach = async () => {
    setIsAuthLoading(true);
    const isCoachResult = await validateCoach(userToken);
    if (isCoachResult.success) {
      setIsAuthLoading(false);
      return isCoachResult.isCoach;
    } else {
      setIsAuthLoading(false);
    }
    return false;
  };

  const verifyResetPassTok = async (rpt) => {
    setIsAuthLoading(true);
    const isResetPassTokResult = await validateResetPassTok(rpt);
    setIsAuthLoading(false);
    return isResetPassTokResult;
  };

  /*  
    https://reactjs.org/docs/hooks-reference.html#usememo
    Memoization is essentially caching. The variable value will only be recalculated if the variables in the watched array change.
  */

  const value = useMemo(
    () => ({
      userToken,
      isAdminLoginCheck,
      isCoachLoginCheck,
      applyForCoach,
      loginUser,
      signUpUser,
      logoutUser,
      verifyAdmin,
      verifyCoach,
      verifyResetPassTok,
      setIsCoachLoginCheck,
      setIsAdminLoginCheck,
    }),
    [
      isAuthLoading,
      isCoachLoginCheck,
      isAdminLoginCheck,
      userToken,
      logoutUser,
      signUpUser,
      loginUser,
      applyForCoach,
      logoutUser,
      verifyAdmin,
      verifyCoach,
      verifyResetPassTok,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const validateApplyForCoach = async (coachInfo, token) => {
  const response = await fetch(`${urlEndpoint}/auth/become-coach`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify(coachInfo),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const validateLoginUser = async (email, password) => {
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
  return responseJSON;
};

const validateSignUpUser = async (email, password) => {
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

const validateAdmin = async (userToken) => {
  const url = `${urlEndpoint}/auth/validate-admin`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const validateCoach = async (userToken) => {
  const url = `${urlEndpoint}/auth/validate-coach`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: userToken,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

const validateResetPassTok = async (rpt) => {
  const url = `${urlEndpoint}/auth/validate-reset-password-token`;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      rpt: rpt,
    },
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export const setLocalUserToken = async (token) => {
  return await localStorage.setItem("token", JSON.stringify(token));
};

export const removeUserToken = async () => {
  return await localStorage.removeItem("token");
};

export const getLocalUserToken = async () => {
  return await JSON.parse(localStorage.getItem("token"));
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${urlEndpoint}/auth/forgot-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export const resetPassword = async (rpt, password) => {
  const response = await fetch(`${urlEndpoint}/auth/reset-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      rpt,
      password,
    }),
  });
  const responseJSON = await response.json();
  return responseJSON;
};

// export const getResetPasswordToken = () => {
//   const response = await fetch(`${urlEndpoint}/auth/get-reset-password-data`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body:
//   })
// }

// export default Auth;
