import { ReactNode, FormEvent, FunctionComponent } from "react";
import FormCl from "./Form.module.css";

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
      className={`${FormCl.form} ${className ? className : ""} ${
        isCol ? FormCl.colForm : ""
      } ${!isFlex ? FormCl.formWidth : ""}`}
      onSubmit={onSubmit}
    >
      <p className={FormCl.formErr}>{valMsg}</p>
      {children}
    </form>
  );
};

export default Form;
