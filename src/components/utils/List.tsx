import { FunctionComponent, ReactNode } from "react";
import ListCl from "./List.module.css";

interface Props {
  children: ReactNode;
  className?: string;
  isCol?: boolean;
}

const List: FunctionComponent<Props> = ({ children, className, isCol }) => {
  return (
    <ul
      className={`${ListCl.list} ${className ? className : ""} ${
        isCol ? ` ${ListCl.colList}` : ""
      }`}
    >
      {children}
    </ul>
  );
};

export default List;
