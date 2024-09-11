import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthContext from "@hooks/useAuthContext";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, CustomUser } from "@/firebase";
import useFirebaseError from "@hooks/useFirebaseError";

interface UseLoginReturn {
  loginHandler: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
}

const useLogin = (): UseLoginReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleFirebaseErr, error } = useFirebaseError();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const loginHandler = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user: CustomUser = userCredential.user as CustomUser; // Cast to CustomUser

      if (user) {
        const token = await user.getIdToken();
        const userObj = {
          name: user.displayName || email,
          email: user.email as string,
          isVerified: user.emailVerified || "",
          token,
          uid: user.uid,
          expiresIn: user.stsTokenManager?.expirationTime,
        };

        login(userObj);
        setIsLoading(false);
        navigate("/");
      }
    } catch (err) {
      handleFirebaseErr(err);
      setIsLoading(false);
    }
  };

  return { loginHandler, error, isLoading };
};

export default useLogin;
