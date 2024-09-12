import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from "firebase/auth";

import { useNavigate } from "react-router";
import useFirebaseError from "@hooks/useFirebaseError";
import useLocalStorage from "@hooks/useLocalStorage";
import useAsync from "@hooks/useAsync";
import useAuthContext from "@hooks/useAuthContext";
import { auth, CustomUser } from "@/firebase";

interface UseSignupReturn {
  signup: (email: string, password: string) => Promise<void>;
  isLoading: boolean | null;
  error: string;
}
const useSignup = (): UseSignupReturn => {
  const { dispatch, isLoading } = useAsync();
  const { signup: dispatchSignup } = useAuthContext();
  const [_, setUser] = useLocalStorage("user");
  const navigate = useNavigate();
  const { handleFirebaseErr, error } = useFirebaseError();

  const signup = async (email: string, password: string) => {
    try {
      dispatch({
        type: "SEND",
      });
      const newUser: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user: CustomUser = newUser.user as unknown as CustomUser;
      const stsTokenManager = (user as any).stsTokenManager;

      if (user) {
        sendEmailVerification(user);
        const userObj = {
          name: user.displayName || email, // Fallback to email if displayName is not set
          email: user.email as string,
          isVerified: user.emailVerified || "",
          token: user.accessToken || "",
          uid: user.uid,
          expiresIn: stsTokenManager.expirationTime,
        };

        setUser(userObj);
        dispatchSignup(userObj);
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "ERROR" });
      handleFirebaseErr(err);
    }
  };
  return { signup, isLoading, error };
};

export default useSignup;
