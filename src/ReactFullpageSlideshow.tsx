import React, { useCallback, useRef, useState } from "react";
import { GoToSlide, ReactFullpageSlideshowItem, rfsApi } from "./types";

export default function ReactFullpageSlideshow({items}: {items: ReactFullpageSlideshowItem[]}) {

  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < items.length) {
      setActiveIndex(index)
      activeIndexRef.current = index;
    }
  }, [setActiveIndex]);

  const itemsWrapped = items.map((item, ind) => <SlideContainer goToSlide={goToSlide} index={ind} activeIndex={activeIndex} key={ind + '-fullpage-slideshow'}>{item}</SlideContainer>)

  return <div style={{
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw'
  }}>{itemsWrapped}</div>
}

const SlideContainer = ({children, index, activeIndex, goToSlide}: {children: ReactFullpageSlideshowItem, index: number, activeIndex: number, goToSlide: GoToSlide}) => {
  let top = "0px";
  if (index < activeIndex) {
    top = "-100vh";
  } else if (index > activeIndex) {
    top = "100vh";
  }

  const goToNextSlide = useCallback(() => goToSlide(index + 1), [goToSlide, index]);
  const goToPreviousSlide = useCallback(() => goToSlide(index - 1), [goToSlide, index]);

  const api:rfsApi = {
    goToNextSlide,
    goToPreviousSlide,
    goToSlide
  }

  return (<section style={{
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: index * 100,
    top,
  }}>


    {children(api)}

  </section>)

}