import { FunctionComponent, MouseEventHandler } from "react";
import ConfirmCl from "./Confirm.module.css";
import { AnimatePresence, motion } from "framer-motion";
interface Props {
  onConfirm: MouseEventHandler<HTMLButtonElement>;
  onCancel: MouseEventHandler<HTMLButtonElement>;
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
          className={ConfirmCl.confirm}
          variants={confirmVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <p className={ConfirmCl.msg}>{message}</p>
          <div className={ConfirmCl.btnsContainer}>
            <button
              onClick={onConfirm}
              className={`${ConfirmCl.btn + " " + ConfirmCl.yes}`}
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className={`${ConfirmCl.btn + " " + ConfirmCl.no}`}
            >
              no
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Confirm;
