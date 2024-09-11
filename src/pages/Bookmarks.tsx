import { FunctionComponent, useEffect } from "react";
import useHttp from "@hooks/http";
import Section from "@components/utils/Section";
import useAuthContext from "@hooks/useAuthContext";
import Bookmark from "@components/Bookmark/Bookmark";
import BookmarksCl from "./Bookmarks.module.css";
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

  const fetchBookmarks = (userID: string | null) => {
    if (user) {
      getBookmarks(
        `${FB_APP_URL}/bookmarks/${userID}.json?auth=${user?.token}`,
        "GET"
      );
    }
  };

  const handleDeleteBookmark = async (id: string) => {
    if (user) {
      await deleteBookmark(
        `${FB_APP_URL}/bookmarks/${user.uid}/${id}.json?auth=${user.token}`,
        "DELETE"
      );
      // Re-fetch bookmarks after deletion
      fetchBookmarks(user.uid);
    }
  };

  useEffect(() => {
    if (user?.uid) {
      fetchBookmarks(user.uid);
    }
  }, [user]);

  // Determine if we are loading
  const isLoadingAny = isLoading || deleteBookmarkLoader;
  console.log(isLoadingAny);

  return (
    <PageTransition>
      <Section className={BookmarksCl.bookmarks}>
        {error && <Message message={error} status="fail" />}
        {deleteBookmarkErr && (
          <Message message={deleteBookmarkErr} status="fail" />
        )}

        {isLoadingAny ? (
          <Loader isFull />
        ) : data && Object.keys(data).length > 0 ? (
          Object.keys(data).map((key) => (
            <Bookmark
              key={key}
              name={data[key].name}
              loader={deleteBookmarkLoader}
              photo={data[key].photo}
              handleDelete={() => handleDeleteBookmark(key)}
            />
          ))
        ) : (
          <Heading isSecond>There are no bookmarks at the moment. 😢</Heading>
        )}
      </Section>
    </PageTransition>
  );
};

export default Bookmarks;
