import React, { ReactNode, FormEvent, FunctionComponent } from "react";
import { form, colForm, formErr, formWidth } from "./Form.module.css";

interface Props {
  className?: string;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  isCol?: boolean;
  valMsg?: string;
  isFlex?: boolean;
}

const Form: FunctionComponent<Props> = ({
  className,
  onSubmit,
  children,
  isCol,
  valMsg,
  isFlex = true,
}) => {
  return (
    <form
      className={`${form} ${className ? className : ""} ${
        isCol ? colForm : ""
      } ${!isFlex ? formWidth : ""}`}
      onSubmit={onSubmit}
    >
      <p className={formErr}>{valMsg}</p>
      {children}
    </form>
  );
};

export default Form;
