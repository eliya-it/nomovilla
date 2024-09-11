import { FunctionComponent, ReactNode } from "react";
import ContentCl from "./Content.module.css";

interface Props {
  children: ReactNode;
}

const Content: FunctionComponent<Props> = ({ children }) => {
  return <div className={ContentCl.content}>{children}</div>;
};
export default Content;
