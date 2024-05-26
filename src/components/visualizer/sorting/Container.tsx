import { createEffect, createSignal, onMount } from "solid-js";
import BubbleService from "../../../services/sorting/bubble.service";
import TimeLine from "../../common/timeline/TimeLine";

const Container = () => {
  const [containerWidth, setContainerWidth] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);
  let svg: SVGElement;
  const data: number[][] = [];

  const arr = [
    52, 39, 3, 15, 58, 29, 56, 14, 49, 31, 16, 45, 28, 13, 44, 51, 24, 55, 20,
    // 60, 37, 30, 34, 57, 48, 43, 6, 54, 12, 38, 1, 7, 19, 26, 50, 22, 21, 17, 41,
    // 10, 32, 40, 35, 23, 42, 59, 25, 9, 2, 18,
  ];
  const service = new BubbleService(arr);

  createEffect(() => {
    svg.replaceChildren();
    service.draw(containerWidth(), containerHeight(), svg);
  });

  onMount(() => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);

    service.draw(containerWidth(), containerHeight(), svg);
  });

  window.addEventListener("resize", () => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);
  });

  return (
    <div class="w-[100%] p-4 border border-solid min-h-[400px] min-w-[450px] border-red-500 best">
      <div class="p-2 border relative h-[100%] max-h-[100%] border-red-500">
        <svg ref={(ele) => (svg = ele)} class="w-[100%]  min-h-[400px]"></svg>
        <div class="w-[85%] absolute bottom-4 left-[50%] translate-x-[-50%]">
          <TimeLine data={data} />
        </div>
      </div>
    </div>
  );
};

export default Container;
