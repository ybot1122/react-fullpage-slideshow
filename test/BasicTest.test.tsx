import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ReactFullpageSlideshow } from "../src";
import { rfsApi } from "../src/types";

describe("BasicTest", () => {
  it("renders", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: 200vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 300vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 400vh",
    );

    await user.click(screen.getByText("Next-Slide-slide 1"));

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

    await user.click(screen.getByText("Next-Slide-slide 2"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 200vh",
    );

    await user.click(screen.getByText("Next-Slide-slide 3"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -300vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );

    await user.click(screen.getByText("Next-Slide-slide 4"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -400vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -300vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );

    await user.click(screen.getByText("Next-Slide-slide 5"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -400vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -300vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );

    await user.click(screen.getByText("Previous-Slide-slide 5"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -300vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );

    await user.click(screen.getByText("Previous-Slide-slide 4"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: -200vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: -100vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 200vh",
    );

    await user.click(screen.getByText("Previous-Slide-slide 3"));

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

    await user.click(screen.getByText("Previous-Slide-slide 2"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: 200vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 300vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 400vh",
    );

    await user.click(screen.getByText("Previous-Slide-slide 1"));

    expect(screen.getByText("slide 1").parentNode.parentNode).toHaveStyle(
      "top: 0vh",
    );
    expect(screen.getByText("slide 2").parentNode.parentNode).toHaveStyle(
      "top: 100vh",
    );
    expect(screen.getByText("slide 3").parentNode.parentNode).toHaveStyle(
      "top: 200vh",
    );
    expect(screen.getByText("slide 4").parentNode.parentNode).toHaveStyle(
      "top: 300vh",
    );
    expect(screen.getByText("slide 5").parentNode.parentNode).toHaveStyle(
      "top: 400vh",
    );
  });
});

const App = () => {
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
