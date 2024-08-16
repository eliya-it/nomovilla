import React, { FunctionComponent, ReactNode } from "react";
import Item from "@components/utils/Item";
import { NavLink } from "react-router-dom";
import {
  sidebarLink,
  sidebarItem,
  sidebarLinkActive,
} from "./SidebarLink.module.css";
interface Props {
  children: ReactNode;
  to: string;
}
const SidebarLink: FunctionComponent<Props> = ({ to, children }) => {
  return (
    <Item className={sidebarItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${sidebarLink} ${sidebarLinkActive}` : sidebarLink
        }
      >
        {children}
      </NavLink>
    </Item>
  );
};

export default SidebarLink;
