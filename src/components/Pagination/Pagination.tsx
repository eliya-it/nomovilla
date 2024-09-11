import { FunctionComponent, MouseEventHandler } from "react";
import PaginationCl from "./Pagination.module.css";
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
    <div className={PaginationCl.pagination}>
      <button
        className={`${PaginationCl.arrow} ${
          activePrev ? PaginationCl.nextArrow : ""
        }`}
        onClick={prev}
      >
        <MdChevronLeft className={PaginationCl.icon} />
      </button>
      <button
        className={`${PaginationCl.arrow} ${
          activeNext ? PaginationCl.nextArrow : ""
        }`}
        onClick={next}
      >
        <MdChevronRight className={PaginationCl.icon} />
      </button>
    </div>
  );
};

export default Pagination;
