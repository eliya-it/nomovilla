import { FunctionComponent } from "react";
import Button from "@components/utils/Button";
import MealsBtnsCl from "./MealsBtns.module.css";
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
    <div className={MealsBtnsCl.btnsContainer}>
      {" "}
      <Button
        className={`${MealsBtnsCl.btn}`}
        disabled={curPage === 1 || isMealsNull}
        onClick={onPrevPage}
        isReset
      >
        <MdChevronLeft />
      </Button>{" "}
      <Button
        className={`${MealsBtnsCl.btn}`}
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
