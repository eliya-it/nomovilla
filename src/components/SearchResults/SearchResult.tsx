import { FunctionComponent } from "react";
import Item from "@components/utils/Item";
import SearchResultCl from "./SearchResult.module.css";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  photo: string;
  name: string;
}
const SearchResult: FunctionComponent<Props> = ({ id, photo, name }) => {
  return (
    <Item className={SearchResultCl.result} key={id}>
      <Link className={SearchResultCl.searchLink} to={`/meal/${id}`}>
        <img
          src={photo}
          alt={`${name} photo`}
          className={SearchResultCl.searchPhoto}
        />
        <p className={SearchResultCl.searchText}>{name}</p>
      </Link>
    </Item>
  );
};
export default SearchResult;
