import { FunctionComponent, ReactNode } from "react";
import List from "@components/utils/List";
import SearchResultsCl from "./SearchResults.module.css";

interface Props {
  children: ReactNode;
}
const SearchResults: FunctionComponent<Props> = ({ children }) => {
  return (
    <List className={SearchResultsCl.results} isCol>
      {children}
    </List>
  );
};

export default SearchResults;
