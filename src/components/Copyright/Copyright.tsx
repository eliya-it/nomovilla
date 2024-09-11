import { FunctionComponent } from "react";
import CopyrightCl from "./Copyright.module.css";
import List from "@components/utils/List";
import Item from "@components/utils/Item";
import {
  AiOutlineGlobal,
  AiOutlineInstagram,
  AiOutlineX,
} from "react-icons/ai";
import CopyrightLink from "./CopyrightLink";
const Copyright: FunctionComponent = () => {
  return (
    <div className={CopyrightCl.copyright}>
      <p className={CopyrightCl.copyrightText}>
        This project was developed by <strong>Eliya</strong> as part of his
        portfolio. <br /> &copy; All rights reserved.
      </p>
      <List>
        <CopyrightLink to="https://www.eliyait.com/">
          <AiOutlineGlobal />
        </CopyrightLink>
        <Item>
          <CopyrightLink to="https://instagram.com/eliya_it">
            <AiOutlineInstagram />
          </CopyrightLink>
        </Item>
        <Item>
          <CopyrightLink to="https://x.com/eliya_it">
            <AiOutlineX />
          </CopyrightLink>
        </Item>
      </List>
    </div>
  );
};

export default Copyright;
