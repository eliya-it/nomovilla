import React, { FunctionComponent } from "react";
import { loader, container, loaderFull, rel } from "./Loader.module.css";
interface LoaderProps {
  isFull?: boolean;
  isInline?: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({ isFull, isInline }) => {
  return (
    <div className={rel}>
      {isInline ? <span className={loader}></span> : null}
      {isFull ? (
        <div className={container}>
          <span className={`${loaderFull} ${loader}`}></span>
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
