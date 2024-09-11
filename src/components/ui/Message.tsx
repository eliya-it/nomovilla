import { FunctionComponent, useEffect, useState } from "react";
import MessageCl from "./Message.module.css";
import { AnimatePresence, motion } from "framer-motion";
const messageVariants = {
  hidden: {
    y: "-40vh",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
  exit: {
    y: "-40vh",
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
interface MessageProps {
  message: string | any;
  status?: "success" | "fail";
}

const Message: FunctionComponent<MessageProps> = ({
  message,
  status = "success",
}) => {
  const [show, setShow] = useState(true);
  const hide = () => setShow(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      hide();
    }, 7000);
    return () => clearTimeout(timer);
  }, [message]);
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            variants={messageVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            className={`${MessageCl.message}  ${
              status === "fail" ? MessageCl.messageError : ""
            }`}
            onClick={hide}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>{" "}
    </>
  );
};

export default Message;
