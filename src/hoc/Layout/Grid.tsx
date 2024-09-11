import { FunctionComponent, ReactNode } from "react";
import GridCl from "./Grid.module.css";

interface Props {
  children: ReactNode;
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
    if (col === 2) return GridCl.grid2;
    else if (col === 3) return GridCl.grid3;
    else if (col === 4) return GridCl.grid4;
  };

  return (
    <div
      className={`${GridCl.grid} ${isAuto && !col ? GridCl.gridAuto : ""} ${
        col ? `${gridCheck()}` : ""
      } ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default Grid;
