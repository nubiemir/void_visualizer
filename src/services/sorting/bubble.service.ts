import * as d3 from "d3";
import BarsService from "./bars.service";
import { TUniqueArr, TResult } from "../../types";
import { Accessor } from "solid-js";

type TBar = d3.Selection<
  d3.BaseType | SVGRectElement,
  {
    rank: number;
    value: number;
    compare: boolean;
    sorted: boolean;
    id: number;
  },
  SVGGElement,
  unknown
>;

class BubbleService extends BarsService {
  private data: TResult[];
  private timer: any;
  constructor(private arr: TUniqueArr[], svg: SVGElement) {
    super();
    this.data = this.sort();
  }

  get getData() {
    return this.data;
  }

  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    frameIdx: number = 0
  ): void {
    const svg = d3.select(container);
    const bar = svg.selectAll("rect");
    const x = this.scaleX(containerWidth, this.getData[0].data);
    const y = this.scaleY(containerHeight, this.getData[0].data);
    bar
      .data(this.getData[frameIdx].data, (d: any) => d.id)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => x(d.rank) as number)
            .attr("y", (d) => y(d.value) as number)
            .attr("height", (d) => y(0) - y(d.value))
            .attr("width", (_) => x.bandwidth())
            .attr("fill", (d) =>
              d.compare ? "red" : d.sorted ? "green" : "steelblue"
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(100)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) =>
                d.compare ? "red" : d.sorted ? "green" : "steelblue"
              )
              .attr("x", (d) => x(d.rank) as number)
          ),
        (exit) => exit.remove()
      );
  }

  //notes:
  /**
   * normal
   * duration 100
   * delay between animations 500
   * waiting time 1000
   */
  async animate(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    handleFrameChange: (frame: number) => void,
    handleAnimationFinished: () => void,
    frameIdx: Accessor<number>
  ) {
    let i = frameIdx();

    this.timer = setInterval(() => {
      if (i >= this.getData.length) {
        handleAnimationFinished();
        clearInterval(this.timer);
        return;
      }

      this.draw(containerWidth, containerHeight, container, i);
      i++;
      handleFrameChange(i);
    }, 500);
  }

  pauseAnimation() {
    clearInterval(this.timer);
  }

  private sort(): TResult[] {
    const arrCopy = this.arr.slice();
    const result: TResult[] = [];

    const init = {
      data: arrCopy.map((itm, idx) => {
        return {
          rank: idx,
          value: itm.value,
          compare: false,
          sorted: false,
          id: itm.id,
        };
      }),
    };

    result.push(init);
    for (let i = 0; i < arrCopy.length; i++) {
      const prevData = result[result.length - 1].data;
      for (let j = 0; j < arrCopy.length - i - 1; j++) {
        const before = {
          data: arrCopy.map((itm, idx) => {
            return {
              rank: idx,
              value: itm.value,
              id: itm.id,
              sorted: prevData[idx].sorted,
              compare:
                ((idx === j || idx === j + 1) && j < arrCopy.length - 1 - i) ||
                false,
            };
          }),
        };
        result.push(before);
        if (arrCopy[j].value > arrCopy[j + 1].value) {
          this.swap(arrCopy, j, j + 1);
        }
        const after = {
          data: arrCopy.map((itm, idx) => {
            return {
              rank: idx,
              value: itm.value,
              id: itm.id,
              sorted: prevData[idx].sorted,
              compare:
                ((idx === j || idx === j + 1) && j < arrCopy.length - 1 - i) ||
                false,
            };
          }),
        };
        result.push(after);
      }
      result[result.length - 1].data[arrCopy.length - i - 1].sorted = true;
    }

    const final = {
      data: arrCopy.map((itm, idx) => {
        return {
          rank: idx,
          value: itm.value,
          id: itm.id,
          sorted: true,
          compare: false,
        };
      }),
    };

    result.push(final);
    return result;
  }

  private swap(arr: TUniqueArr[], lft: number, rht: number) {
    const tmp = arr[lft];
    arr[lft] = arr[rht];
    arr[rht] = tmp;
  }
}

export default BubbleService;
