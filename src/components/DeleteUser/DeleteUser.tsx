import { FunctionComponent } from "react";

import { deleteUser } from "firebase/auth";
import { auth } from "@/firebase";
import DeleteUserCl from "./DeleteUser.module.css";
import { useNavigate } from "react-router-dom";
import Section from "@components/utils/Section";
import useAuthContext from "@hooks/useAuthContext";
import useFirebaseError from "@hooks/useFirebaseError";
import Message from "../ui/Message";

const DeleteUser: FunctionComponent = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { handleFirebaseErr, error } = useFirebaseError();
  const handleDelete = async () => {
    try {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
        localStorage.removeItem("user");
        dispatch({
          type: "DELETE",
        });
        navigate("/");
      }
    } catch (err) {
      handleFirebaseErr(err);
    }
  };

  return (
    <Section>
      {error && <Message status="fail" message={error} />}
      <button onClick={handleDelete} className={DeleteUserCl.deleteBtn}>
        Delete Your Account
      </button>
    </Section>
  );
};

export default DeleteUser;
