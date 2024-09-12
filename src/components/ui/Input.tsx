import {
  useState,
  useEffect,
  FunctionComponent,
  ChangeEventHandler,
  ChangeEvent,
} from "react";
import InputCl from "./Input.module.css";
interface Props {
  type?: "email" | "search" | "text" | "password";
  placeholder?: string;
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  val?: string | null;
  label?: string;
  validationMsg?: string | null;
  name?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  required?: boolean;
  isReset?: boolean;
  isConfirmPassword?: boolean;
  className?: string;
}
const Input: FunctionComponent<Props> = ({
  type = "text",
  placeholder,
  id,
  onChange,
  val,
  label,
  name,

  isReset,
  validationMsg,
  min = 5,
  max,
  required,
}) => {
  const [errMsg, setErrMsg] = useState<string | null>(
    validationMsg as string | ""
  );
  const checkValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validateInput = (type: string, val: string) => {
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
    setErrMsg(validationMsg || "");
  }, [validationMsg]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const errorMsg = validateInput(type, val);
    setErrMsg(errorMsg);
    if (onChange) onChange(e);
  };

  const renderInput = () => {
    return (
      <input
        className={!isReset ? InputCl.input : ""}
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
    <div className={InputCl.formControl}>
      {label && (
        <label htmlFor={id} className={InputCl.label}>
          {requiredLabel}
        </label>
      )}
      {renderInput()}
      {errMsg && <p className={InputCl.error}>{errMsg}</p>}
    </div>
  );
};

export default Input;
