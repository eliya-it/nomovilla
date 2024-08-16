import React, {
  useState,
  ChangeEvent,
  FormEvent,
  FunctionComponent,
} from "react";
import Section from "@components/utils/Section";
import Form from "@ui/Form";
import Input from "@ui/Input";
import Button from "@components/utils/Button";
import { auth } from "@/firebase";
import { updateProfile } from "firebase/auth";
import useAuthContext from "@hooks/useAuthContext";
import useLocalStorage from "@hooks/useLocalStorage";
import useFirebaseError from "@hooks/useFirebaseError";
import useAsync from "@hooks/useAsync";
import Message from "@ui/Message";

interface UserData {
  name: string | null;
  email: string | null;
}

const ChangeUserInfo: FunctionComponent = () => {
  const [user, setUser] = useLocalStorage<UserData>("user");
  const currentAuthUser = auth.currentUser;
  const { dispatch } = useAuthContext();
  const { handleFirebaseErr, error } = useFirebaseError();

  const { dispatch: dispatchAsync, message, isLoading } = useAsync();

  const [userData, setUserData] = useState<UserData>({
    name: null,
    email: null,
  });

  const changeName = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatchAsync({
        type: "SEND",
      });
      await updateProfile(auth.currentUser, {
        displayName: userData.name,
      });
      const userObj = {
        name: currentAuthUser.displayName,
        email: currentAuthUser.email,
        id: currentAuthUser.uid,
        token: currentAuthUser.accessToken,
      };

      dispatch({
        type: "UPDATE",
        user: userObj,
      });
      dispatchAsync({
        type: "RESPONSE",
        message: "Name updated successfully!",
      });
      setUser(userObj);
    } catch (err) {
      dispatch({
        type: "ERROR",
      });
      handleFirebaseErr(err);
    }
  };

  const hanldeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Section isBorder>
      {message ? <Message message={message} /> : null}
      <Form onSubmit={changeName} isFlex={false} isCol>
        <Input
          label="Name"
          placeholder={!user?.name ? "Set your name here" : "John Doe"}
          val={user?.name}
          onChange={hanldeUserData}
          name="name"
        />
        <Input
          label="Email"
          placeholder="user@nomovilla.com"
          name="email"
          val={user?.email}
          onChange={hanldeUserData}
          disabled
        />
        <Button text="Update" isLoading={isLoading} />
      </Form>
    </Section>
  );
};

export default ChangeUserInfo;
