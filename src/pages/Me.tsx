import { FunctionComponent } from "react";
import ChangeUserInfo from "@components/ChangeUserInfo/ChangeUserInfo";
import ChangeUserPassword from "@components/ChangeUserPassword/ChangeUserPassword";
import DeleteUser from "@components/DeleteUser/DeleteUser";
import PageTransition from "@ui/PageTransition";

const Me: FunctionComponent = () => {
  return (
    <PageTransition>
      <ChangeUserInfo />
      <ChangeUserPassword />
      <DeleteUser />
    </PageTransition>
  );
};

export default Me;
