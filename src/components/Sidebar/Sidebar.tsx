import { useState, useEffect, FunctionComponent } from "react";
import SidebarCl from "./Sidebar.module.css";
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
import SidebarLink from "./SidebarLink";
import Copyright from "@components/Copyright/Copyright";

import { auth } from "@/firebase";

const Sidebar: FunctionComponent = () => {
  const { user, user: curUserAuth, logout } = useAuthContext();
  const [show, setShow] = useState(false);

  const toggleMenu = () => {
    setShow(!show);
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
    if (user?.token) autoLogout(user.expiresIn);
  }, [auth?.currentUser]);

  return (
    <>
      <nav className={SidebarCl.sidebar}>
        <button onClick={toggleMenu} className={SidebarCl.menuBtn}>
          <MdMenu />
        </button>
        <div
          className={`${SidebarCl.overlay} ${
            show ? SidebarCl.overlayScaled : ""
          }`}
        ></div>
        <List
          className={`${SidebarCl.sidebarList} ${
            show ? SidebarCl.sidebarListActive : ""
          }`}
          isCol
        >
          <SidebarLink to="/">
            <MdHome className={SidebarCl.icon} />
            <span>Home</span>
          </SidebarLink>
          <SidebarLink to="/meals">
            <MdRestaurant className={SidebarCl.icon} />
            <span>Meals</span>
          </SidebarLink>

          {curUserAuth ? (
            <>
              <SidebarLink to="/me">
                <MdDashboard className={SidebarCl.icon} />
                <span>Dashboard</span>
              </SidebarLink>
              <SidebarLink to="/bookmarks">
                <MdBookmark className={SidebarCl.icon} />
                <span>Bookmarks</span>
              </SidebarLink>
              <Item className="sidebar__item">
                <button onClick={logout} className={SidebarCl.logoutBtn}>
                  <MdLogout className={SidebarCl.icon} />
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
