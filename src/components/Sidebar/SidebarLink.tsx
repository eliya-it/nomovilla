import { FunctionComponent, ReactNode } from "react";
import Item from "@components/utils/Item";
import { NavLink } from "react-router-dom";
import SidebarLinkCl from "./SidebarLink.module.css";
interface Props {
  children: ReactNode;
  to: string;
}
const SidebarLink: FunctionComponent<Props> = ({ to, children }) => {
  return (
    <Item className={SidebarLinkCl.sidebarItem}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? `${SidebarLinkCl.sidebarLink} ${SidebarLinkCl.sidebarLinkActive}`
            : SidebarLinkCl.sidebarLink
        }
      >
        {children}
      </NavLink>
    </Item>
  );
};

export default SidebarLink;
