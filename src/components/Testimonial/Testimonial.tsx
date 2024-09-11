import { FunctionComponent } from "react";
import Section from "@components/utils/Section";
import TestimonialCl from "./Testimonial.module.css";

const Testimonial: FunctionComponent = () => {
  return (
    <Section isReset>
      <div className={TestimonialCl.testimonial}>
        <blockquote className={TestimonialCl.block}>
          <p className={TestimonialCl.text}>
            “I have been using this app for a few weeks now and I am so glad
            that I did! It has really helped me a lot with my diet."
          </p>
          <cite className={TestimonialCl.author}>
            - John Doe, Customer at Nomovilla
          </cite>
        </blockquote>
      </div>
    </Section>
  );
};

export default Testimonial;
