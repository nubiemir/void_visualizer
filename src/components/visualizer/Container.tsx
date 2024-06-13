import { onMount, Show } from "solid-js";
import { usePreviewStore } from "../../context";
import TimeLine from "./timeline/TimeLine";

const Container = () => {
  let svg!: SVGElement;
  let g!: SVGGElement;
  let slider!: HTMLDivElement;

  let { setRefs, handleMouseOut, handleMouseOver, previewStore } =
    usePreviewStore();

  onMount(() => {
    setRefs(svg, g, slider);
  });

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
            <Show when={previewStore.showTimeLine}>
              <TimeLine ref={slider} />
            </Show>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Container;
