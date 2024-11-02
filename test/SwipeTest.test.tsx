/**
 * @jest-environment jsdom
 */

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { App } from "./BasicTest.test";

test.skip("test swipes", () => {
  jest
    .spyOn(document.documentElement, "clientHeight", "get")
    .mockImplementation(() => 500);

  render(<App />);
  const main = screen.getByRole("main");

  fireEvent(main, new PointerEvent("pointerup"));

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
