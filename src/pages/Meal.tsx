import React, { FunctionComponent, useEffect, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import useHttp from "@hooks/http";
import { useParams } from "react-router";
import {
  meal,
  photoBox,
  headingBox,
  heading,
  mealPhoto,
  ingredientsBox,
  mealInstructions,
  instructionsHeading,
  mealbtn,
} from "./Meal.module.css";
import Section from "@components/utils/Section";
import Message from "@ui/Message";
import Loader from "@ui/Loader";
import axios from "axios";
import { auth } from "@/firebase";
import useAuthContext from "@hooks/useAuthContext";
import { v4 as uuid } from "uuid";
import { FB_APP_URL } from "../config/config";

const Meal: FunctionComponent = () => {
  const [message, setMessage] = useState<{
    message: string | null;
    status: string;
  }>({
    message: null,
    status: "success",
  });
  const { sendRequest, data, error, isLoading } = useHttp();
  const { user } = useAuthContext();
  const { id } = useParams<{ id: string }>();

  const handleBookmark = async (
    name: string,
    photo: string,
    category: string
  ) => {
    try {
      await axios.post(
        `${FB_APP_URL}/bookmarks/${user?.id}.json?auth=${user?.token}`,
        {
          id,
          name,
          photo,
          category,
          user: auth.currentUser?.uid,
        }
      );
      setMessage({
        message: `${name} Added to your bookings!`,
        status: "success",
      });
    } catch (err) {
      setMessage({ message: err?.response?.data.error, status: "fail" });
    }
  };

  useEffect(() => {
    sendRequest(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      "GET"
    );
  }, [id]);

  return (
    <>
      {message.message && (
        <Message message={message.message} status="success" key={uuid()} />
      )}
      {error && <Message message={error} status="fail" key={uuid()} />}

      {!isLoading && !error && data ? (
        <Section isReset>
          <div className={meal}>
            <div className={photoBox}>
              <div className={headingBox}>
                <h4 className={heading}>{data?.meals[0]?.strMeal}</h4>
              </div>
              <img
                src={data?.meals[0]?.strMealThumb}
                alt={`${data?.meals[0]?.strMeal} meal on Nomovilla`}
                className={mealPhoto}
              />
            </div>
            {user ? (
              <div className="meal__actions">
                <button
                  className={mealbtn}
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
            <div className={ingredientsBox}>
              <h3 className={instructionsHeading}>
                {`${data?.meals[0]?.strMeal} Ingredients`}{" "}
              </h3>
            </div>
            <p className={mealInstructions}>
              {data?.meals[0]?.strInstructions}
            </p>
          </div>
        </Section>
      ) : (
        <Loader isFull />
      )}
    </>
  );
};

export default Meal;
