import { FunctionComponent } from "react";
import LoaderCl from "./Loader.module.css";
interface LoaderProps {
  isFull?: boolean;
  isInline?: boolean;
}

const Loader: FunctionComponent<LoaderProps> = ({ isFull, isInline }) => {
  return (
    <div className={LoaderCl.rel}>
      {isInline ? <span className={LoaderCl.loader}></span> : null}
      {isFull ? (
        <div className={LoaderCl.container}>
          <span className={`${LoaderCl.loaderFull} ${LoaderCl.loader}`}></span>
        </div>
      ) : null}
    </div>
  );
};

export default Loader;
