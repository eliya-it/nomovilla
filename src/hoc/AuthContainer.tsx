import React, { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";

const AuthContainer: FunctionComponent = () => {
  return <Outlet />;
};

export default AuthContainer;
