import { motion } from "framer-motion";

const birdCardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const LoadingSkeleton = () => {
  return (
    <motion.div
      variants={birdCardVariants}
      className="relative m-2 h-96 w-72 overflow-hidden rounded-md bg-white shadow-2xl"
    >
      <div className="h-72 w-full animate-pulse rounded-t-md rounded-b-[45px] bg-teal-100" />
      <div className="absolute left-0 right-0 bottom-5 z-10 flex flex-col items-center">
        <h2 className="h-6 w-3/4 animate-pulse rounded-md bg-teal-200" />
        <p className="mt-2 h-4 w-1/2 animate-pulse rounded-md bg-teal-200" />
      </div>
    </motion.div>
  );
};
