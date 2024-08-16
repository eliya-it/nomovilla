import { useState } from "react";
import { useNavigate } from "react-router";
import useLocalStorage from "@hooks/useLocalStorage";
import useAuthContext from "@hooks/useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import useFirebaseError from "@hooks/useFirebaseError";

// Define the return type for the useLogin hook
interface UseLoginReturn {
  loginHandler: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleFirebaseErr, error } = useFirebaseError();
  const { dispatch } = useAuthContext();
  const [user, setUser] = useLocalStorage("user");
  const navigate = useNavigate();

  const loginHandler = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userObj = {
        name: user.displayName,
        email: user.email,
        isVerified: user.emailVerified, // Corrected property
        token: user.accessToken,
        id: user.uid,
        expiresIn: auth.currentUser.stsTokenManager.expirationTime,
      };
      setUser(userObj);
      dispatch({
        type: "LOGIN",
        user: userObj,
      });
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      handleFirebaseErr(err);
      setIsLoading(false);
    }
  };

  return { loginHandler, error, isLoading };
};

export default useLogin;
