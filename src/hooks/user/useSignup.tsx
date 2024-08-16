import React from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

import { useNavigate } from "react-router";
import useFirebaseError from "@hooks/useFirebaseError";
import useLocalStorage from "@hooks/useLocalStorage";
import useAsync from "@hooks/useAsync";
import useAuthContext from "@hooks/useAuthContext";
import { auth } from "@/firebase";
interface UseSignupReturn {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}
const useSignup = (): UseSignupReturn => {
  const { dispatch, isLoading } = useAsync();
  const { dispatch: disptachUser } = useAuthContext();
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const { handleFirebaseErr, error } = useFirebaseError();

  const signup = async (email: string, password: string) => {
    try {
      dispatch({
        type: "SEND",
      });
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      sendEmailVerification(user);
      const userObj = {
        name: user.displayName,
        email: user.email,
        isVerified: user.isVerified,
        id: user.uid,
        token: user.accessToken,
        expiresIn: auth.currentUser.stsTokenManager.expirationTime,
      };
      setUser(userObj);
      disptachUser({
        type: "SIGNUP",
        user: userObj,
      });
      navigate("/");
    } catch (err) {
      dispatch({ type: "ERROR" });
      handleFirebaseErr(err);
    }
  };
  return { signup, isLoading, error };
};

export default useSignup;
