import * as d3 from "d3";
import { IVisualizer, TSelectionResult, TUniqueArr } from "../../types";
import BarsService from "../bars.service";

class SelectionService extends BarsService implements IVisualizer {
  private data: TSelectionResult[];
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
      { value: 10, id: 0 },
      { value: 40, id: 1 },
      { value: 23, id: 2 },
      { value: 15, id: 3 },
      { value: 55, id: 4 },
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
            .attr("fill", (d) =>
              d.sorted
                ? "b4a746"
                : d.selected
                  ? "#b44660"
                  : d.active
                    ? "#46b48a"
                    : "#4682B4",
            ),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(200 / speed)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) =>
                d.sorted
                  ? "#46b48a"
                  : d.selected
                    ? "#b44660"
                    : d.active
                      ? "#b49346"
                      : "#4682B4",
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
    }, 800 / speed);
  }

  pauseAnimation() {
    clearInterval(this.timer);
  }

  public createAnimationFrames(arr: TUniqueArr[]) {
    const arrCopy = arr.slice();
    this.data = [];
    let selected = 0;

    this.data.push(this.populate(arrCopy));
    for (let i = 0; i < arrCopy.length - 1; i++) {
      selected = i;
      this.data.push(this.populate(arrCopy, selected));
      for (let j = i + 1; j < arr.length; j++) {
        this.data.push(this.populate(arrCopy, selected, j));
        if (arrCopy[j].value < arrCopy[selected].value) {
          selected = j;
          this.data.push(this.populate(arrCopy, selected, null));
        }
      }
      this.data.push({
        data: this.data[this.data.length - 1].data.map((item, idx) => {
          return {
            ...item,
            selected: idx === selected || idx === i,
            active: false,
          };
        }),
      });
      this.swap(arrCopy, i, selected);
      this.data.push({
        data: arrCopy.map((item, idx) => {
          return {
            ...item,
            rank: idx,
            selected:
              i === arrCopy.length - 2 ? false : idx === selected || idx === i,
            active: false,
            sorted: i === arrCopy.length - 2 ? true : idx <= i,
          };
        }),
      });
    }
    return this.data;
  }

  private swap(arr: TUniqueArr[], lft: number, rht: number) {
    const tmp = arr[lft];
    arr[lft] = arr[rht];
    arr[rht] = tmp;
  }

  private populate(
    arr: TUniqueArr[],
    selectedIdx: number | null = null,
    activIdx: number | null = null,
  ) {
    const prevData =
      this.data.length > 0 ? this.data[this.data.length - 1].data : null;

    return {
      data: arr.map((item, idx) => {
        return {
          ...item,
          rank: idx,
          selected: selectedIdx !== null ? selectedIdx === idx : false,
          active: activIdx !== null ? idx === activIdx : false,
          sorted: prevData !== null ? prevData[idx].sorted : false,
        };
      }),
    };
  }
}

export default SelectionService;
