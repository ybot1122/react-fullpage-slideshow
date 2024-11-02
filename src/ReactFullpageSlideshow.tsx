import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoToSlide, ReactFullpageSlideshowItem, rfsApi } from "./types";
import { isMouseEvent, isPointerEvent } from "./typeguards";

export default function ReactFullpageSlideshow({
  items,
  itemClassName = "",
  slideAnimationMs = 1000,
  swipeMinThresholdMs = 50,
  swipeMaxThresholdMs = 300,
  swipeMinDistance = 100,
}: {
  items: ReactFullpageSlideshowItem[];
  itemClassName?: string;
  slideAnimationMs?: number;
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

  // keep track of when/where a pointer or touch event started
  const pointerStartData = useRef<
    undefined | { timestamp: number; y: number }
  >();

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < items.length) {
        setActiveIndex(index);
        activeIndexRef.current = index;
      }
    },
    [setActiveIndex],
  );

  const pointerDownCb = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      let y = 0;

      if (isPointerEvent(event) || isMouseEvent(event)) {
        y = event.y;
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
      setYOffset(0);

      let y = 0;
      if (isPointerEvent(event) || isMouseEvent(event)) {
        y = event.y;
      } else {
        y = event.changedTouches["0"].clientY;
      }

      if (!pointerStartData.current) return;
      const currentTs = Date.now();
      const isSwipe =
        currentTs - pointerStartData.current?.timestamp < swipeMaxThresholdMs &&
        currentTs - pointerStartData.current?.timestamp > swipeMinThresholdMs &&
        Math.abs(pointerStartData.current.y - y) > swipeMinDistance;
      const isDragged =
        Math.abs(yOffsetRef.current) >=
        document.documentElement.clientHeight / 2;
      if (isSwipe || isDragged) {
        if (y < pointerStartData.current.y) {
          goToSlide(activeIndexRef.current + 1);
        } else {
          goToSlide(activeIndexRef.current - 1);
        }
      }

      yOffsetRef.current = 0;
      pointerStartData.current = undefined;
    },
    [
      goToSlide,
      setYOffset,
      swipeMaxThresholdMs,
      swipeMinThresholdMs,
      swipeMinDistance,
    ],
  );

  useEffect(() => {
    //addEventListener("wheel", wheelCb);

    // TODO: feature detect
    addEventListener("pointerdown", pointerDownCb);
    addEventListener("pointerup", pointerUpCb);
    //addEventListener("pointermove", pointerMoveCb);
    addEventListener("pointercancel", pointerCancelCb);
    addEventListener("touchstart", pointerDownCb);
    addEventListener("touchcancel", pointerCancelCb);
    //addEventListener("touchmove", pointerMoveCb);
    addEventListener("touchend", pointerUpCb);

    return () => {
      //removeEventListener("wheel", wheelCb);

      removeEventListener("pointerdown", pointerDownCb);
      removeEventListener("pointerup", pointerUpCb);
      //removeEventListener("pointermove", pointerMoveCb);
      removeEventListener("pointercancel", pointerCancelCb);
      removeEventListener("touchstart", pointerDownCb);
      removeEventListener("touchcancel", pointerCancelCb);
      //removeEventListener("touchmove", pointerMoveCb);
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
      slideAnimationMs={slideAnimationMs}
      yOffset={yOffset}
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
}: {
  children: ReactFullpageSlideshowItem;
  index: number;
  activeIndex: number;
  goToSlide: GoToSlide;
  className: string;
  slideAnimationMs: number;
  yOffset: number;
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
        marginTop: yOffset,
      }}
    >
      {children(api)}
    </section>
  );
};
