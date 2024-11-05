import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoToSlide, ReactFullpageSlideshowItem, rfsApi } from "./types";
import { isMouseEvent, isPointerEvent } from "./typeguards";

export default function ReactFullpageSlideshow({
  items,
  itemClassName = "",
  slideAnimationMs = 1000,
  slideAnimationTiming = "partial",
  swipeMinThresholdMs = 50,
  swipeMaxThresholdMs = 300,
  swipeMinDistance = 100,
}: {
  items: ReactFullpageSlideshowItem[];
  itemClassName?: string;
  slideAnimationMs?: number;
  slideAnimationTiming?: "partial" | "full";
  swipeMinThresholdMs?: number;
  swipeMaxThresholdMs?: number;
  swipeMinDistance?: number;
}) {
  // activeIndex ref and state should always be set together.
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // yOffset ref and state should always be set together.
  const yOffsetRef = useRef(0);
  const [yOffset, setYOffset] = useState(0);

  // tracks whether currently animating a slide change
  const isAnimatingRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modifiedSlideAnimationMs = useRef<number>(null);

  // keep track of when/where a pointer or touch event started
  const pointerStartData = useRef<
    undefined | { timestamp: number; y: number }
  >();

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimatingRef.current) return;
      if (
        index >= 0 &&
        index < items.length &&
        index !== activeIndexRef.current
      ) {
        modifiedSlideAnimationMs.current =
          (1 -
            Math.abs(
              yOffsetRef.current / document.documentElement.clientHeight,
            )) *
          slideAnimationMs;
        activeIndexRef.current = index;
        isAnimatingRef.current = true;
        setIsAnimating(true);
        setActiveIndex(index);

        setTimeout(() => {
          isAnimatingRef.current = false;
          modifiedSlideAnimationMs.current = null;
          setIsAnimating(false);
        }, modifiedSlideAnimationMs.current);
      }
    },
    [setActiveIndex, setIsAnimating, setYOffset, slideAnimationMs],
  );

  const pointerDownCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      if (isAnimatingRef.current) return;
      let y = 0;

      if (isPointerEvent(event) || isMouseEvent(event)) {
        y = event.clientY;
      } else {
        y = event.changedTouches["0"].clientY;
      }

      pointerStartData.current = {
        timestamp: Date.now(),
        y,
      };
    },
    [],
  );

  const pointerCancelCb = useCallback((e: unknown) => {
    console.log(e);
    console.log("cancelled?");
  }, []);

  const pointerUpCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      if (isAnimatingRef.current) return;

      let y = 0;
      if (isPointerEvent(event) || isMouseEvent(event)) {
        y = event.clientY;
      } else {
        y = event.changedTouches["0"].clientY;
      }

      if (!pointerStartData.current) return;
      if (yOffsetRef.current === 0) {
        pointerStartData.current = null;
        return;
      }
      const currentTs = Date.now();
      const isSwipe =
        currentTs - pointerStartData.current?.timestamp < swipeMaxThresholdMs &&
        currentTs - pointerStartData.current?.timestamp > swipeMinThresholdMs &&
        Math.abs(pointerStartData.current.y - y) > swipeMinDistance;
      const isDragged =
        Math.abs(yOffsetRef.current) >=
        document.documentElement.clientHeight / 2;
      if (isSwipe || isDragged) {
        if (yOffsetRef.current < 0) {
          goToSlide(activeIndexRef.current + 1);
        } else {
          goToSlide(activeIndexRef.current - 1);
        }
      } else {
        isAnimatingRef.current = true;
        modifiedSlideAnimationMs.current =
          Math.abs(yOffsetRef.current / document.documentElement.clientHeight) *
          slideAnimationMs;
        setIsAnimating(true);

        setTimeout(() => {
          isAnimatingRef.current = false;
          modifiedSlideAnimationMs.current = null;
          setIsAnimating(false);
        }, modifiedSlideAnimationMs.current);
      }
      yOffsetRef.current = 0;
      setYOffset(0);
      pointerStartData.current = undefined;
    },
    [
      goToSlide,
      setYOffset,
      swipeMaxThresholdMs,
      swipeMinThresholdMs,
      swipeMinDistance,
      setIsAnimating,
      slideAnimationMs,
    ],
  );

  const pointerMoveCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      if (isAnimatingRef.current) return;
      if (!pointerStartData.current) return;

      let y = 0;
      if (isPointerEvent(event) || isMouseEvent(event)) {
        y = event.clientY;
      } else {
        y = event.changedTouches["0"].clientY;
      }

      setYOffset(y - pointerStartData.current.y);
      yOffsetRef.current = y - pointerStartData.current.y;
    },
    [setYOffset],
  );

  useEffect(() => {
    //addEventListener("wheel", wheelCb);

    // TODO: feature detect
    addEventListener("pointerdown", pointerDownCb);
    addEventListener("pointerup", pointerUpCb);
    addEventListener("pointermove", pointerMoveCb);
    addEventListener("pointercancel", pointerCancelCb);
    addEventListener("touchstart", pointerDownCb);
    addEventListener("touchcancel", pointerCancelCb);
    addEventListener("touchmove", pointerMoveCb);
    addEventListener("touchend", pointerUpCb);

    return () => {
      //removeEventListener("wheel", wheelCb);

      removeEventListener("pointerdown", pointerDownCb);
      removeEventListener("pointerup", pointerUpCb);
      removeEventListener("pointermove", pointerMoveCb);
      removeEventListener("pointercancel", pointerCancelCb);
      removeEventListener("touchstart", pointerDownCb);
      removeEventListener("touchcancel", pointerCancelCb);
      removeEventListener("touchmove", pointerMoveCb);
      removeEventListener("touchend", pointerUpCb);
    };
  }, [pointerDownCb, pointerUpCb]);

  const itemsWrapped = items.map((item, ind) => (
    <SlideContainer
      goToSlide={goToSlide}
      index={ind}
      activeIndex={activeIndex}
      key={ind + "-fullpage-slideshow"}
      className={itemClassName}
      slideAnimationMs={
        slideAnimationTiming === "partial"
          ? (modifiedSlideAnimationMs.current ?? slideAnimationMs)
          : slideAnimationMs
      }
      yOffset={yOffset}
      isAnimating={isAnimating}
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
  yOffset,
  isAnimating,
}: {
  children: ReactFullpageSlideshowItem;
  index: number;
  activeIndex: number;
  goToSlide: GoToSlide;
  className: string;
  slideAnimationMs: number;
  yOffset: number;
  isAnimating: boolean;
}) => {
  const top = `calc(${(index - activeIndex) * 100}vh + ${yOffset}px)`;

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
        transition: isAnimating ? `top ${slideAnimationMs}ms ease-in-out` : ``,
      }}
    >
      {children(api)}
    </section>
  );
};
