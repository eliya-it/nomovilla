import React, { FunctionComponent, ReactNode } from "react";
import { section, sectionBorder } from "./Section.module.css";

interface Props {
  className?: string;
  children: ReactNode;
  isBorder?: boolean;
  isReset?: boolean;
}

const Section: FunctionComponent<Props> = ({
  className,
  children,
  isBorder,
  isReset,
}) => {
  return (
    <section
      className={` ${!isReset ? section : ""} ${
        isBorder ? sectionBorder : ""
      } ${className ? className : ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
