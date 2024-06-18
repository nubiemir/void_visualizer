import * as d3 from "d3";
import { TResult, TUniqueArr } from "../../types";
import BarsService from "./bars.service";

type TPrev = {
  rank: number;
  value: number;
  compare: boolean;
  sorted: boolean;
  id: number;
};

class BubbleService extends BarsService {
  private data: TResult[];
  private timer: any;
  constructor() {
    super();
    this.data = [];
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
    if (this.getData.length === 0) return;

    const svg = d3.select(container);
    const bar = svg.select("g").attr("fill", "#4682B4").selectAll("rect");
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
              d.compare ? "#b44660" : d.sorted ? "#46b48a" : "#4682B4"
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(200)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) =>
                d.compare ? "#b44660" : d.sorted ? "#46b48a" : "#4682B4"
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
    frameIdx: number
  ) {
    let i = frameIdx;
    this.timer = setInterval(() => {
      if (i >= this.getData.length - 1) {
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

  public createAnimationFrames(arr: TUniqueArr[]) {
    const arrCopy = arr.slice();
    this.data = [];
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

    this.data.push(init);
    for (let i = 0; i < arrCopy.length; i++) {
      const prevData = this.data[this.data.length - 1].data;
      for (let j = 0; j < arrCopy.length - i - 1; j++) {
        const before = this.populate(arrCopy, prevData, j, i);
        this.data.push(before);
        if (arrCopy[j].value > arrCopy[j + 1].value) {
          this.swap(arrCopy, j, j + 1);
          const after = this.populate(arrCopy, prevData, j, i);
          this.data.push(after);
        }
      }
      this.data[this.data.length - 1].data[arrCopy.length - i - 1].sorted =
        true;
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

    this.data.push(final);
  }

  private swap(arr: TUniqueArr[], lft: number, rht: number) {
    const tmp = arr[lft];
    arr[lft] = arr[rht];
    arr[rht] = tmp;
  }

  private populate(
    arrCopy: TUniqueArr[],
    prevData: TPrev[],
    j: number,
    i: number
  ) {
    const tempResult = {
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

    return tempResult;
  }
}

export default BubbleService;
