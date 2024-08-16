import React, { FunctionComponent, ReactNode } from "react";
import { content } from "./Content.module.css";

interface Props {
  children: ReactNode;
}

const Content: FunctionComponent<Props> = ({ children }) => {
  return <div className={content}>{children}</div>;
};
export default Content;
