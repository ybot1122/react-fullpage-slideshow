import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { App, assertSlidePosition } from "./BasicTest.test";

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

  assertSlidePosition(1);
});
