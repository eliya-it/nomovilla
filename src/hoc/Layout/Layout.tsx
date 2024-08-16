import React, { FunctionComponent, ReactNode } from "react";
import Header from "@components/common/Header/Header";
import Sidebar from "@components/Sidebar/Sidebar";
import { container, main } from "./Layout.module.css";
import Loader from "@ui/Loader";
import Content from "../Content";

interface Props {
  children: ReactNode;
  isLoading?: boolean;
}
const Layout: FunctionComponent<Props> = ({ children, isLoading }) => {
  return (
    <div className={container}>
      <Header />
      <Content>
        <Sidebar />
        <main className={main}>{isLoading ? <Loader isFull /> : children}</main>
      </Content>
    </div>
  );
};
export default Layout;
