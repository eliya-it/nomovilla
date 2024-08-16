import React, { FunctionComponent } from "react";
import { grid, grid2, grid3, grid4, gridAuto } from "./Grid.module.css";

interface Props {
  children: React.ReactNode;
  className?: string;
  col?: number;
  isAuto?: boolean;
}

const Grid: FunctionComponent<Props> = ({
  children,
  className,
  col,
  isAuto,
}) => {
  const gridCheck = () => {
    if (col === 2) return grid2;
    else if (col === 3) return grid3;
    else if (col === 4) return grid4;
  };

  return (
    <div
      className={`${grid} ${isAuto && !col ? gridAuto : ""} ${
        col ? `${gridCheck()}` : ""
      } ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Grid;
