import React from "react";
import { ReactFullpageSlideshow } from "../src";
import { rfsApi } from "../src/types";
import { Screen } from "@testing-library/dom";

export const App = () => {
  return (
    <main>
      <ReactFullpageSlideshow
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

export const assertSlidePosition = (activeIndex: number, screen: Screen) => {
  const slides = [0, 1, 2, 3, 4];
  slides.map((ind) => {
    const top = `calc(${(ind - activeIndex) * 100}vh + ${0}px)`;
    expect(
      screen.getByText(`slide ${ind + 1}`).parentNode.parentNode,
    ).toHaveStyle(`top: ${top}`);
  });
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
