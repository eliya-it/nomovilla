import React, { FunctionComponent, ReactNode } from "react";
import { motion } from "framer-motion";
import { PageVariants } from "@components/utils/Variants";

interface Props {
  children: ReactNode;
}

const PageTransition: FunctionComponent<Props> = ({ children }) => {
  return (
    <motion.div
      variants={PageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};
export default PageTransition;
