import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React, { act } from "react";
import { ReactFullpageSlideshow } from "../src";
import { rfsApi } from "../src/types";

jest.useFakeTimers({ advanceTimers: true });

describe("BasicTest", () => {
  it("renders", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(document.documentElement, "clientHeight", "get")
      .mockImplementation(() => 500);

    render(<App />);

    await act(async () => {
      assertSlidePosition(0);

      await user.click(screen.getByText("Next-Slide-slide 1"));

      assertSlidePosition(1);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 2"));

      assertSlidePosition(2);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 3"));

      assertSlidePosition(3);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 4"));

      assertSlidePosition(4);

      jest.runAllTimers();

      // Clicking this should be a no-op because we are already on the last slide
      await user.click(screen.getByText("Next-Slide-slide 5"));

      assertSlidePosition(4);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 5"));

      assertSlidePosition(3);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 4"));

      assertSlidePosition(2);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 3"));

      assertSlidePosition(1);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 2"));

      assertSlidePosition(0);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 1"));

      assertSlidePosition(0);
    });
  });
});

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

export const assertSlidePosition = (activeIndex: number) => {
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
