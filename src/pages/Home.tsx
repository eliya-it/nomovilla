import { FunctionComponent } from "react";
import Hero from "@components/Hero/Hero";
import Testimonial from "@components/Testimonial/Testimonial";
import Meals from "@components/Meals/Meals";
import PageTransition from "@ui/PageTransition";

const Home: FunctionComponent = () => {
  return (
    <PageTransition>
      <Hero />
      <Meals />
      <Testimonial />
    </PageTransition>
  );
};

export default Home;
