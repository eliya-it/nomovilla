import { FunctionComponent, useEffect } from "react";
import useHttp from "@hooks/http";
import Meal from "@components/Meal/Meal";
import Section from "@components/utils/Section";
import Grid from "@/hoc/Layout/Grid";
import Loader from "@ui/Loader";

const Meals: FunctionComponent = () => {
  const { sendRequest, data, error, isLoading } = useHttp();

  useEffect(() => {
    sendRequest(
      "https://www.themealdb.com/api/json/v1/1/search.php?f=c",
      "GET"
    );
  }, []);

  return (
    <Section>
      {!isLoading && !error && data ? (
        <Grid isAuto>
          {data?.meals.slice(0, 3).map((meal: any) => (
            <Meal
              name={meal.strMeal}
              photo={meal.strMealThumb}
              category={meal.strCategory}
              key={meal.idMeal}
              id={meal.idMeal}
            />
          ))}
        </Grid>
      ) : (
        <Loader isFull />
      )}
    </Section>
  );
};

export default Meals;
