import { useParams } from "@solidjs/router";
import {
  createContext,
  createEffect,
  onMount,
  ParentComponent,
  useContext,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { visualizerFactory } from "../../services/sorting/visualizerFactory";
import { TResult, TSelectionResult, TUniqueArr } from "../../types";

type TPreviewStore = {
  containerWidth: number;
  containerHeight: number;
  frameIdx: number;
  isPaused: boolean;
  isAnimating: boolean;
  isDone: boolean;
  expand: boolean;
  speed: number;
  showTimeLine: boolean;
  showSetting: boolean;
  container: SVGElement | undefined;
  slider: HTMLDivElement | undefined;
  group: SVGGElement | undefined;
  data: TUniqueArr[];
  frames: TResult[] | TSelectionResult[];
  transform: any;
};

type TPreviewContext = {
  previewStore: TPreviewStore;
  handleStartAnimation: (event: MouseEvent) => void;
  handleExpandToggle: () => void;
  handleSettingToggle: (event: MouseEvent) => void;
  handleSliderClick: (event: MouseEvent) => void;
  handleClickNext: (event: MouseEvent) => void;
  handleClickPrevious: (event: MouseEvent) => void;
  handleSpeedChange: (value: number) => void;
  handlePauseAnimation: () => void;
  handleReplayAnimation: (event: MouseEvent) => void;
  setContainerRefs: (container: SVGElement, group: SVGGElement) => void;
  setSliderRef: (slider: HTMLDivElement) => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
  setData: (arr: number[]) => void;
};

const PreviewContext = createContext<TPreviewContext>();

export const PreviewProvider: ParentComponent = (props) => {
  const [previewStore, setPreviewStore] = createStore<TPreviewStore>({
    containerWidth: 0,
    containerHeight: 0,
    frameIdx: 0,
    speed: 1,
    isPaused: true,
    isAnimating: false,
    isDone: false,
    expand: false,
    showTimeLine: false,
    showSetting: false,
    container: undefined,
    slider: undefined,
    group: undefined,
    data: [
      { value: 10, id: 0 },
      { value: 40, id: 1 },
      { value: 23, id: 2 },
      { value: 15, id: 3 },
      { value: 55, id: 4 },
    ],
    frames: [],
    transform: undefined,
  });

  let timer: number | null;

  const { id } = useParams();
  const service = visualizerFactory(id);

  onMount(() => {
    const data = service.createAnimationFrames(previewStore.data);
    setPreviewStore("frames", data);
  });

  createEffect(() => {
    if (previewStore.container) {
      setPreviewStore(
        produce((state) => {
          state.containerWidth = previewStore.container?.clientWidth || 0;
          state.containerHeight = previewStore.container?.clientHeight || 0;
        }),
      );
      service.zoom(previewStore.container, setTransform);
      drawObjects();
    }
  });

  const setTransform = (data: any) => {
    setPreviewStore("transform", data);
  };

  const setContainerRefs = (container: SVGElement, group: SVGGElement) => {
    setPreviewStore(
      produce((state) => {
        state.container = container;
        state.group = group;
      }),
    );
  };

  const setSliderRef = (slider: HTMLDivElement) => {
    setPreviewStore(
      produce((state) => {
        state.slider = slider;
      }),
    );
  };

  const setData = (arr: number[]) => {
    const data: TUniqueArr[] = arr.map((item, idx) => {
      return {
        value: item,
        id: idx,
      };
    });
    const frames = service.createAnimationFrames(data);

    setPreviewStore(
      produce((state) => {
        state.data = data;
        state.frames = frames;
        state.frameIdx = 0;
        state.isDone = false;
      }),
    );
    previewStore.group?.replaceChildren();
    handlePauseAnimation();
    setPreviewStore("frameIdx", 0);
    drawObjects();
  };

  const handleSliderClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (!previewStore.slider) return;

    service.pauseAnimation();
    const pageX = event.pageX;
    const sliderLength = previewStore.slider.clientWidth;
    const sliderToFrameLenght = sliderLength / (previewStore.frames.length - 1);
    const leftPosition = previewStore.slider.getBoundingClientRect().left;
    let positionClicked = pageX - leftPosition;

    if (positionClicked > sliderLength) positionClicked = sliderLength;

    if (positionClicked < 0) positionClicked = 0;

    const positionClickIdx = Math.round(positionClicked / sliderToFrameLenght);
    if (positionClickIdx >= previewStore.frames.length - 1) {
      handleAnimationFinished();
      setPreviewStore("frameIdx", positionClickIdx);
      drawObjects();
      return;
    }

    if (
      positionClickIdx < previewStore.frames.length - 1 &&
      previewStore.isDone
    ) {
      handlePauseAnimation();
      setPreviewStore(
        produce((state) => {
          state.frameIdx = positionClickIdx;
          state.isDone = false;
        }),
      );
      drawObjects();
      return;
    }

    setPreviewStore("frameIdx", positionClickIdx);
    drawObjects();
    previewStore.isAnimating &&
      !previewStore.isPaused &&
      handleStartAnimation(event);
  };

  const handleClickNext = (event: MouseEvent) => {
    event.stopPropagation();
    const length = previewStore.frames.length - 1;
    if (previewStore.frameIdx + 1 >= length) {
      handleAnimationFinished();

      setPreviewStore("frameIdx", length);
      drawObjects();
      return;
    }

    setPreviewStore("frameIdx", (prev) => prev + 1);
    if (!previewStore.isPaused && previewStore.isAnimating) {
      handlePauseAnimation();
      drawObjects();
      handleStartAnimation(event);
    } else {
      drawObjects();
    }
  };

  const handleClickPrevious = (event: MouseEvent) => {
    event.stopPropagation();

    if (previewStore.frameIdx - 1 <= 0) {
      setPreviewStore("frameIdx", 0);
      drawObjects();
      return;
    }

    setPreviewStore("frameIdx", (prev) => prev - 1);
    if (previewStore.isDone) {
      setPreviewStore(
        produce((state) => {
          state.isDone = false;
          state.isPaused = true;
        }),
      );
    }
    if (!previewStore.isPaused && previewStore.isAnimating) {
      handlePauseAnimation();
      drawObjects();
      handleStartAnimation(event);
    } else {
      drawObjects();
    }
  };

  const handleStartAnimation = (event: MouseEvent) => {
    event.stopPropagation();

    setPreviewStore(
      produce((state) => {
        state.isPaused = false;
        state.isDone = false;
        state.isAnimating = true;
      }),
    );

    if (previewStore.container)
      service.animate(
        previewStore.containerWidth,
        previewStore.containerHeight,
        previewStore.container,
        handleFrameChange,
        handleAnimationFinished,
        previewStore.frameIdx,
        previewStore.speed,
        previewStore.transform,
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
      }),
    );
  };

  const handleReplayAnimation = (event: MouseEvent) => {
    setPreviewStore("frameIdx", 0);
    drawObjects();
    handleStartAnimation(event);
  };

  const handleAnimationFinished = () => {
    setPreviewStore(
      produce((state) => {
        state.isDone = true;
        state.isPaused = false;
        state.isAnimating = false;
      }),
    );
  };

  const drawObjects = () => {
    if (previewStore.container) {
      service.draw(
        previewStore.containerWidth,
        previewStore.containerHeight,
        previewStore.container,
        previewStore.frameIdx,
        previewStore.speed,
        previewStore.transform,
      );
    }
  };

  const handleExpandToggle = () => {
    setPreviewStore("expand", (prev) => !prev);
  };

  const handleSettingToggle = (event: MouseEvent) => {
    event.stopPropagation();
    setPreviewStore("showSetting", (prev) => !prev);
  };

  const handleMouseOver = () => {
    if (timer !== null && timer !== undefined) clearTimeout(timer);
    setPreviewStore("showTimeLine", true);
  };

  const handleMouseOut = () => {
    timer = setTimeout(() => {
      setPreviewStore(
        produce((state) => {
          state.showSetting = false;
          state.showTimeLine = false;
        }),
      );
    }, 2000);
  };

  const handleSpeedChange = (value: number) => {
    setPreviewStore("speed", value);
    if (!previewStore.isAnimating) return;

    service.pauseAnimation();

    if (previewStore.container)
      service.animate(
        previewStore.containerWidth,
        previewStore.containerHeight,
        previewStore.container,
        handleFrameChange,
        handleAnimationFinished,
        previewStore.frameIdx,
        previewStore.speed,
        previewStore.transform,
      );
  };

  window.addEventListener("resize", (event: any) => {
    setPreviewStore(
      produce((state) => {
        state.containerWidth = previewStore.container?.clientWidth || 0;
        state.containerHeight = previewStore.container?.clientHeight || 0;
      }),
    );
    if (previewStore.isAnimating && !previewStore.isPaused) {
      handlePauseAnimation();
      previewStore.group?.replaceChildren();
      drawObjects();
      handleStartAnimation(event);
    } else {
      previewStore.group?.replaceChildren();
      drawObjects();
    }
  });

  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as Element;
    const isParent = target.closest(".setting");
    if (
      !isParent &&
      !target.classList.contains("setting-btn") &&
      previewStore.showSetting
    ) {
      setPreviewStore("showSetting", false);
    }
  });

  return (
    <PreviewContext.Provider
      value={{
        previewStore: previewStore,
        setContainerRefs,
        setSliderRef,
        handleStartAnimation,
        handleExpandToggle,
        handleSettingToggle,
        handleSliderClick,
        handleClickNext,
        handleSpeedChange,
        handleClickPrevious,
        handlePauseAnimation,
        handleReplayAnimation,
        handleMouseOver,
        handleMouseOut,
        setData,
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
