import React, { FunctionComponent } from "react";
import Section from "@components/utils/Section";
import { testimonial, block, text, author } from "./Testimonial.module.css";

const Testimonial: FunctionComponent = () => {
  return (
    <Section isReset>
      <div className={testimonial}>
        <blockquote className={block}>
          <p className={text}>
            “I have been using this app for a few weeks now and I am so glad
            that I did! It has really helped me a lot with my diet."
          </p>
          <cite className={author}>- John Doe, Customer at Nomovilla</cite>
        </blockquote>
      </div>
    </Section>
  );
};

export default Testimonial;
