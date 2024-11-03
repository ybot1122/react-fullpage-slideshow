import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./BasicTest.test";

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

  expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
    "top: -100vh",
  );
  expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
    "top: 0vh",
  );
  expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
    "top: 100vh",
  );
  expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
    "top: 200vh",
  );
  expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
    "top: 300vh",
  );
});
