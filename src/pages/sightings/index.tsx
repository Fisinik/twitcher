import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout";
import { SightingCard } from "../../components/sighting-card";
import { LoadingSkeleton } from "../../components/sighting-card/loading-skeleton";
import FormInput from "../../components/form-input";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const cardListVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Sightings: NextPage = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const {
    data: sightings,
    isLoading: areSightingsLoading,
    isError: isSightingFetchingError,
  } = trpc.sighting.getAll.useQuery();
  if (isSightingFetchingError) return <div>Something went wrong</div>;
  return (
    <Layout>
      <main className="container z-auto mx-auto flex min-h-screen flex-col items-center justify-center pt-[80px]">
        <section ref={ref} className="text-gray-600">
          <motion.div
            style={{ y, opacity }}
            className="absolute inset-0 -z-20 bg-gradient-to-t from-teal-100"
          />
          <div className="container mx-auto px-5 pt-20 pb-12 sm:py-24">
            <div className="mb-12 flex w-full flex-col text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="title-font mb-4 items-center text-3xl font-medium text-teal-400/80 lg:text-4xl"
              >
                Check out <br className="inline-block sm:hidden" />
                Bird Sightings
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mx-auto font-sans text-base leading-relaxed text-gray-700/80 lg:w-2/3"
              >
                Twitcher is the perfect place for bird lovers to explore
                sightings of their favorite birds and communicate with other
                enthusiasts.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mx-auto flex w-full flex-col items-end space-y-4 px-8 sm:flex-row sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3"
            >
              <FormInput
                label="Search for a bird sighting..."
                type="text"
                name="search"
              />
            </motion.div>
          </div>
        </section>

        <section className="mx-auto px-5 py-12 text-gray-600">
          <motion.div
            variants={cardListVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center"
          >
            {areSightingsLoading
              ? [1, 2, 3, 4].map((_, i) => <LoadingSkeleton key={i} />)
              : sightings.map((sighting) => (
                  <SightingCard key={sighting.id} sighting={sighting} />
                ))}
          </motion.div>
        </section>
      </main>
    </Layout>
  );
};

export default Sightings;
