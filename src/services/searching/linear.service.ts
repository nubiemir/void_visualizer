import * as d3 from "d3";
import { IVisualizer, TResult, TUniqueArr } from "../../types";
import BarsService from "../bars.service";

class LinearService extends BarsService implements IVisualizer {
  private data: TResult[];
  private timer: any;
  constructor() {
    super();
    this.data = [];
  }

  get getData() {
    return this.data;
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
            .attr("fill", (d) =>
              d.compare ? "#b44660" : d.sorted ? "#46b48a" : "#4682B4",
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(200 / speed)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) =>
                d.compare ? "#b44660" : d.sorted ? "#46b48a" : "#4682B4",
              )
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
          compare: false,
          sorted: false,
          id: itm.id,
        };
      }),
    };

    this.data.push(init);
    return this.data;
  }
}

export default LinearService;
