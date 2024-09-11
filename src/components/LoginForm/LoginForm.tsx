import { ChangeEventHandler, FormEvent, FunctionComponent } from "react";
import Input from "@ui/Input";
import Form from "@ui/Form";
import Button from "@components/utils/Button";
import { Link } from "react-router-dom";
import LoginCl from "./LoginForm.module.css";
interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  dataCb: ChangeEventHandler<HTMLInputElement>;
  isLoading: boolean;
  disabled: boolean;
}
const LoginForm: FunctionComponent<Props> = ({
  onSubmit,
  dataCb,
  isLoading,
  disabled,
}) => {
  return (
    <Form isCol onSubmit={onSubmit}>
      <Input
        label="Email"
        placeholder="user@nomovilla.com"
        type="email"
        id="email"
        name="email"
        onChange={dataCb}
        required
      />
      <Input
        label="Password"
        type="password"
        placeholder="********"
        name="password"
        id="password"
        onChange={dataCb}
      />
      <Button text="Login" isLoading={isLoading} disabled={disabled} />
      <p className={LoginCl.formText}>
        Forgot your password?, no problem click{" "}
        <Link to="/forgot-password" className={LoginCl.formLink}>
          Reset
        </Link>
        .
      </p>
    </Form>
  );
};

export default LoginForm;
