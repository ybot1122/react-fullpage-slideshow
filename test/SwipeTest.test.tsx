import React from "react";
import { fireEvent, render, Screen, screen } from "@testing-library/react";
import { App } from "./utils";

jest.useRealTimers();

test("SwipeTest", async () => {
  // @ts-expect-error overriding PointerEvent on window
  window.PointerEvent = MouseEvent;
  jest
    .spyOn(document.documentElement, "clientHeight", "get")
    .mockImplementation(() => 500);

  render(<App />);
  const main = screen.getByRole("main");

  await fireEvent.pointerDown(main, { clientY: 101, ctrlKey: false });
  await new Promise((resolve) => setTimeout(resolve, 51));
  await fireEvent.pointerUp(main, { clientY: 0, ctrlKey: false });

  assertSlidePosition(1, screen);
});

const assertSlidePosition = (activeIndex: number, screen: Screen) => {
  const slides = [0, 1, 2, 3, 4];
  slides.map((ind) => {
    const top = `calc(${(ind - activeIndex) * 100}vh + ${0}px)`;
    expect(
      screen.getByText(`slide ${ind + 1}`).parentNode.parentNode,
    ).toHaveStyle(`top: ${top}`);
  });
};
