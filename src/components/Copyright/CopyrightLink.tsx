import { FunctionComponent, ReactNode } from "react";
import Item from "@components/utils/Item";
import CopyrightLinkCl from "./CopyrightLink.module.css";
interface Props {
  children: ReactNode;
  to: string;
}
const CopyrightLink: FunctionComponent<Props> = ({ children, to }) => {
  return (
    <Item>
      <a href={to} className={CopyrightLinkCl.link} target="_blank">
        {children}
      </a>
    </Item>
  );
};

export default CopyrightLink;
