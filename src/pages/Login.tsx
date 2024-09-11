import { useState, ChangeEvent, FormEvent, FunctionComponent } from "react";
import LoginCl from "./Login.module.css";
import Message from "@ui/Message";
import useAuthContext from "@hooks/useAuthContext";
import Heading from "@components/common/Heading/Heading";
import LoginForm from "@components/LoginForm/LoginForm";
import useLogin from "@hooks/user/useLogin";
import { v4 as uuid } from "uuid";
const Login: FunctionComponent = () => {
  const [userData, setUserData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );
  const { user: curAuthUser } = useAuthContext();
  const { loginHandler, isLoading, error } = useLogin();
  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginHandler(userData.email, userData.password);
  };
  if (!curAuthUser) {
    return (
      <div className={LoginCl.login}>
        {error && <Message message={error} status="fail" key={uuid()} />}
        <LoginForm
          dataCb={handleUserData}
          isLoading={isLoading}
          onSubmit={handleLogin}
          disabled={userData.email === "" || userData.password === ""}
        />
      </div>
    );
  } else if (curAuthUser && !isLoading) {
    return <Heading isSecond>You are already logged in! </Heading>;
  }
};

export default Login;
