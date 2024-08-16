export const PageVariants = {
  hidden: {
    x: "-100%",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      ease: "easeInOut",
    },
  },
};
