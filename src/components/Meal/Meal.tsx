import React, { FunctionComponent, useState } from "react";
import {
  meal,
  mealImg,
  mealText,
  mealHeading,
  mealCategory,
  mealActions,
  mealLink,
} from "./Meal.module.css";

import { Link } from "react-router-dom";
import { MdBookmarkAdd } from "react-icons/md";

import { auth } from "@/firebase";
import Message from "@ui/Message";
import Button from "@components/utils/Button";
import useHttp from "@hooks/http";
import useAuthContext from "@hooks/useAuthContext";
import { FB_APP_URL } from "@/config/config";
import { v4 as uuid } from "uuid";
interface MealProps {
  name: string;
  category: string;
  photo: string;
  tags: string[];
  id: string;
}

const Meal: FunctionComponent<MealProps> = ({
  name,
  category,
  photo,
  tags,
  id,
}) => {
  const { sendRequest } = useHttp();
  const { user } = useAuthContext();
  const [message, setMessage] = useState<{
    message: string | null;
    status: string;
  }>({
    message: null,
    status: "success",
  });

  const handleBookmark = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        throw new Error("User is not authenticated");
      }
      sendRequest(
        `${FB_APP_URL}/bookmarks/${userId}.json?auth=${user.token}`,
        "POST",
        {
          id,
          name,
          photo,
          category,
        }
      );
      setMessage({
        message: `${name} Added to your bookmarks!`,
        status: "success",
      });
    } catch (err) {
      setMessage({ message: err.response.data.error, status: "fail" });
    }
  };
  return (
    <>
      {message.message && (
        <Message
          message={message.message}
          status={message.status}
          key={uuid()}
        />
      )}

      <div className={meal}>
        <img src={photo} alt="meal img" className={mealImg} />

        <div className={mealText}>
          <h3 className={mealHeading}>{name}</h3>
          <p className={mealCategory}>{category} </p>

          <div className={mealActions}>
            {user ? (
              <Button className="btn--primary" onClick={handleBookmark}>
                <MdBookmarkAdd className="icon" />
              </Button>
            ) : null}

            <Link className={mealLink} to={`/meal/${id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
