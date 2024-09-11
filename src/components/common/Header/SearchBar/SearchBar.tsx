import { useState, useEffect, ChangeEvent, FunctionComponent } from "react";
import { FaSearch } from "react-icons/fa";
import SearchResult from "@components/SearchResults/SearchResult";
import SearchResults from "@components/SearchResults/SearchResults";
import useHttp from "@hooks/http";
import { v4 as uuid } from "uuid";
import Form from "@ui/Form";
import Input from "@ui/Input";
import SearchBarCl from "./SearchBar.module.css";
import Message from "@/components/ui/Message";

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
  const { isLoading, sendRequest, data, error } = useHttp<ApiResponse>();

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
    <div className={SearchBarCl.search}>
      {error && <Message message={error} status="fail" key={uuid()} />}
      <Form>
        <Input
          name="search"
          className={SearchBarCl.searchInput}
          placeholder="Pizza, Salad,..."
          type="search"
          onChange={handleSearchInput}
        />

        <button className={SearchBarCl.searchBtn}>
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
