import React, { FunctionComponent, useEffect } from "react";
import useHttp from "@hooks/http";
import Section from "@components/utils/Section";
import useAuthContext from "@hooks/useAuthContext";
import Bookmark from "@components/Bookmark/Bookmark";
import { bookmarks } from "./Bookmarks.module.css";
import { FB_APP_URL } from "@/config/config";
import Loader from "@ui/Loader";
import Heading from "@components/common/Heading/Heading";
import Message from "@ui/Message";
import PageTransition from "@ui/PageTransition";

const Bookmarks: FunctionComponent = () => {
  const { sendRequest: getBookmarks, data, error, isLoading } = useHttp();
  const {
    sendRequest: deleteBookmark,

    error: deleteBookmarkErr,
    isLoading: deleteBookmarkLoader,
  } = useHttp();
  const { user } = useAuthContext();

  const handleDeleteBookmark = (id: string, userID: string) => {
    deleteBookmark(
      `${FB_APP_URL}/bookmarks/${userID}/${id}.json?auth=${user?.token}`,
      "DELETE"
    );
  };

  const fetchBookmarks = (userID: string | undefined) => {
    if (user && !deleteBookmarkLoader) {
      getBookmarks(
        `${FB_APP_URL}/bookmarks/${userID}.json?auth=${user?.token}`,
        "GET"
      );
    }
  };
  useEffect(() => {
    fetchBookmarks(user?.id);
  }, [user, deleteBookmarkLoader]);
  return (
    <PageTransition>
      {error ||
        (deleteBookmarkErr && (
          <Message
            message={
              error?.response.data.error ||
              deleteBookmarkErr?.response.data.error
            }
            status="fail"
          />
        ))}
      <Section className={bookmarks}>
        {!isLoading && !deleteBookmarkLoader && data !== null
          ? Object.keys(data).map((key) => (
              <Bookmark
                loader={deleteBookmarkLoader}
                key={key}
                name={data[key].name}
                photo={data[key].photo}
                handleDelete={() => handleDeleteBookmark(key, user.id)}
              />
            ))
          : null}
        {deleteBookmarkLoader && <Loader isFull />}
        {!isLoading && data === null ? (
          <Heading isSecond>There are no bookmarks at the moment. 😢</Heading>
        ) : null}
      </Section>
    </PageTransition>
  );
};

export default Bookmarks;
