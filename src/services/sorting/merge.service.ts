import * as d3 from "d3";
import { ISorting, TSelectionResult, TUniqueArr } from "../../types";
import BarsService from "./bars.service";

class MergeService extends BarsService implements ISorting {
  private data: TSelectionResult[];
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
    frameIdx: number = 0,
    speed: number = 1
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
              d.active
                ? "#b49346"
                : d.selected
                ? "#b44660"
                : d.sorted
                ? "#46b48a"
                : "#4682B4"
            )
            .attr("y", (d) => (d.selected ? y(0) : y(d.value))),
        (update) =>
          update.call((update) =>
            update
              .transition()
              .duration(200 / speed)
              .ease(d3.easePolyInOut)
              .attr("fill", (d) =>
                d.active
                  ? "#b49346"
                  : d.selected
                  ? "#b44660"
                  : d.sorted
                  ? "#46b48a"
                  : "#4682B4"
              )
              .attr("x", (d) => x(d.rank) as number)
              .attr("y", (d) => (d.selected ? y(0) : y(d.value)))
          ),
        (exit) => exit.remove()
      );
  }

  //notes:
  /**
   * normal
   * duration 200
   * waiting time 800
   */
  async animate(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    handleFrameChange: (frame: number) => void,
    handleAnimationFinished: () => void,
    frameIdx: number,
    speed: number
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

    const init = {
      data: arrCopy.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          selected: false,
          sorted: false,
          active: false,
        };
      }),
    };

    this.data.push(init);

    const setInit = {
      data: arrCopy.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          selected: false,
          sorted: idx === 0,
          active: false,
        };
      }),
    };

    this.data.push(setInit);

    for (let i = 0; i < arrCopy.length - 1; i++) {
      let j = i + 1;
      const before = {
        data: arrCopy.map((item, idx) => {
          return {
            value: item.value,
            id: item.id,
            rank: idx,
            selected: idx === j,
            sorted: this.data[this.data.length - 1].data[idx].sorted,
            active: false,
          };
        }),
      };

      this.data.push(before);
      while (j > 0) {
        const compare = {
          data: arrCopy.map((item, idx) => {
            return {
              value: item.value,
              id: item.id,
              rank: idx,
              selected: this.data[this.data.length - 1].data[idx].selected,
              sorted: this.data[this.data.length - 1].data[idx].sorted,
              active: idx === j - 1,
            };
          }),
        };
        this.data.push(compare);
        if (arrCopy[j].value < arrCopy[j - 1].value) {
          this.swap(arrCopy, j, j - 1);
          const swapped = {
            data: arrCopy.map((item, idx) => {
              return {
                value: item.value,
                id: item.id,
                rank: idx,
                selected: idx === j - 1,
                sorted: idx <= j,
                active: idx === j,
              };
            }),
          };
          this.data.push(swapped);
        } else {
          break;
        }
        j--;
      }
      const sorted = {
        data: arrCopy.map((item, idx) => {
          return {
            value: item.value,
            id: item.id,
            rank: idx,
            selected: false,
            sorted: idx <= i + 1,
            active: false,
          };
        }),
      };
      this.data.push(sorted);
    }

    return this.data;
  }

  private swap(arr: TUniqueArr[], lft: number, rht: number) {
    const tmp = arr[lft];
    arr[lft] = arr[rht];
    arr[rht] = tmp;
  }
}

export default MergeService;
