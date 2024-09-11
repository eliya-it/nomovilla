import { FunctionComponent, ReactNode } from "react";
import SectionCl from "./Section.module.css";

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
      className={` ${!isReset ? SectionCl.section : ""} ${
        isBorder ? SectionCl.sectionBorder : ""
      } ${className ? className : ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
