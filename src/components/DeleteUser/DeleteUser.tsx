import React, { FunctionComponent, useState } from "react";

import { v4 as uuid } from "uuid";
import { deleteUser } from "firebase/auth";
import { auth } from "@/firebase";
import { deleteBtn } from "./DeleteUser.module.css";
import { useNavigate } from "react-router-dom";
import Section from "@components/utils/Section";
import useAuthContext from "@hooks/useAuthContext";
import useFirebaseError from "@hooks/useFirebaseError";

const DeleteUser: FunctionComponent = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { handleFirebaseErr, error } = useFirebaseError();
  const handleDelete = async () => {
    try {
      await deleteUser(auth?.currentUser);
      localStorage.removeItem("user");

      dispatch({
        type: "DELETE",
      });
      navigate("/");
    } catch (err) {
      handleFirebaseErr(err);
    }
  };

  return (
    <Section>
      <button onClick={handleDelete} className={deleteBtn}>
        Delete Your Account
      </button>
    </Section>
  );
};

export default DeleteUser;
