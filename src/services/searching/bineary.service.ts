import * as d3 from "d3";
import { IVisualizer, TSearchResult, TUniqueArr } from "../../types";
import BarsService from "../bars.service";

class BinearyService extends BarsService implements IVisualizer {
  private data: TSearchResult[];
  private timer: any;
  constructor() {
    super();
    this.data = [];
  }

  get getData() {
    return this.data;
  }

  initData(): TUniqueArr[] {
    return [
      { value: 15, id: 0 },
      { value: 10, id: 1 },
      { value: 15, id: 4 },
      { value: 23, id: 3 },
      { value: 40, id: 2 },
      { value: 55, id: 5 },
    ];
  }

  zoom(container: Element, setTransform: (data: any) => void): void {
    const svg = d3.select(container);
    const zoomBehavior = d3.zoom().on("zoom", (event) => {
      setTransform(event.transform);
    });
    svg.call(zoomBehavior);
  }

  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    frameIdx: number = 0,
    speed: number = 1,
    transform: any,
  ): void {
    if (this.getData.length === 0) return;

    const svg = d3.select(container);
    const bar = svg.select("g").attr("fill", "#4682B4").selectAll("rect");
    const x = this.scaleX(containerWidth, this.getData[0].data);
    const y = this.scaleY(containerHeight, this.getData[0].data);

    svg.select("g").attr("transform", transform);

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
    transform: any,
  ) {
    let i = frameIdx;
    this.timer = setInterval(() => {
      if (i >= this.getData.length - 1) {
        handleAnimationFinished();
        clearInterval(this.timer);
        return;
      }

      this.draw(
        containerWidth,
        containerHeight,
        container,
        i,
        speed,
        transform,
      );
      i++;
      handleFrameChange(i);
    }, 500 / speed);
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
          notElement: false,
          found: false,
          id: itm.id,
        };
      }),
    };
    this.data.push(init);

    const data = arr.slice(1);
    let low = 0;
    let high = data.length - 1;
    let mid: number;
    let x = arr[0].value;

    while (high >= low) {
      mid = low + Math.floor((high - low) / 2);
      const iteration = {
        data: arrCopy.map((itm, idx) => {
          return {
            ...itm,
            rank: itm.id === 0 ? mid + 1 : idx,
            notElement: this.data[this.data.length - 1].data[idx].notElement,
            found: false,
            id: itm.id,
          };
        }),
      };

      this.data.push(iteration);
      if (data[mid].value == x) {
        const iteration = {
          data: arrCopy.map((itm, idx) => {
            return {
              ...itm,
              rank: itm.id === 0 ? mid + 1 : idx,
              notElement: !(idx - 1 >= low && idx - 1 <= high) && idx != 0,
              found: idx === 0,
              id: itm.id,
            };
          }),
        };
        this.data.push(iteration);
        break;
      }
      if (data[mid].value > x) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
      {
        const iteration = {
          data: arrCopy.map((itm, idx) => {
            return {
              ...itm,
              rank: itm.id === 0 ? mid + 1 : idx,
              notElement: !(idx - 1 >= low && idx - 1 <= high) && idx != 0,
              found: false,
              id: itm.id,
            };
          }),
        };
        this.data.push(iteration);
      }
    }
    return this.data;
  }
}

export default BinearyService;
