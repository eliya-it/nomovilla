import React, {
  useState,
  useEffect,
  ChangeEvent,
  FunctionComponent,
} from "react";
import { FaSearch } from "react-icons/fa";
import SearchResult from "@components/SearchResults/SearchResult";
import SearchResults from "@components/SearchResults/SearchResults";
import useHttp from "@hooks/http";

import Form from "@ui/Form";
import Input from "@ui/Input";
import { search, searchInput, searchBtn } from "./SearchBar.module.css";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface ApiResponse {
  meals: Meal[];
}

const Search: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const { isLoading, sendRequest, error, data, clear } = useHttp<ApiResponse>();

  let timer: NodeJS.Timeout;

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>): void => {
    clearTimeout(timer);
    timer = setTimeout(() => setName(e.target.value), 1000);
  };

  useEffect(() => {
    if (name) {
      sendRequest(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
        "GET"
      );
    }
  }, [name, sendRequest]);

  return (
    <div className={search}>
      <Form>
        <Input
          name="search"
          className={searchInput}
          placeholder="Pizza, Salad,..."
          type="search"
          onChange={handleSearchInput}
        />

        <button className={searchBtn}>
          <FaSearch />
        </button>
      </Form>

      {name !== "" && (
        <SearchResults>
          {!isLoading && data?.meals
            ? data.meals.map((meal) => (
                <SearchResult
                  key={meal.idMeal}
                  id={meal.idMeal}
                  name={meal.strMeal}
                  photo={`${meal.strMealThumb}/preview`}
                />
              ))
            : "Loading...."}
        </SearchResults>
      )}
    </div>
  );
};

export default Search;
