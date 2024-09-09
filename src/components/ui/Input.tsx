import React, {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEventHandler,
} from "react";
import {
  input,
  label as labelCl,
  formControl,
  error as errorCl,
} from "./Input.module.css";
interface Props {
  type?: "search" | "text" | "password";
  placeholder?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  val?: string;
  label?: string;
  validationMsg?: string;
  name?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  required?: boolean;
  isReset?: boolean;
  isConfirmPassword?: boolean;
}
const Input: FunctionComponent<Props> = ({
  type = "text",
  placeholder,
  id,
  onChange,
  val,
  label,
  name,
  disabled,
  isReset,
  validationMsg,
  min = 5,
  max,
  required,
}) => {
  const [errMsg, setErrMsg] = useState<string>(validationMsg as string | "");
  const checkValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateInput = (type, val) => {
    const minPassword = 8;
    if (type === "password" && val.length < minPassword) {
      return `Password must be between ${minPassword}-${32} characters.`;
    } else if (type === "email" && !checkValidEmail(val)) {
      return "Invalid email!";
    } else if (type === "text" && val.length < min) {
      return `${label} must be between ${min} and ${max} characters.`;
    }
    return null;
  };

  useEffect(() => {
    setErrMsg(validationMsg);
  }, [validationMsg]);

  const onChangeHandler = (e) => {
    const val = e.target.value;
    const errorMsg = validateInput(type, val);
    setErrMsg(errorMsg);
    if (onChange) onChange(e);
  };

  const renderInput = () => {
    return (
      <input
        className={!isReset && input}
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChangeHandler}
        minLength={min}
        maxLength={max}
        name={name}
        required={required}
        key={id}
        defaultValue={val || ""}
      />
    );
  };

  const isRequired = ["email", "name", "password"].includes(type);
  const requiredLabel = `${label ? `${isRequired ? `${label}*` : label}` : ""}`;
  return (
    <div className={formControl}>
      <label htmlFor={id} className={labelCl}>
        {requiredLabel}
      </label>
      {renderInput()}
      {errMsg && <p className={errorCl}>{errMsg}</p>}
    </div>
  );
};

export default Input;
