import { FunctionComponent, ReactNode } from "react";
import HeadingCl from "./Heading.module.css";

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
      {isSecond && <h2 className={HeadingCl.second}>{children}</h2>}{" "}
      {isThird && <h3 className={HeadingCl.third}>{children}</h3>}{" "}
      {isForth && <h4 className={HeadingCl.corth}>{children}</h4>}
    </>
  );
};

export default Heading;
