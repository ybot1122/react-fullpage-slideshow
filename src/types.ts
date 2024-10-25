export interface rfsApi {
  goToSlide: GoToSlide;
  goToNextSlide: GoToNextSlide;
  goToPreviousSlide: GoToPreviousSlide;
}

export type GoToPreviousSlide = () => void;
export type GoToNextSlide = () => void;
export type GoToSlide = (index: number) => void;
export type ReactFullpageSlideshowItem = (rfsApi) => JSX.Element;
