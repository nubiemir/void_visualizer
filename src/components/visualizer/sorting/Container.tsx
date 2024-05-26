import { createEffect, createSignal, onMount } from "solid-js";
import TimeLine from "../../common/timeline/TimeLine";
import BubbleService from "../../../services/sorting/bubble.service";

const Container = () => {
  const [containerWidth, setContainerWidth] = createSignal(0);
  const [containerHeight, setContainerHeight] = createSignal(0);
  let svg: SVGElement;
  const data: number[][] = [];

  const arr = [43, 1, 17, 8];
  const service = new BubbleService(arr);

  createEffect(() => {});

  onMount(() => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);
  });

  window.addEventListener("resize", () => {
    setContainerWidth(svg.clientWidth);
    setContainerHeight(svg.clientHeight);
  });

  console.log(service.sort());

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
