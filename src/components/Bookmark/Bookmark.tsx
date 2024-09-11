import { FunctionComponent, useState } from "react";
import BookmarksCl from "./Bookmark.module.css";
import Button from "@components/utils/Button";
import { MdBookmarkRemove } from "react-icons/md";
import Confirm from "@ui/Confirm";

interface BookmarkProps {
  name: string;
  photo: string;
  loader: boolean | null;
  handleDelete: () => void;
}

const Bookmark: FunctionComponent<BookmarkProps> = ({
  name,
  photo,
  handleDelete,
}) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const handleConfirm = function () {
    setConfirm((prev) => !prev);
  };

  return (
    <>
      <Confirm
        message={`Are you sure you want to delete ${name}?`}
        visible={confirm}
        onConfirm={handleDelete}
        onCancel={handleConfirm}
      />
      <div className={BookmarksCl.bookmark}>
        <div className={BookmarksCl.photoBox}>
          <img
            className={BookmarksCl.bookmarkPhoto}
            src={photo}
            alt={`${name} meal photo`}
          />
        </div>
        <div className={BookmarksCl.bookmarkText}>
          <h3 className="heading--tertiary">{name}</h3>
        </div>
        <Button
          className={BookmarksCl.bookmarkBtn}
          isReset
          onClick={handleConfirm}
        >
          <MdBookmarkRemove />
        </Button>
      </div>
    </>
  );
};

export default Bookmark;
