import { createSignal } from "solid-js";
import BackwardIcon from "../../../assets/backward-step-solid.svg";
import ForwardIcon from "../../../assets/forward-step-solid.svg";
import "./timeline.css";

interface ITimeLineProps {
  data: number[][];
}

const TimeLine = ({ data }: ITimeLineProps) => {
  const [timestamp, setTimestamp] = createSignal(0);

  const nextDisabled = () => timestamp() >= 100;
  const previousDiabled = () => timestamp() <= 0;

  let sliderRef: HTMLDivElement;

  const handleSliderClick = (event: MouseEvent) => {
    if (!sliderRef) return;

    const pageX = event.pageX;
    const sliderLength = sliderRef.clientWidth;
    const sliderToFrameLenght = sliderLength / data.length;
    const leftPosition = sliderRef.getBoundingClientRect().left;
    let positionClicked = pageX - leftPosition;

    if (positionClicked > sliderLength) {
      positionClicked = sliderLength;
    }

    if (positionClicked < 0) {
      positionClicked = 0;
    }

    const positionClickIdx = Math.round(positionClicked / sliderToFrameLenght);
    const positionClickedPercentage =
      ((positionClickIdx * sliderToFrameLenght) / sliderLength) * 100;

    setTimestamp(positionClickedPercentage);
  };

  const handleMouseMove = (event: MouseEvent) => {
    handleSliderClick(event);
  };
  const handleMouseSlide = (event: MouseEvent) => {
    const slider = event.target;
    if (!slider) return;
    document.addEventListener("mousemove", handleMouseMove);
  };

  const handleClickNext = () => {
    const sliderLength = sliderRef.clientWidth;
    const sliderToFrameLenght = sliderLength / data.length;
    const frameToSliderPercentage = (sliderToFrameLenght / sliderLength) * 100;
    let nextPosition;

    if (timestamp() + frameToSliderPercentage >= 100) {
      nextPosition = 100;
    } else {
      nextPosition = timestamp() + frameToSliderPercentage;
    }

    setTimestamp(nextPosition);
  };

  const handleClickPrevious = () => {
    const sliderLength = sliderRef.clientWidth;
    const sliderToFrameLenght = sliderLength / data.length;
    const frameToSliderPercentage = (sliderToFrameLenght / sliderLength) * 100;
    let previousPosition;

    if (timestamp() - frameToSliderPercentage <= 0) {
      previousPosition = 0;
    } else {
      previousPosition = timestamp() - frameToSliderPercentage;
    }

    setTimestamp(previousPosition);
  };

  document.addEventListener("mouseup", () => {
    sliderRef.removeEventListener("mousedown", handleMouseSlide);
    document.removeEventListener("mousemove", handleMouseMove);
  });

  return (
    <div class="flex gap-4 items-center">
      <img
        src={BackwardIcon}
        width={10}
        height={10}
        onclick={handleClickPrevious}
        class="cursor-pointer"
        classList={{
          "opacity-15": previousDiabled(),
          "pointer-event-none": previousDiabled(),
          "cursor-not-allowed": previousDiabled(),
        }}
      />
      <div
        ref={(ele) => (sliderRef = ele)}
        onclick={handleSliderClick}
        onmousedown={handleMouseSlide}
        class="w-[100%] py-[2px] bg-slider-container rounded-md relative cursor-pointer"
      >
        <div
          style={{ "--custom-width": `${timestamp()}%` }}
          class={
            "w-[var(--custom-width)] bg-bold  py-[2px] rounded-md absolute top-0 left-0 slider pointer-events-none"
          }
        ></div>
      </div>
      <img
        src={ForwardIcon}
        width={10}
        height={10}
        onclick={handleClickNext}
        class="cursor-pointer"
        classList={{
          "opacity-15": nextDisabled(),
          "pointer-event-none": nextDisabled(),
          "cursor-not-allowed": nextDisabled(),
        }}
      />
    </div>
  );
};

export default TimeLine;
