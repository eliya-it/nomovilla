import { FunctionComponent, useEffect, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import useHttp from "@hooks/http";
import { useParams } from "react-router";
import MealCl from "./Meal.module.css";
import Section from "@components/utils/Section";
import Message from "@ui/Message";
import Loader from "@ui/Loader";
import { auth } from "@/firebase";
import useAuthContext from "@hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { FB_APP_URL } from "../config/config";
import Heading from "@/components/common/Heading/Heading";

const Meal: FunctionComponent = () => {
  const [message, setMessage] = useState<{
    message: string | null;
    status: string;
  }>({
    message: null,
    status: "success",
  });
  const { sendRequest, data, error, isLoading } = useHttp();
  const {
    sendRequest: addBookmark,
    data: addedBookmark,
    error: bookmarkError,
  } = useHttp();
  const { user } = useAuthContext();
  const { id } = useParams<{ id: string }>();

  const handleBookmark = async (
    name: string,
    photo: string,
    category: string
  ) => {
    addBookmark(
      `${FB_APP_URL}/bookmarks/${user?.uid}.json?auth=${user?.token}`,
      "POST",
      {
        id,
        name,
        photo,
        category,
        user: auth.currentUser?.uid,
      }
    );
  };

  useEffect(() => {
    sendRequest(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      "GET"
    );
  }, [id]);

  useEffect(() => {
    if (!bookmarkError && addedBookmark) {
      setMessage({
        message: `${data?.meals[0]?.strMeal} Added to your bookings!`,
        status: "success",
      });
    }
  }, [addedBookmark, error]);

  return (
    <>
      {message.message && (
        <Message message={message.message} status="success" key={uuid()} />
      )}
      {error && <Message message={error} status="fail" key={uuid()} />}
      {bookmarkError && (
        <Message message={bookmarkError} status="fail" key={uuid()} />
      )}
      {data?.meals !== null && !isLoading && !error ? (
        <>
          <Section isReset>
            <div className={MealCl.meal}>
              <div className={MealCl.photoBox}>
                <div className={MealCl.headingBox}>
                  <h4 className={MealCl.heading}>{data?.meals[0]?.strMeal}</h4>
                </div>
                <img
                  src={data?.meals[0]?.strMealThumb}
                  alt={`${data?.meals[0]?.strMeal} meal on Nomovilla`}
                  className={MealCl.mealPhoto}
                />
              </div>
              {user ? (
                <div className="meal__actions">
                  <button
                    className={MealCl.mealbtn}
                    onClick={() =>
                      handleBookmark(
                        data?.meals[0]?.strMeal || "",
                        data?.meals[0]?.strMealThumb || "",
                        data?.meals[0]?.strCategory || ""
                      )
                    }
                  >
                    <MdOutlineBookmarkAdd />
                  </button>
                </div>
              ) : null}
              <div className={MealCl.ingredientsBox}>
                <h3 className={MealCl.instructionsHeading}>
                  {`${data?.meals[0]?.strMeal} Ingredients`}{" "}
                </h3>
              </div>
              <p className={MealCl.mealInstructions}>
                {data?.meals[0]?.strInstructions}
              </p>
            </div>
          </Section>
          )
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader isFull />
          ) : (
            <Heading isSecond>There is no meal with this ID 🥲</Heading>
          )}
        </>
      )}
    </>
  );
};

export default Meal;
