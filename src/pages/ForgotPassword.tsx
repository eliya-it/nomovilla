import React, { FunctionComponent } from "react";
import { forgotPassword } from "./ForgotPassword.module.css";
import Input from "@ui/Input";
import Form from "@ui/Form";
import Section from "@components/utils/Section";
import Button from "@components/utils/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Heading from "@components/common/Heading/Heading";
import useFirebaseError from "@hooks/useFirebaseError";
import Message from "@ui/Message";

const ForgotPassword: FunctionComponent = () => {
  const { handleFirebaseErr, error } = useFirebaseError();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, auth.currentUser?.email || "");
    } catch (err) {
      handleFirebaseErr(err);
    }
  };

  return (
    <Section>
      {error && <Message message={error} status="fail" />}
      <div className={forgotPassword}>
        <h3 className="heading--tertiary">Forgot your password?</h3>
        <Heading isForth>Enter your email below to reset it.</Heading>
        <Form onSubmit={handleForgotPassword} isCol>
          <Input placeholder="user@nomovilla.com" type="search" id="name" />
          <Button text={"Submit"} />
        </Form>
      </div>
    </Section>
  );
};

export default ForgotPassword;
