import { FunctionComponent, ReactNode } from "react";
interface Props {
  className?: string;
  children: ReactNode;
}
const Item: FunctionComponent<Props> = ({ className, children }) => {
  return <li className={className ? className : ""}>{children}</li>;
};
export default Item;
