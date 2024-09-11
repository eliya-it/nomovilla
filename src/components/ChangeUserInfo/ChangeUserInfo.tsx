import { useState, ChangeEvent, FormEvent, FunctionComponent } from "react";
import Section from "@components/utils/Section";
import Form from "@ui/Form";
import Input from "@ui/Input";
import Button from "@components/utils/Button";
import { auth, User } from "@/firebase";
import { updateProfile } from "firebase/auth";
import useAuthContext from "@hooks/useAuthContext";
import useLocalStorage from "@hooks/useLocalStorage";
import useFirebaseError from "@hooks/useFirebaseError";
import useAsync from "@hooks/useAsync";
import Message from "@ui/Message";
interface UserData {
  name: string | null;
  email: string | null;
  uid?: string;
  token: string;
  expiresIn?: number;
  stsTokenManager?: any;
}

const ChangeUserInfo: FunctionComponent = () => {
  const [user, setUser] = useLocalStorage<UserData>("user");
  const currentAuthUser = auth.currentUser;
  const { dispatch, update } = useAuthContext();
  const { handleFirebaseErr } = useFirebaseError();

  const { dispatch: dispatchAsync, message, isLoading } = useAsync();

  const [userData, setUserData] = useState<UserData>({
    name: user?.name || "",
    email: user?.email || "",
    token: user?.token || "",
    expiresIn: 0,
  });

  const changeName = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatchAsync({
        type: "SEND",
      });

      if (currentAuthUser) {
        await updateProfile(currentAuthUser, {
          displayName: userData.name || "",
        });

        const userObj: User = {
          name: currentAuthUser.displayName as string,
          email: currentAuthUser.email || "",
          uid: currentAuthUser.uid,
          token: await currentAuthUser.getIdToken(),
          stsTokenManager: (currentAuthUser as any).stsTokenManager,
        };

        update(userObj);
        dispatchAsync({
          type: "RESPONSE",
          message: "Name updated successfully!",
        });
        setUser(userObj);
      }
    } catch (err) {
      dispatch({
        type: "ERROR",
      });
      handleFirebaseErr(err);
    }
  };

  const hanldeUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
        <Button text="Update" isLoading={isLoading ?? false} />
      </Form>
    </Section>
  );
};

export default ChangeUserInfo;
