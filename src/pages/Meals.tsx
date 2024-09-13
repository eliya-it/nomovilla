import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Form from "@ui/Form";
import Input from "@ui/Input";
import Meal from "@components/Meal/Meal";
import usePagination from "@hooks/usePagination";
import Grid from "@hoc/Layout/Grid";
import useHttp from "@hooks/http";
import Loader from "@ui/Loader";
import Message from "@ui/Message";
import MealsCl from "./Meals.module.css";
import MealsBtns from "@components/MealsBtns/MealsBtns";
import Section from "@components/utils/Section";
import { motion } from "framer-motion";
import { PageVariants } from "@components/utils/Variants";

interface MealData {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

const MealsName: FunctionComponent = () => {
  const { sendRequest, data, error, isLoading } = useHttp();
  const { meals, nextPage, prevPage, curPage, totalPages } =
    usePagination<MealData>({
      data: data?.meals,
    });
  const [mealName, setMealName] = useState<string>("");
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const typingTimer = useRef<NodeJS.Timeout | null>(null);

  const handlleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (typingTimer.current) {
      clearTimeout(typingTimer.current);
    }
    typingTimer.current = setTimeout(() => {
      setMealName(val);
    }, 500);
  };

  useEffect(() => {
    sendRequest(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
      "GET"
    );
  }, [mealName, sendRequest]);
  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <>
      {error ? <Message message={error} status="fail" /> : null}
      <Section>
        <div className={MealsCl.mealsSearch}>
          <Form>
            <Input
              placeholder="Pizza, Sushi,..."
              type="search"
              onChange={handlleNameChange}
            />
          </Form>
          <p className={MealsCl.mealsText}>{`${
            !isLoading
              ? `${
                  data?.meals
                    ? ` Showing ${curPage} of ${totalPages} pages`
                    : "There is no meals with this name🥲"
                }`
              : "Loading..."
          }`}</p>
          <MealsBtns
            onNextPage={nextPage}
            onPrevPage={prevPage}
            curPage={curPage}
            totalPages={totalPages}
            isMealsNull={data?.meals <= 0}
          />
        </div>
        {!isAnimated ? (
          <motion.div
            variants={PageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Grid isAuto>
              {!isLoading && !error && data ? (
                meals?.map((meal) => (
                  <Meal
                    name={meal.strMeal}
                    category={meal.strCategory}
                    photo={meal.strMealThumb}
                    id={meal.idMeal}
                    key={meal.idMeal}
                  />
                ))
              ) : (
                <Loader isFull />
              )}
            </Grid>{" "}
          </motion.div>
        ) : (
          <Grid isAuto>
            {!isLoading && !error && data ? (
              meals?.map((meal) => (
                <Meal
                  name={meal.strMeal}
                  category={meal.strCategory}
                  photo={meal.strMealThumb}
                  id={meal.idMeal}
                  key={meal.idMeal}
                />
              ))
            ) : (
              <Loader isFull />
            )}
          </Grid>
        )}
      </Section>
    </>
  );
};

export default MealsName;
