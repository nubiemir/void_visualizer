import * as d3 from "d3";
import { IVisualizer, TSearchResult, TUniqueArr } from "../../types";
import BarsService from "../bars.service";

class LinearService extends BarsService implements IVisualizer {
  private data: TSearchResult[];
  private timer: any;
  constructor() {
    super(false);
    this.data = [];
  }

  get getData() {
    return this.data;
  }

  initData(): TUniqueArr[] {
    return [
      { value: 15, id: 0 },
      { value: 10, id: 1 },
      { value: 40, id: 2 },
      { value: 23, id: 3 },
      { value: 15, id: 4 },
      { value: 55, id: 5 },
    ];
  }

  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    frameIdx: number = 0,
    speed: number = 1,
  ): void {
    if (this.getData.length === 0) return;

    const svg = d3.select(container);
    const bar = svg.select("g").attr("fill", "#4682B4").selectAll("rect");
    const x = this.scaleX(containerWidth, this.getData[0].data);
    const y = this.scaleY(containerHeight, this.getData[0].data);

    const width = Math.min(60, x.bandwidth());

    bar
      .data(this.getData[frameIdx].data, (d: any) => d.id)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => x(d.rank) as number)
            .attr("y", (d) => y(d.value) as number)
            .attr("height", (d) => y(0) - y(d.value))
            .attr("width", (_) => width)
            .attr("fill", (d) => (d.id === 0 ? "none" : "#4682B4"))
            .attr("stroke", (d) =>
              d.found ? "#46b48a" : d.id === 0 ? "#b44660" : "none",
            )
            .attr("opacity", (d) => (d.notElement && d.id !== 0 ? 0.2 : 1))
            .attr("stroke-width", (d) => (d.id === 0 ? 5 : 0)),

        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(200 / speed)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) => (d.id === 0 ? "none" : "#4682B4"))
              .attr("stroke", (d) =>
                d.found ? "#46b48a" : d.id === 0 ? "#b44660" : "none",
              )
              .attr("opacity", (d) => (d.notElement && d.id !== 0 ? 0.3 : 1))
              .attr("x", (d) => x(d.rank) as number),
          ),
        (exit) => exit.remove(),
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
    frameIdx: number,
    speed: number,
  ) {
    let i = frameIdx;
    this.timer = setInterval(() => {
      if (i >= this.getData.length - 1) {
        handleAnimationFinished();
        clearInterval(this.timer);
        return;
      }

      this.draw(containerWidth, containerHeight, container, i, speed);
      i++;
      handleFrameChange(i);
    }, 500 / speed);
  }

  pauseAnimation() {
    clearInterval(this.timer);
  }

  public createAnimationFrames(arr: TUniqueArr[]) {
    const arrCopy = arr.slice();
    let found = false;
    this.data = [];
    const init = {
      data: arrCopy.map((itm, idx) => {
        return {
          rank: idx,
          value: itm.value,
          notElement: false,
          found: false,
          id: itm.id,
        };
      }),
    };
    this.data.push(init);

    for (let i = 0; i < arr.length; i++) {
      const iteration = {
        data: arrCopy.map((itm, idx) => {
          return {
            rank: itm.id === 0 ? i : idx,
            value: itm.value,
            notElement: idx < i,
            found: arr[0].value === arr[i].value && i !== 0 ? true : false,
            id: itm.id,
          };
        }),
      };

      this.data.push(iteration);
      if (arr[0].value === arr[i].value && i !== 0) {
        found = true;
        const iteration = {
          data: arrCopy.map((itm, idx) => {
            return {
              rank: itm.id === 0 ? i : idx,
              value: itm.value,
              notElement:
                idx < i ||
                (arr[0].value === arr[i].value && i !== 0 && idx > i),
              found: arr[0].value === arr[i].value && i !== 0 ? true : false,
              id: itm.id,
            };
          }),
        };

        this.data.push(iteration);
        break;
      }
    }
    if (!found) {
      const iteration = {
        data: arrCopy.map((itm, idx) => {
          return {
            rank: itm.id === 0 ? arr.length - 1 : idx,
            value: itm.value,
            notElement: true,
            found: false,
            id: itm.id,
          };
        }),
      };
      this.data.push(iteration);
    }
    return this.data;
  }
}

export default LinearService;
