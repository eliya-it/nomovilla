import { useState, ChangeEvent, FormEvent, FunctionComponent } from "react";
import Section from "@components/utils/Section";
import Form from "@ui/Form";
import Input from "@ui/Input";
import Button from "@components/utils/Button";
import useFirebaseError from "@hooks/useFirebaseError";
import { auth } from "@/firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  User,
  UserCredential,
} from "firebase/auth";
import useLocalStorage from "@hooks/useLocalStorage";
import useAsync from "@hooks/useAsync";
import Message from "@ui/Message";
import usePasswordValidator from "@hooks/usePasswordValidator";
interface UserData {
  name: string | undefined;
  email: string | undefined;
  curPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  expiresIn: number; // This property is required
  token: string;
}

const ChangeUserPassword: FunctionComponent = () => {
  const [user, setUser] = useLocalStorage<UserData>("user");
  const { dispatch, message, isLoading, error } = useAsync();
  const { handleFirebaseErr } = useFirebaseError();

  const [userData, setUserData] = useState<UserData>({
    name: user?.name,
    email: user?.email,
    curPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    expiresIn: 0,
    token: user?.token || "",
  });

  const passwordValidation = usePasswordValidator(
    userData.curPassword as string,
    userData.newPassword as string,
    userData.confirmNewPassword as string
  );

  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      dispatch({
        type: "SEND",
      });

      const curUser = auth.currentUser;
      if (curUser) {
        const cred = EmailAuthProvider.credential(
          curUser.email as string,
          userData.curPassword as string
        );
        const userCredential: UserCredential =
          await reauthenticateWithCredential(curUser, cred);
        const user: User = userCredential.user as User;
        const stsTokenManager = (user as any).stsTokenManager;

        setUser({
          name: user.displayName || "",
          email: user.email || "",
          token: await user.getIdToken(),
          expiresIn: stsTokenManager.expirationTime, // Ensure this property is included
        });
        await updatePassword(curUser, userData.newPassword || "");
        dispatch({
          type: "RESPONSE",
          message: "Password updated successfully!",
        });
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
      });
      handleFirebaseErr(err);
    }
  };

  return (
    <Section isBorder>
      {error ? <Message message={error} status="fail" key={error} /> : null}
      {message ? <Message message={message} key={message} /> : null}
      <Form
        isCol
        isFlex={false}
        onSubmit={changePassword}
        valMsg={
          !passwordValidation.passwordMatch ? "Passwords do not match!" : ""
        }
      >
        <Input
          type="password"
          label="Old password"
          name="curPassword"
          placeholder="********"
          onChange={handleUserData}
        />
        <Input
          type="password"
          label="New Password"
          placeholder="********"
          onChange={handleUserData}
          name="newPassword"
        />
        <Input
          type="password"
          label="Confirm New Password"
          placeholder="********"
          onChange={handleUserData}
          name="confirmNewPassword"
        />
        <Button
          text="Update"
          isLoading={isLoading ?? false}
          disabled={!passwordValidation.isFormValid}
        />
      </Form>
    </Section>
  );
};

export default ChangeUserPassword;
