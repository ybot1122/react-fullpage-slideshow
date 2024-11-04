import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { act, render, screen } from "@testing-library/react";
import React from "react";
import { App, assertSlidePosition } from "./utils";

jest.useFakeTimers({ advanceTimers: true });

describe("BasicTest", () => {
  it("renders", async () => {
    const user = userEvent.setup();
    jest
      .spyOn(document.documentElement, "clientHeight", "get")
      .mockImplementation(() => 500);

    render(<App />);

    await act(async () => {
      assertSlidePosition(0, screen);

      await user.click(screen.getByText("Next-Slide-slide 1"));

      assertSlidePosition(1, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 2"));

      assertSlidePosition(2, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 3"));

      assertSlidePosition(3, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Next-Slide-slide 4"));

      assertSlidePosition(4, screen);

      jest.runAllTimers();

      // Clicking this should be a no-op because we are already on the last slide
      await user.click(screen.getByText("Next-Slide-slide 5"));

      assertSlidePosition(4, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 5"));

      assertSlidePosition(3, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 4"));

      assertSlidePosition(2, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 3"));

      assertSlidePosition(1, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 2"));

      assertSlidePosition(0, screen);

      jest.runAllTimers();

      await user.click(screen.getByText("Previous-Slide-slide 1"));

      assertSlidePosition(0, screen);
    });
  });
});
