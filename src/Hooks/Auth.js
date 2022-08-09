import { useState, useEffect, createContext, useContext, useMemo } from "react";

// Heroku
// const urlEndpoint = process.env.REACT_APP_DATABASE_URL;

//LOCAL
const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [fromBecomeCoach, setFromBecomeCoach] = useState(false);
  const [isAdminLoginCheck, setIsAdminLoginCheck] = useState(false);
  const [isCoachLoginCheck, setIsCoachLoginCheck] = useState(false);

  //UseEffect to check and update UserToken
  useEffect(() => {
    const userTokenn = getLocalUserToken();
    setUserToken(userTokenn);
  }, [isAuthLoading]);

  //UseEffect to check and update isAdminLoginCheck
  useEffect(() => {
    const isAdminCheck = async () => {
      await verifyAdmin();
    };
    isAdminCheck();
  }, [userToken]);

  //UseEffect to check and update isCoachLoginCheck
  useEffect(() => {
    const isCoachCheck = async () => {
      await verifyCoach();
    };
    isCoachCheck();
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
  const becomeCoach = async (coachObj) => {
    setIsAuthLoading(true);
    const becomeCoachResult = await validateBecomeCoach(coachObj);
    setIsAuthLoading(false);
    return becomeCoachResult;
  };

  // call this function to sign out logged in user
  const logoutUser = async () => {
    setIsAuthLoading(true);
    await removeUserToken();
    setIsAuthLoading(false);
    return true;
  };

  const verifyAdmin = async () => {
    setIsAuthLoading(true);
    const isAdminResult = await validateAdmin(userToken);
    if (isAdminResult.success) {
      setIsAdminLoginCheck(isAdminResult.isAdmin);
      return isAdminResult.isAdmin;
    } else {
    }
    setIsAuthLoading(false);
    return false;
  };

  const verifyCoach = async () => {
    setIsAuthLoading(true);
    const isCoachResult = await validateCoach(userToken);
    if (isCoachResult.success) {
      setIsCoachLoginCheck(isCoachResult.isCoach);
      return isCoachResult.isCoach;
    } else {
    }
    setIsAuthLoading(false);
    return false;
  };

  /*  
    https://reactjs.org/docs/hooks-reference.html#usememo
    Memoization is essentially caching. The variable value will only be recalculated if the variables in the watched array change.
  */

  const value = useMemo(
    () => ({
      userToken,
      fromBecomeCoach,
      isAdminLoginCheck,
      isCoachLoginCheck,
      setFromBecomeCoach,
      becomeCoach,
      loginUser,
      signUpUser,
      logoutUser,
      verifyAdmin,
      verifyCoach,
    }),
    [userToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const validateBecomeCoach = async (coachObj) => {
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
  return responseJSON.success;
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

export const setLocalUserToken = (token) => {
  return localStorage.setItem("token", JSON.stringify(token));
};

export const removeUserToken = () => {
  return localStorage.removeItem("token");
};

export const getLocalUserToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

// export default Auth;
