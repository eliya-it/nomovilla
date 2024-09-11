import { FunctionComponent, ReactNode } from "react";
import useAuthContext from "@hooks/useAuthContext";
import Heading from "@components/common/Heading/Heading";
interface Props {
  children: ReactNode;
  isLoading: boolean;
}
const ProtectedRoutes: FunctionComponent<Props> = ({ children, isLoading }) => {
  const { user } = useAuthContext();
  if (!user && !isLoading)
    return (
      <Heading isSecond>
        You do not have access to this page 😑.
        <br /> Please Login and try again!
      </Heading>
    );

  if (user?.token && !isLoading) return children;
};

export default ProtectedRoutes;
