import React, { ChangeEventHandler, FunctionComponent } from "react";
import { input, label, control } from "./Input.module.css";

interface Props {
  type?: "search" | "text" | "password";
  placeholder?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  val?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  isReset?: boolean;
}

const Input: FunctionComponent<Props> = ({
  type = "text",
  placeholder,
  id,
  onChange,
  val,
  label: labelText,
  name,
  disabled,
  isReset,
}) => {
  return (
    <div className={control}>
      <label htmlFor={id} className={label}>
        {labelText}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={onChange}
        className={!isReset && input}
        name={name || ""}
        defaultValue={val || ""}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
