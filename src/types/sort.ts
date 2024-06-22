export type TUniqueArr = {
  value: number;
  id: number;
};

export type TResult = {
  data: {
    rank: number;
    value: number;
    compare: boolean;
    sorted: boolean;
    id: number;
  }[];
};

export type TSelectionResult = {
  data: {
    rank: number;
    value: number;
    active: boolean;
    selected: boolean;
    sorted: boolean;
    id: number;
  }[];
};

export interface ISorting {
  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    frameIdx: number,
    speed: number
  ): void;

  animate(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    handleFrameChange: (frame: number) => void,
    handleAnimationFinished: () => void,
    frameIdx: number,
    speed: number
  ): void;
  pauseAnimation(): void;
  createAnimationFrames(arr: TUniqueArr[]): any[];
}
