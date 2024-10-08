import React, { ChangeEvent, FormEvent } from "react";
import Input from "@ui/Input";
import Button from "@components/utils/Button";
import Form from "@ui/Form";

interface Props {
  valMsg: string;
  onSignup: () => void;
  handleUserData: (e: ChangeEvent<HTMLInputElement>) => void; // Function to handle input changes
  isLoading: boolean | null;
}

const SignupForm: React.FC<Props> = ({
  onSignup,
  valMsg,
  handleUserData,
  isLoading,
}) => {
  const handler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <Form isCol onSubmit={handler} valMsg={valMsg}>
      <Input
        placeholder="user@example.com"
        label="Email"
        type="email"
        name="email"
        onChange={handleUserData}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        name="password"
        onChange={handleUserData}
      />
      <Input
        type="password"
        placeholder="Confirm your password"
        label="Confirm Password"
        name="confirmPassword"
        onChange={handleUserData}
      />
      <Button
        text="Signup"
        disabled={valMsg !== ""}
        isLoading={isLoading ?? false}
      />
    </Form>
  );
};

export default SignupForm;
