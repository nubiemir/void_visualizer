import {
  Accessor,
  createEffect,
  createMemo,
  createSignal,
  onMount,
} from "solid-js";
import BubbleService from "../../../services/sorting/bubble.service";
import TimeLine from "../../common/timeline/TimeLine";
import { TUniqueArr } from "../../../types";

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
  const [isAnimating, setIsAnimating] = createSignal(false);

  let svg: SVGElement;
  const data: number[][] = [];
  const uniqueArr: Accessor<TUniqueArr[]> = createMemo(() =>
    arr.map((itm, idx) => {
      return { value: itm, id: idx };
    })
  );

  const service = new BubbleService(uniqueArr());

  createEffect(() => {
    svg.replaceChildren();
    if (!isAnimating()) {
      service.draw(containerWidth(), containerHeight(), svg);
    }
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

  const handleAnimate = async () => {
    setIsAnimating(true);
    await service.animate(containerWidth(), containerHeight(), svg);
  };

  return (
    <div class="w-[100%] p-4 border border-solid min-h-[400px] min-w-[450px] border-red-500 best">
      <div class="p-2 border relative h-[100%] max-h-[100%] border-red-500">
        <svg
          ref={(ele) => (svg = ele)}
          class="w-[100%]  min-h-[400px]"
          onclick={handleAnimate}
        ></svg>
        <div class="w-[85%] absolute bottom-4 left-[50%] translate-x-[-50%]">
          <TimeLine data={data} />
        </div>
      </div>
    </div>
  );
};

export default Container;
