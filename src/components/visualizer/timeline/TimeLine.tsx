import { createEffect, onMount } from "solid-js";
import BackwardIcon from "../../../assets/backward-step-solid.svg";
import CollapseIcon from "../../../assets/compress-solid.svg";
import ExpandIcon from "../../../assets/expand-solid.svg";
import ForwardIcon from "../../../assets/forward-step-solid.svg";
import PauseIcon from "../../../assets/pause-solid.svg";
import PlayIcon from "../../../assets/play-solid.svg";
import ReplyIcon from "../../../assets/reply-solid.svg";
import SettingIcon from "../../../assets/sliders-solid.svg";
import { usePreviewStore } from "../../../context";
import Media from "./Media";
import "./timeline.css";

const TimeLine = () => {
  const {
    handleExpandToggle,
    handleClickNext,
    handleClickPrevious,
    handleSliderClick,
    handlePauseAnimation,
    handleReplayAnimation,
    handleStartAnimation,
    setSliderRef,
    previewStore,
  } = usePreviewStore();
  let slider!: HTMLDivElement;

  onMount(() => {
    setSliderRef(slider);
  });
  const derivative = () =>
    (previewStore.frameIdx / (previewStore.data.length - 1) || 0) * 100;

  const previousDiabled = () => derivative() <= 0;

  const handleMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    handleSliderClick(event);
  };
  const handleMouseSlide = (event: MouseEvent) => {
    event.stopPropagation();
    const slider = event.target;
    if (!slider) return;
    document.addEventListener("mousemove", handleMouseMove);
  };

  document.addEventListener("mouseup", (event: MouseEvent) => {
    event.stopPropagation();
    document.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div class="flex flex-col gap-4 items-center  p-5 pb-2 rounded-md ">
      <div
        ref={(ele) => {
          slider = ele;
        }}
        onclick={handleSliderClick}
        onmousedown={handleMouseSlide}
        class="w-[100%] py-[2px] bg-slider-container rounded-md relative cursor-pointer"
      >
        <div
          style={{ "--custom-width": `calc(${derivative()}%)` }}
          class={
            "w-[var(--custom-width)] bg-bold  py-[2px] rounded-l-md  absolute top-0 left-0 slider pointer-events-none"
          }
        ></div>
      </div>
      <div class="w-[100%] flex justify-between items-center">
        <div class="w-[100%] flex gap-1 items-center">
          <Media
            image={BackwardIcon}
            handleClick={handleClickPrevious}
            classList={{
              "opacity-15": previousDiabled(),
              "pointer-event-none": previousDiabled(),
              "cursor-pointer": !previousDiabled(),
              "cursor-not-allowed": previousDiabled(),
            }}
          />

          {previewStore.isAnimating && (
            <Media
              image={PauseIcon}
              handleClick={handlePauseAnimation}
              classList={{
                "cursor-pointer":
                  !previewStore.isPaused && !previewStore.isDone,
              }}
            />
          )}
          {previewStore.isPaused && (
            <Media
              image={PlayIcon}
              handleClick={handleStartAnimation}
              classList={{
                "cursor-pointer": previewStore.isPaused && !previewStore.isDone,
              }}
            />
          )}
          {previewStore.isDone && (
            <Media
              image={ReplyIcon}
              height={26}
              width={26}
              handleClick={handleReplayAnimation}
              classList={{
                "cursor-pointer": previewStore.isDone,
              }}
            />
          )}
          <Media
            image={ForwardIcon}
            handleClick={handleClickNext}
            classList={{
              "opacity-15": previewStore.isDone,
              "pointer-event-none": previewStore.isDone,
              "cursor-pointer": !previewStore.isDone,
              "cursor-not-allowed": previewStore.isDone,
            }}
          />
        </div>
        <div class="flex gap-1 items-center">
          <Media
            image={SettingIcon}
            height={20}
            width={20}
            handleClick={handleClickNext}
            classList={{ "cursor-pointer": true }}
          />
          <Media
            image={!previewStore.expand ? ExpandIcon : CollapseIcon}
            height={18}
            width={18}
            handleClick={handleExpandToggle}
            classList={{ "cursor-pointer": true }}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
