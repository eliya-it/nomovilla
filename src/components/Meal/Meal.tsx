import { FunctionComponent, useState } from "react";
import MealCl from "./Meal.module.css";

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
  id: string;
}

const Meal: FunctionComponent<MealProps> = ({ name, category, photo, id }) => {
  const { sendRequest } = useHttp();
  const { user } = useAuthContext();
  const [message, setMessage] = useState<{
    message: string | null;
    status: "success" | "fail";
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
        `${FB_APP_URL}/bookmarks/${userId}.json?auth=${user?.token}`,
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
    } catch (err: any) {
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

      <div className={MealCl.meal}>
        <img src={photo} alt="meal img" className={MealCl.mealImg} />

        <div className={MealCl.mealText}>
          <h3 className={MealCl.mealHeading}>{name}</h3>
          <p className={MealCl.mealCategory}>{category} </p>

          <div className={MealCl.mealActions}>
            {user ? (
              <Button className="btn--primary" onClick={handleBookmark}>
                <MdBookmarkAdd className="icon" />
              </Button>
            ) : null}

            <Link className={MealCl.mealLink} to={`/meal/${id}`}>
              View
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meal;
