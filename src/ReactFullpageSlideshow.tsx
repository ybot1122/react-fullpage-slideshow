import React, { useCallback, useRef, useState } from "react";
import { GoToSlide, ReactFullpageSlideshowItem, rfsApi } from "./types";

export default function ReactFullpageSlideshow({
  items,
  itemClassName = "",
  slideAnimationMs = 1000,
}: {
  items: ReactFullpageSlideshowItem[];
  itemClassName?: string;
  slideAnimationMs?: number;
}) {
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
        activeIndexRef.current = index;
      }
    },
    [setActiveIndex],
  );

  const itemsWrapped = items.map((item, ind) => (
    <SlideContainer
      goToSlide={goToSlide}
      index={ind}
      activeIndex={activeIndex}
      key={ind + "-fullpage-slideshow"}
      className={itemClassName}
      slideAnimationMs={slideAnimationMs}
    >
      {item}
    </SlideContainer>
  ));

  return (
    <div
      style={{
        overflow: "hidden",
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
      }}
    >
      {itemsWrapped}
    </div>
  );
}

const SlideContainer = ({
  children,
  index,
  activeIndex,
  goToSlide,
  className,
  slideAnimationMs,
}: {
  children: ReactFullpageSlideshowItem;
  index: number;
  activeIndex: number;
  goToSlide: GoToSlide;
  className: string;
  slideAnimationMs: number;
}) => {
  const top = `${(index - activeIndex) * 100}vh`;

  const goToNextSlide = useCallback(
    () => goToSlide(index + 1),
    [goToSlide, index],
  );
  const goToPreviousSlide = useCallback(
    () => goToSlide(index - 1),
    [goToSlide, index],
  );

  const api: rfsApi = {
    goToNextSlide,
    goToPreviousSlide,
    goToSlide,
  };

  return (
    <section
      className={className}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: index * 100,
        left: "0px",
        top,
        transition: `top ${slideAnimationMs}ms ease-in-out`,
      }}
    >
      {children(api)}
    </section>
  );
};
