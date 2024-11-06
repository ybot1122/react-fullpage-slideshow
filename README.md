# react-fullpage-slideshow

React Component to create a fullpage slideshow. Works with touch devices.

# Getting Started

Install the package

`npm i --save @ybot1122/react-fullpage-slideshow`

Import and pass items in

```tsx
import { ReactFullpageSlideshow } from "../src";

const slideshow = () => (
  <ReactFullpageSlideshow
    items={[
      (rfsApi) => <div>slide 1</div>,
      (rfsApi) => <div>slide 2</div>,
      (rfsApi) => <div>slide 3</div>,
      (rfsApi) => <div>slide 4</div>,
      (rfsApi) => <div>slide 5</div>,
    ]}
  />
);
```

# ReactFullpageSlideshow Props

The ReactFullpageSlideshow component accepts props to customize and configure the look and feel of the slideshow.

`itemClassName?: string;`: Passes a classname to the wrapper around each slide. Default: `''`

`slideAnimationMs?: number;`: Duration for the slide animation. Default: `1000`

`slideAnimationTiming?: "partial" | "full";`: When set to full (default), all slide animations will always run for the full duration set in slideAnimationMs. When set to partial, slide animations will be proportional to its distance to completion.

For example: an animation that goes to the next page will take slideAnimationMs. But an animation that starts from the mid-screen will run for 0.5 \* slideAnimationMs

`swipeMinThresholdMs?: number;`: The minimum duration for a gesture to be considered a swipe. Default: `50`

`swipeMaxThresholdMs?: number;`: The maximum duration for a gesture to be considered a swipe. Default: `300`

`swipeMinDistance?: number;`: The minimum distance required for a gesture to be considered a swipe. Default: `100`

# rfsApi

Each item is passed an object called `rfsApi`. This object exposes methods that the items can use to control the slideshow.

`rfsApi.goToPreviousSlide()`: Causes slideshow to go to previous slide.

`rfsApi.goToNextSlide()`: Causes slideshow to go to next slide.

`rfsApi.goToSlide(index: number)`: Causes slideshow to go to a specific slide.

# Local Development

1. `npm i`
2. Enjoy
