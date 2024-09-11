import { FunctionComponent } from "react";
import Header from "./Header.module.css";
import Logo from "@assets/img/logo.png";

import SearchBar from "./SearchBar/SearchBar";
import UserHeader from "./UserHeader/UserHeader";
import { Link } from "react-router-dom";

const Showcase: FunctionComponent = () => {
  return (
    <header className={Header.header}>
      <Link to="/">
        <img className={Header.logo} src={Logo} />
      </Link>
      <SearchBar />
      <UserHeader />
    </header>
  );
};
export default Showcase;
