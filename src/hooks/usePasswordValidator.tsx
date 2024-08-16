import { useEffect, useState } from "react";

interface PasswordValidation {
  curPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
  passwordMatch: boolean;
  isFormValid: boolean;
}

const usePasswordValidator = (
  curPassword: string,
  newPassword: string,
  confirmNewPassword: string
): PasswordValidation => {
  const [passwordValidation, setPasswordValidation] =
    useState<PasswordValidation>({
      curPassword: false,
      newPassword: false,
      confirmNewPassword: false,
      passwordMatch: false,
      isFormValid: false,
    });

  useEffect(() => {
    const validations: PasswordValidation = {
      curPassword: curPassword.length >= 6,
      newPassword: newPassword.length >= 6,
      confirmNewPassword: confirmNewPassword.length >= 6,
      passwordMatch: newPassword === confirmNewPassword,
      isFormValid:
        curPassword.length >= 6 &&
        newPassword.length >= 6 &&
        confirmNewPassword.length >= 6 &&
        newPassword === confirmNewPassword,
    };

    setPasswordValidation(validations);
  }, [curPassword, newPassword, confirmNewPassword]);

  return passwordValidation;
};

export default usePasswordValidator;
