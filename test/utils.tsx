import React from "react";
import { ReactFullpageSlideshow } from "../src";
import { rfsApi } from "../src/types";

export const App = ({
  slideAnimationTiming = "full",
}: {
  slideAnimationTiming?: "full" | "partial";
}) => {
  return (
    <main>
      <ReactFullpageSlideshow
        slideAnimationTiming={slideAnimationTiming}
        items={[
          (api) => <Slide {...api} label="slide 1" />,
          (api) => <Slide {...api} label="slide 2" />,
          (api) => <Slide {...api} label="slide 3" />,
          (api) => <Slide {...api} label="slide 4" />,
          (api) => <Slide {...api} label="slide 5" />,
        ]}
      ></ReactFullpageSlideshow>
    </main>
  );
};

const Slide = ({
  goToSlide,
  goToNextSlide,
  label,
  goToPreviousSlide,
}: rfsApi & { label: string }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>{label}</h1>
      <button onClick={() => goToSlide(0)}>Go to Slide 0</button>
      <button onClick={() => goToNextSlide()}>{`Next-Slide-${label}`}</button>
      <button
        onClick={() => goToPreviousSlide()}
      >{`Previous-Slide-${label}`}</button>
    </div>
  );
};
