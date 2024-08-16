import React, {
  useState,
  useEffect,
  MouseEvent,
  FunctionComponent,
} from "react";
import {
  sidebar,
  sidebarList,
  icon,
  overlay,
  overlayScaled,
  logoutBtn,
  menuBtn,
  sidebarListActive,
} from "./Sidebar.module.css";
import {
  MdBookmark,
  MdDashboard,
  MdHome,
  MdLogout,
  MdMenu,
  MdRestaurant,
} from "react-icons/md";
import List from "@components/utils/List";
import Item from "@components/utils/Item";
import useAuthContext from "@hooks/useAuthContext";

import { useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import Copyright from "@components/Copyright/Copyright";

import { auth } from "@/firebase";

const Sidebar: FunctionComponent = () => {
  const { dispatch, user: curUserAuth } = useAuthContext();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
  };

  const logout = () => {
    // 1) Remove user from localStorage
    localStorage.removeItem("user");
    // 2) Set user to null in auth context
    dispatch({
      type: "LOGOUT",
    });
    navigate("/login");
  };

  // Auto logout
  const autoLogout = (tokenExp: number | undefined) => {
    if (tokenExp) {
      const untilLogout = tokenExp - Date.now();
      if (untilLogout > 0) {
        setTimeout(() => {
          return logout();
        }, untilLogout);
      }
    }
  };

  useEffect(() => {
    autoLogout(auth.currentUser?.stsTokenManager?.expirationTime);
  }, [auth?.currentUser]);

  return (
    <>
      <nav className={sidebar}>
        <button onClick={toggleMenu} className={menuBtn}>
          <MdMenu />
        </button>
        <div className={`${overlay} ${show ? overlayScaled : ""}`}></div>
        <List
          className={`${sidebarList} ${show ? sidebarListActive : ""}`}
          isCol
        >
          <SidebarLink to="/">
            <MdHome className={icon} />
            <span>Home</span>
          </SidebarLink>
          <SidebarLink to="/meals">
            <MdRestaurant className={icon} />
            <span>Meals</span>
          </SidebarLink>

          {curUserAuth ? (
            <>
              <SidebarLink to="/me">
                <MdDashboard className={icon} />
                <span>Dashboard</span>
              </SidebarLink>
              <SidebarLink to="/bookmarks">
                <MdBookmark className={icon} />
                <span>Bookmarks</span>
              </SidebarLink>
              <Item className="sidebar__item" text="Home" link="#">
                <button onClick={logout} className={logoutBtn}>
                  <MdLogout className={icon} />
                  Logout
                </button>
              </Item>
            </>
          ) : null}
        </List>
        <Copyright />
      </nav>
    </>
  );
};

export default Sidebar;
