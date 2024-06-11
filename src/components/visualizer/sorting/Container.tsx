import { Accessor, createMemo, createSignal, onMount, Show } from "solid-js";
import BubbleService from "../../../services/sorting/bubble.service";
import { TResult, TUniqueArr } from "../../../types";
import TimeLine from "../../common/timeline/TimeLine";

const arr = [
  87, 352, 168, 427, 420, 419, 198, 155, 174, 138, 23, 102, 7, 247, 358, 394,
  // 265, 151, 386, 329, 24, 55, 162, 295, 101, 398, 209, 161, 233, 215, 450, 133,
  // 21, 121, 179, 69, 296, 66, 218, 335, 260, 331, 257, 111, 431, 42, 88, 383, 54,
  // 245, 59, 229, 393, 359, 40, 171, 319, 26, 310, 321, 166, 374, 392, 377, 49,
  // 327, 292, 342, 86, 409, 212, 286, 52, 31, 299, 223, 8, 181, 71, 110, 323, 262,
  // 371, 122, 194, 395, 380, 158, 14, 185, 269, 287, 182, 202, 108, 416, 320, 127,
  // 230, 340, 175, 130, 48, 124, 414, 346, 255, 30, 159, 100, 368, 213, 445, 38,
  // 95, 17, 177, 57, 210, 242, 190, 109, 28, 326, 334, 443, 199, 136, 281, 446,
  // 231, 217, 77, 303, 197, 267, 83, 339, 253, 259, 65, 426, 333, 205, 276, 97,
  // 27, 311, 330, 92,
];

const Container = () => {
  const [containerWidth, setContainerWidth] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);
  const [data, setData] = createSignal<TResult[]>([]);
  const [frameIdx, setFrameIdx] = createSignal(0);
  const [isPaused, setIsPaused] = createSignal(true);
  const [isDone, setIsDone] = createSignal(false);
  const [isAnimating, setIsAnimating] = createSignal(false);
  const [showTimeLine, setShowTimeLine] = createSignal(false);

  const derivative = () => (frameIdx() / (data().length - 1) || 0) * 100;

  let svg!: SVGElement;
  let g!: SVGGElement;
  let sliderRef!: HTMLDivElement;
  let timer: number | null;

  const uniqueArr: Accessor<TUniqueArr[]> = createMemo(() =>
    arr.map((itm, idx) => {
      return { value: itm, id: idx };
    })
  );
  const service = new BubbleService(uniqueArr());

  onMount(() => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);
    setData(service.getData);
    service.draw(containerWidth(), containerHeight(), svg, 0);
  });

  window.addEventListener("resize", (event: any) => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);
    if (isAnimating() && !isPaused()) {
      handlePauseAnimation();
      g.replaceChildren();
      drawBars();
      handleStartAnimation(event);
    } else {
      g.replaceChildren();
      drawBars();
    }
  });

  document.addEventListener("keypress", (event: any) => {
    const keyCode = event.code;
    if (keyCode.toLowerCase() === "space" && isPaused() && !isDone())
      return handleStartAnimation(event);
    if (keyCode.toLowerCase() === "space" && isDone())
      return handleReplayAnimation(event);
    handlePauseAnimation();
  });

  const drawBars = () => {
    service.draw(containerWidth(), containerHeight(), svg, frameIdx());
  };

  const handleStartAnimation = async (event: MouseEvent) => {
    event.stopPropagation();
    setIsPaused(false);
    setIsDone(false);
    setIsAnimating(true);

    service.animate(
      containerWidth(),
      containerHeight(),
      svg,
      handleFrameChange,
      handleAnimationFinished,
      frameIdx
    );
  };

  const handlePauseAnimation = () => {
    service.pauseAnimation();
    setIsPaused(true);
    setIsAnimating(false);
  };

  const handleReplayAnimation = (event: MouseEvent) => {
    setFrameIdx(0);
    drawBars();
    handleStartAnimation(event);
  };

  const handleAnimationFinished = () => {
    setIsDone(true);
    setIsPaused(false);
    setIsAnimating(false);
  };

  const handleFrameChange = (frame: number) => {
    setFrameIdx(frame);
  };

  const handleSliderClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (!sliderRef) return;

    service.pauseAnimation();
    const pageX = event.pageX;
    const sliderLength = sliderRef.clientWidth;
    const sliderToFrameLenght = sliderLength / (data().length - 1);
    const leftPosition = sliderRef.getBoundingClientRect().left;
    let positionClicked = pageX - leftPosition;

    if (positionClicked > sliderLength) positionClicked = sliderLength;

    if (positionClicked < 0) positionClicked = 0;

    const positionClickIdx = Math.ceil(positionClicked / sliderToFrameLenght);
    if (positionClickIdx >= data().length - 1) {
      handleAnimationFinished();
      setFrameIdx(positionClickIdx);
      drawBars();
      return;
    }

    if (positionClickIdx < data().length - 1 && isDone()) {
      handlePauseAnimation();
      setFrameIdx(positionClickIdx);
      setIsDone(false);
      drawBars();
      return;
    }

    setFrameIdx(positionClickIdx);
    drawBars();
    isAnimating() && !isPaused() && handleStartAnimation(event);
  };

  const handleClickNext = (event: MouseEvent) => {
    event.stopPropagation();

    if (frameIdx() + 1 >= data().length - 1) {
      handleAnimationFinished();
      setFrameIdx(data().length - 1);
      drawBars();
      return;
    }

    setFrameIdx((prev) => prev + 1);
    if (!isPaused() && isAnimating()) {
      handlePauseAnimation();
      drawBars();
      handleStartAnimation(event);
    } else {
      drawBars();
    }
  };

  const handleClickPrevious = (event: MouseEvent) => {
    event.stopPropagation();

    if (frameIdx() - 1 <= 0) {
      setFrameIdx(0);
      drawBars();
      return;
    }

    setFrameIdx((prev) => prev - 1);
    if (!isPaused() && isAnimating()) {
      handlePauseAnimation();
      drawBars();
      handleStartAnimation(event);
    } else {
      drawBars();
    }
  };

  const handleMouseOver = () => {
    if (timer !== null && timer !== undefined) clearTimeout(timer);
    setShowTimeLine(true);
  };
  const handleMouseOut = () => {
    timer = setTimeout(() => {
      setShowTimeLine(false);
    }, 500);
  };

  return (
    <div
      class="w-[100%] p-4  min-h-[400px] min-w-[450px]"
      onmouseover={handleMouseOver}
      onmouseleave={handleMouseOut}
    >
      <div class="p-5 relative h-[100%] max-h-[100%] ">
        <svg ref={(ele) => (svg = ele)} class="w-[100%]  min-h-[400px]">
          <g ref={(ele) => (g = ele)}></g>
        </svg>
        <div class="w-[100%] absolute bottom-4 left-[50%] translate-x-[-50%] px-5">
          <div class="w-[100%]">
            <Show when={showTimeLine()}>
              <TimeLine
                ref={sliderRef}
                data={data}
                isPaused={isPaused}
                isAnimating={isAnimating}
                play={handleStartAnimation}
                replay={handleReplayAnimation}
                pause={handlePauseAnimation}
                onSliderClick={handleSliderClick}
                isDone={isDone}
                derivative={derivative}
                onpreviousclick={handleClickPrevious}
                onnextclick={handleClickNext}
              />
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
