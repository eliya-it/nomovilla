import React, { ChangeEvent, FunctionComponent, useEffect } from "react";
import { useState } from "react";
import useAuthContext from "@hooks/useAuthContext";
import Heading from "@components/common/Heading/Heading";
import SignupForm from "@components/SignupForm/SignupForm";
import useSignup from "@hooks/user/useSignup";
import Message from "@ui/Message";
import { sign } from "./Signup.module.css";
interface UserData {
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup: FunctionComponent = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [valMsg, setValMsg] = useState<string>("");
  const { user } = useAuthContext();
  const { signup, isLoading, error } = useSignup();
  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    if (
      userData.confirmPassword.length > 0 &&
      userData.confirmPassword !== userData.password
    )
      setValMsg("Password does NOT match!");
    else setValMsg("");
  }, [userData]);
  if (!user) {
    return (
      <div className={sign}>
        {error && <Message message={error} status="fail" />}
        <SignupForm
          onSignup={() => signup(userData.email, userData.password)}
          isLoading={isLoading}
          valMsg={valMsg}
          handleUserData={handleUserData}
        />
      </div>
    );
  } else if (user && !isLoading) {
    return <Heading isSecond>You must logout to create a new account!</Heading>;
  }
};

export default Signup;
