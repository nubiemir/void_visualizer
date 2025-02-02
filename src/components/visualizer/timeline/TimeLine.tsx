import { children, onMount, ParentComponent, Show } from "solid-js";
import BackwardIcon from "../../../assets/backward-step-solid.svg";
import ForwardIcon from "../../../assets/forward-step-solid.svg";
import PauseIcon from "../../../assets/pause-solid.svg";
import PlayIcon from "../../../assets/play-solid.svg";
import ReplyIcon from "../../../assets/reply-solid.svg";
import SettingIcon from "../../../assets/sliders-solid.svg";
import { usePreviewStore } from "../../../context";
import Setting from "../setting";
import Media from "./Media";
import "./timeline.css";

const TimeLine: ParentComponent = (props) => {
  const {
    handleClickNext,
    handleClickPrevious,
    handleSliderClick,
    handlePauseAnimation,
    handleReplayAnimation,
    handleStartAnimation,
    handleSettingToggle,
    setSliderRef,
    previewStore,
  } = usePreviewStore();
  let slider!: HTMLDivElement;

  const resolvedChildren = children(() => props.children);

  onMount(() => {
    setSliderRef(slider);
  });

  const timeline = () =>
    (previewStore.frameIdx / (previewStore.frames.length - 1) || 0) * 100;

  const previousDiabled = () => timeline() <= 0;

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
          style={{ "--custom-width": `calc(${timeline()}%)` }}
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
          <div class="relative">
            <div class="absolute left-[100%] top-[100%] translate-y-[-115%] translate-x-[-100%]">
              <Show when={previewStore.showSetting}>
                <Setting>{resolvedChildren()}</Setting>
              </Show>
            </div>
            <Media
              image={SettingIcon}
              height={20}
              width={20}
              handleClick={handleSettingToggle}
              classList={{ "cursor-pointer": true, "setting-btn": true }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
