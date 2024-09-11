import { FunctionComponent } from "react";

import UserHeaderCl from "./UserHeader.module.css";
import { Link } from "react-router-dom";
import List from "@components/utils/List";
import Item from "@components/utils/Item";
import useAuthContext from "@hooks/useAuthContext";
const UserHeader: FunctionComponent = () => {
  const { user } = useAuthContext();

  return (
    <nav className={UserHeaderCl.userHeader}>
      {!user ? (
        <List>
          <Item>
            <Link to="/login" className={UserHeaderCl.authLink}>
              Login
            </Link>
          </Item>{" "}
          <Item>
            <Link to="/signup" className={UserHeaderCl.authLink}>
              Signup
            </Link>
          </Item>
        </List>
      ) : (
        <p className={UserHeaderCl.username}>{user.name || user.email}</p>
      )}
    </nav>
  );
};

export default UserHeader;
