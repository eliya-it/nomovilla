import React, { ReactNode, MouseEventHandler, FunctionComponent } from "react";
import { btn, btnPrimary, btnRow } from "./Button.module.css";

interface ButtonProps {
  disabled?: boolean;
  className?: string;
  children?: ReactNode;
  text?: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isReset?: boolean;
  isRow?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  disabled,
  className,
  children,
  text,
  isLoading,
  onClick,
  isReset,
  isRow,
}) => {
  return (
    <button
      className={`${isReset ? "" : `${btn} ${btnPrimary}`} ${
        className ? className : ""
      } ${isRow ? btnRow : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? "Loading..." : text}
      {children}
    </button>
  );
};

export default Button;
