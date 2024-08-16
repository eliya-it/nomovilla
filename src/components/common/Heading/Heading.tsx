import React, { FunctionComponent, ReactNode } from "react";
import { second, third, forth } from "./Heading.module.css";

interface Props {
  isSecond?: boolean;
  isThird?: boolean;
  isForth?: boolean;
  children: ReactNode;
}

const Heading: FunctionComponent<Props> = ({
  children,
  isSecond,
  isThird,
  isForth,
}) => {
  return (
    <>
      {isSecond && <h2 className={second}>{children}</h2>}{" "}
      {isThird && <h3 className={third}>{children}</h3>}{" "}
      {isForth && <h4 className={forth}>{children}</h4>}
    </>
  );
};

export default Heading;
