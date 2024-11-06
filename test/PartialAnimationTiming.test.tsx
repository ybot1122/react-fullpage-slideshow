import React from "react";
import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { App } from "./utils";

jest.useFakeTimers();

test("PartialAnimationTiming", async () => {
  // @ts-expect-error overriding PointerEvent on window
  window.PointerEvent = MouseEvent;

  render(<App slideAnimationTiming="partial" />);
  assertSlidePosition(0);
  const main = screen.getByRole("main");
  jest
    .spyOn(document.documentElement, "clientHeight", "get")
    .mockImplementation(() => 500);

  await act(async () => {
    await fireEvent.pointerDown(main, { clientY: 250, ctrlKey: false });
    await fireEvent.pointerMove(main, { clientY: 0, ctrlKey: false });
    jest.advanceTimersByTime(101);
    await fireEvent.pointerUp(main, { clientY: 0, ctrlKey: false });
  });

  assertSlidePosition(1);

  // clicking button should be no-op because it is still animating
  await fireEvent.click(screen.getByText("Next-Slide-slide 2"));
  assertSlidePosition(1);

  jest.advanceTimersByTime(499);

  // clicking button should be no-op because it is still animating
  await fireEvent.click(screen.getByText("Next-Slide-slide 2"));
  assertSlidePosition(1);

  await act(async () => {
    jest.advanceTimersByTime(1);
  });

  // clicking button work because animation is done in only 500ms
  await fireEvent.click(screen.getByText("Next-Slide-slide 2"));
  assertSlidePosition(2);
});

const assertSlidePosition = (activeIndex: number) => {
  const slides = [0, 1, 2, 3, 4];
  slides.map((ind) => {
    const top = `calc(${(ind - activeIndex) * 100}vh + ${0}px)`;
    expect(
      screen.getByText(`slide ${ind + 1}`).parentNode.parentNode,
    ).toHaveStyle(`top: ${top}`);
  });
};
