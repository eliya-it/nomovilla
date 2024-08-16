import React, { FunctionComponent, useState } from "react";
import {
  bookmark,
  bookmarkPhoto,
  bookmarkText,
  bookmarkBtn,
  photoBox,
} from "./Bookmark.module.css";
import Button from "@components/utils/Button";
import { MdBookmarkRemove } from "react-icons/md";
import Confirm from "@ui/Confirm";

interface BookmarkProps {
  name: string;
  photo: string;
  loader: boolean;
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
      {/* TODO: add confirm here */}
      <Confirm
        message={`Are you sure you want to delete ${name}?`}
        visible={confirm}
        onConfirm={handleDelete}
        onCancel={handleConfirm}
      />
      <div className={bookmark}>
        <div className={photoBox}>
          <img
            className={bookmarkPhoto}
            src={photo}
            alt={`${name} meal photo`}
          />
        </div>
        <div className={bookmarkText}>
          <h3 className="heading--tertiary">{name}</h3>
        </div>
        <Button className={bookmarkBtn} isReset onClick={handleConfirm}>
          <MdBookmarkRemove />
        </Button>
      </div>
    </>
  );
};

export default Bookmark;
