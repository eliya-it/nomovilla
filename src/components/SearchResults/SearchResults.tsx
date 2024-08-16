import React, { FunctionComponent, ReactNode } from "react";
import List from "@components/utils/List";

import { results } from "./SearchResults.module.css";

interface Props {
  children: ReactNode;
}
const SearchResults: FunctionComponent<Props> = ({ children }) => {
  return (
    <List className={results} isCol>
      {children}
    </List>
  );
};

export default SearchResults;
