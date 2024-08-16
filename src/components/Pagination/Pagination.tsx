import React, { FunctionComponent, MouseEventHandler } from "react";
import { pagination, arrow, icon, nextArrow } from "./Pagination.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
interface Props {
  next: MouseEventHandler<HTMLButtonElement>;
  prev: MouseEventHandler<HTMLButtonElement>;

  activeNext: boolean;
  activePrev: boolean;
}
const Pagination: FunctionComponent<Props> = ({
  next,
  prev,

  activeNext,
  activePrev,
}) => {
  return (
    <div className={pagination}>
      <button
        className={`${arrow} ${activePrev ? nextArrow : ""}`}
        onClick={prev}
      >
        <MdChevronLeft className={icon} />
      </button>
      <button
        className={`${arrow} ${activeNext ? nextArrow : ""}`}
        onClick={next}
      >
        <MdChevronRight className={icon} />
      </button>
    </div>
  );
};

export default Pagination;
