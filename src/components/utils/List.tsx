import React, { FunctionComponent } from "react";
import { list, colList } from "./List.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  isCol?: boolean;
}

const List: FunctionComponent<Props> = ({ children, className, isCol }) => {
  return (
    <ul
      className={`${list} ${className ? className : ""} ${
        isCol ? ` ${colList}` : ""
      }`}
    >
      {children}
    </ul>
  );
};

export default List;
