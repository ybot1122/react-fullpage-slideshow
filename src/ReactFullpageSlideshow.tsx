import React, { useEffect } from "react";

export default function ReactFullpageSlideshow({items}: {items: JSX.Element[]}) {

  const itemsWrapped = items.map((item, ind) => <SlideContainer key={ind + '-fullpage-slideshow'}>{item}</SlideContainer>)

  return <div style={{
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw'
  }}>{itemsWrapped}</div>
}

const SlideContainer = ({children}: {children: JSX.Element}) => {

  return (<section style={{
    position: 'relative',
    width: '100%',
    height: '100%'
  }}>


    {children}

  </section>)

}