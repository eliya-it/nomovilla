import React, { FunctionComponent } from "react";
import Button from "@components/utils/Button";
import { btnsContainer, btn } from "./MealsBtns.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
interface Props {
  curPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  isMealsNull: boolean;
}
const MealsBtn: FunctionComponent<Props> = ({
  curPage,
  onNextPage,
  onPrevPage,
  totalPages,
  isMealsNull,
}) => {
  return (
    <div className={btnsContainer}>
      {" "}
      <Button
        className={`${btn}`}
        disabled={curPage === 1 || isMealsNull}
        onClick={onPrevPage}
        isReset
      >
        <MdChevronLeft />
      </Button>{" "}
      <Button
        className={`${btn}`}
        onClick={onNextPage}
        disabled={curPage >= totalPages || isMealsNull}
        isReset
      >
        <MdChevronRight />
      </Button>{" "}
    </div>
  );
};

export default MealsBtn;
