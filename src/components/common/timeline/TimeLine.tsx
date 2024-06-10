import { Accessor, Ref } from "solid-js";
import BackwardIcon from "../../../assets/backward-step-solid.svg";
import ForwardIcon from "../../../assets/forward-step-solid.svg";
import PauseIcon from "../../../assets/pause-solid.svg";
import PlayIcon from "../../../assets/play-solid.svg";
import ReplyIcon from "../../../assets/reply-solid.svg";
import { TResult } from "../../../types";
import Media from "./Media";
import "./timeline.css";

interface ITimeLineProps {
  ref: Ref<HTMLDivElement>;
  data: Accessor<TResult[]>;
  isPaused: Accessor<boolean>;
  isDone: Accessor<boolean>;
  play: (event: MouseEvent) => Promise<void>;
  replay: (event: MouseEvent) => void;
  pause: (event: MouseEvent) => void;
  derivative: () => number;
  onSliderClick: (event: MouseEvent) => void;
  onnextclick: (event: MouseEvent) => void;
  onpreviousclick: (event: MouseEvent) => void;
}

const TimeLine = ({
  isPaused,
  isDone,
  play,
  replay,
  pause,
  derivative,
  onSliderClick,
  onnextclick,
  onpreviousclick,
  ref,
}: ITimeLineProps) => {
  const nextDisabled = () => derivative() >= 100;
  const previousDiabled = () => derivative() <= 0;

  const handleMouseMove = (event: MouseEvent) => {
    event.stopPropagation();
    onSliderClick(event);
  };
  const handleMouseSlide = (event: MouseEvent) => {
    event.stopPropagation();
    const slider = event.target;
    if (!slider) return;
    document.addEventListener("mousemove", handleMouseMove);
  };

  document.addEventListener("mouseup", (event: MouseEvent) => {
    event.stopPropagation();
    // sliderRef.removeEventListener("mousedown", handleMouseSlide);
    document.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div class="flex flex-col gap-4 items-center">
      <div
        ref={ref}
        onclick={onSliderClick}
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

      <div class="w-[100%] flex gap-1 items-center">
        <Media
          image={BackwardIcon}
          handleClick={onpreviousclick}
          classList={{
            "opacity-15": previousDiabled(),
            "pointer-event-none": previousDiabled(),
            "cursor-pointer": !previousDiabled(),
            "cursor-not-allowed": previousDiabled(),
          }}
        />

        {!isPaused() && !isDone() && (
          <Media
            image={PauseIcon}
            handleClick={pause}
            classList={{
              "cursor-pointer": !isPaused() && !isDone(),
            }}
          />
        )}
        {isPaused() && !isDone() && (
          <Media
            image={PlayIcon}
            handleClick={play}
            classList={{
              "cursor-pointer": isPaused() && !isDone(),
            }}
          />
        )}
        {isDone() && (
          <Media
            image={ReplyIcon}
            height={26}
            width={26}
            handleClick={replay}
            classList={{
              "cursor-pointer": isDone(),
            }}
          />
        )}
        <Media
          image={ForwardIcon}
          handleClick={onnextclick}
          classList={{
            "opacity-15": nextDisabled(),
            "pointer-event-none": nextDisabled(),
            "cursor-pointer": !nextDisabled(),
            "cursor-not-allowed": nextDisabled(),
          }}
        />
      </div>
    </div>
  );
};

export default TimeLine;
