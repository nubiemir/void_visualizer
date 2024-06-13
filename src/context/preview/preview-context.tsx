import {
  Accessor,
  createContext,
  createEffect,
  createMemo,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js";
import { TResult, TUniqueArr } from "../../types";
import BubbleService from "../../services/sorting/bubble.service";
import { createStore, produce } from "solid-js/store";

type TPreviewStore = {
  containerWidth: number;
  containerHeight: number;
  frameIdx: number;
  isPaused: boolean;
  isAnimating: boolean;
  isDone: boolean;
  expand: boolean;
  showTimeLine: boolean;
  container: SVGElement | undefined;
  slider: HTMLDivElement | undefined;
  group: SVGGElement | undefined;
  data: TResult[];
};

type TPreviewContext = {
  previewStore: TPreviewStore;
  handleStartAnimation: (event: MouseEvent) => void;
  handleExpandToggle: () => void;
  handleSliderClick: (event: MouseEvent) => void;
  handleClickNext: (event: MouseEvent) => void;
  handleClickPrevious: (event: MouseEvent) => void;
  handlePauseAnimation: () => void;
  handleReplayAnimation: (event: MouseEvent) => void;
  setRefs: (
    container: SVGElement,
    group: SVGGElement,
    slider: HTMLDivElement
  ) => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
};

const arr = [265, 151, 386, 329, 24, 55, 162, 295, 101];
const PreviewContext = createContext<TPreviewContext>();

export const PreviewProvider: ParentComponent = (props) => {
  const [previewStore, setPreviewStore] = createStore<TPreviewStore>({
    containerWidth: 0,
    containerHeight: 0,
    frameIdx: 0,
    isPaused: true,
    isAnimating: false,
    isDone: false,
    expand: false,
    showTimeLine: false,
    container: undefined,
    slider: undefined,
    group: undefined,
    data: [],
  });

  let timer: number | null;

  const uniqueArr: Accessor<TUniqueArr[]> = createMemo(() =>
    arr.map((itm, idx) => {
      return { value: itm, id: idx };
    })
  );

  createEffect(() => {
    if (previewStore.container) {
      setPreviewStore(
        produce((state) => {
          state.containerWidth = previewStore.container?.clientWidth || 0;
          state.containerHeight = previewStore.container?.clientHeight || 0;
          state.data = service.getData;
        })
      );
      drawBars();
    }
  });

  const setRefs = (
    container: SVGElement,
    group: SVGGElement,
    slider: HTMLDivElement
  ) => {
    setPreviewStore(
      produce((state) => {
        state.container = container;
        state.group = group;
        state.slider = slider;
      })
    );
  };

  const service = new BubbleService(uniqueArr());

  const handleSliderClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (!previewStore.slider) return;

    service.pauseAnimation();
    const pageX = event.pageX;
    const sliderLength = previewStore.slider.clientWidth;
    const sliderToFrameLenght = sliderLength / (previewStore.data.length - 1);
    const leftPosition = previewStore.slider.getBoundingClientRect().left;
    let positionClicked = pageX - leftPosition;

    if (positionClicked > sliderLength) positionClicked = sliderLength;

    if (positionClicked < 0) positionClicked = 0;

    const positionClickIdx = Math.ceil(positionClicked / sliderToFrameLenght);
    if (positionClickIdx >= previewStore.data.length - 1) {
      handleAnimationFinished();
      setPreviewStore("frameIdx", positionClickIdx);
      drawBars();
      return;
    }

    if (
      positionClickIdx < previewStore.data.length - 1 &&
      previewStore.isDone
    ) {
      handlePauseAnimation();
      setPreviewStore(
        produce((state) => {
          state.frameIdx = positionClickIdx;
          state.isDone = false;
        })
      );
      drawBars();
      return;
    }

    setPreviewStore("frameIdx", positionClickIdx);
    drawBars();
    previewStore.isAnimating &&
      !previewStore.isPaused &&
      handleStartAnimation(event);
  };

  const handleClickNext = (event: MouseEvent) => {
    event.stopPropagation();
    const length = previewStore.data.length - 1;
    if (previewStore.frameIdx + 1 >= length) {
      handleAnimationFinished();

      setPreviewStore("frameIdx", length);
      drawBars();
      return;
    }

    setPreviewStore("frameIdx", (prev) => prev + 1);
    if (!previewStore.isPaused && previewStore.isAnimating) {
      handlePauseAnimation();
      drawBars();
      handleStartAnimation(event);
    } else {
      drawBars();
    }
  };

  const handleClickPrevious = (event: MouseEvent) => {
    event.stopPropagation();

    if (previewStore.frameIdx - 1 <= 0) {
      setPreviewStore("frameIdx", 0);
      drawBars();
      return;
    }

    setPreviewStore("frameIdx", (prev) => prev - 1);
    if (previewStore.isDone) {
      setPreviewStore(
        produce((state) => {
          state.isDone = false;
          state.isPaused = true;
        })
      );
    }
    if (!previewStore.isPaused && previewStore.isAnimating) {
      handlePauseAnimation();
      drawBars();
      handleStartAnimation(event);
    } else {
      drawBars();
    }
  };

  const handleStartAnimation = (event: MouseEvent) => {
    event.stopPropagation();

    setPreviewStore(
      produce((state) => {
        state.isPaused = false;
        state.isDone = false;
        state.isAnimating = true;
      })
    );

    if (previewStore.container)
      service.animate(
        previewStore.containerWidth,
        previewStore.containerHeight,
        previewStore.container,
        handleFrameChange,
        handleAnimationFinished,
        previewStore.frameIdx
      );
  };

  const handleFrameChange = (frame: number) => {
    setPreviewStore("frameIdx", frame);
  };

  const handlePauseAnimation = () => {
    service.pauseAnimation();
    setPreviewStore(
      produce((state) => {
        state.isPaused = true;
        state.isAnimating = false;
      })
    );
  };

  const handleReplayAnimation = (event: MouseEvent) => {
    setPreviewStore("frameIdx", 0);
    drawBars();
    handleStartAnimation(event);
  };

  const handleAnimationFinished = () => {
    setPreviewStore(
      produce((state) => {
        state.isDone = true;
        state.isPaused = false;
        state.isAnimating = false;
      })
    );
  };

  const drawBars = () => {
    if (previewStore.container) {
      service.draw(
        previewStore.containerWidth,
        previewStore.containerHeight,
        previewStore.container,
        previewStore.frameIdx
      );
    }
  };

  const handleExpandToggle = () => {
    setPreviewStore("expand", (expand) => !expand);
  };

  const handleMouseOver = () => {
    if (timer !== null && timer !== undefined) clearTimeout(timer);
    setPreviewStore("showTimeLine", true);
  };
  const handleMouseOut = () => {
    timer = setTimeout(() => {
      setPreviewStore("showTimeLine", false);
    }, 1000);
  };

  document.addEventListener("resize", (event: any) => {
    setPreviewStore(
      produce((state) => {
        state.containerWidth = previewStore.container?.clientWidth || 0;
        state.containerHeight = previewStore.container?.clientHeight || 0;
      })
    );
    if (previewStore.isAnimating && !previewStore.isPaused) {
      handlePauseAnimation();
      previewStore.group?.replaceChildren();
      drawBars();
      handleStartAnimation(event);
    } else {
      previewStore.group?.replaceChildren();
      drawBars();
    }
  });

  document.addEventListener("keypress", (event: any) => {
    const keyCode = event.code;
    if (
      keyCode.toLowerCase() === "space" &&
      previewStore.isPaused &&
      !previewStore.isDone
    )
      return handleStartAnimation(event);
    if (keyCode.toLowerCase() === "space" && previewStore.isDone)
      return handleReplayAnimation(event);
    handlePauseAnimation();
  });

  return (
    <PreviewContext.Provider
      value={{
        previewStore: previewStore,
        setRefs,
        handleStartAnimation,
        handleExpandToggle,
        handleSliderClick,
        handleClickNext,
        handleClickPrevious,
        handlePauseAnimation,
        handleReplayAnimation,
        handleMouseOver,
        handleMouseOut,
      }}
    >
      {props.children}
    </PreviewContext.Provider>
  );
};

export const usePreviewStore = () => {
  const value = useContext(PreviewContext);
  if (value === undefined) {
    throw new Error("useMyContext must be used within a MyContext.Provider");
  }
  return value;
};
