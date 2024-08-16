import React, { FunctionComponent, useState } from "react";
import {
  confirm,
  btn,
  message as msg,
  btnsContainer,
  yes,
  no,
} from "./Confirm.module.css";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  onConfirm: Function;
  onCancel: Function;
  message: string;
  visible: boolean;
}

const confirmVariants = {
  hidden: {
    y: "-8rem",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      type: "just",
    },
  },
  exit: {
    y: "-8rem",
    opacity: 0,
  },
};
const Confirm: FunctionComponent<Props> = ({
  onCancel,
  onConfirm,
  message,
  visible,
}) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={confirm}
          variants={confirmVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p className={msg}>{message}</p>
          <div className={btnsContainer}>
            <button onClick={onConfirm} className={`${btn + " " + yes}`}>
              Yes
            </button>
            <button onClick={onCancel} className={`${btn + " " + no}`}>
              no
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confirm;
