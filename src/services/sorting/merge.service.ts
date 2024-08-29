import * as d3 from "d3";
import { IVisualizer, TMergeResult, TUniqueArr } from "../../types";
import BarsService from "../bars.service";

class MergeService extends BarsService implements IVisualizer {
  private data: TMergeResult[];
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
      { value: 10, id: 0 },
      { value: 40, id: 1 },
      { value: 23, id: 2 },
      { value: 15, id: 3 },
      { value: 55, id: 4 },
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
            .attr("fill", (d) =>
              d.active
                ? "#b49346"
                : d.selected
                  ? "#b44660"
                  : d.sorted
                    ? "#46b48a"
                    : "#4682B4",
            )
            .attr("x", (d) =>
              d.selected ? (x(d.location) as number) : (x(d.rank) as number),
            )
            .attr("y", (d) => (d.selected ? y(-d.value) : y(d.value + 1))),
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
                      : "#4682B4",
              )
              .attr("y", (d) => (d.selected ? y(-1) : y(d.value + 1)))
              .attr("x", (d) =>
                d.selected ? (x(d.location) as number) : (x(d.rank) as number),
              ),
          ),
        (exit) => exit.remove(),
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
    }, 800 / speed);
  }

  pauseAnimation() {
    clearInterval(this.timer);
  }

  public createAnimationFrames(arr: TUniqueArr[]) {
    const arrCopy = arr.slice();
    this.data = [];

    const compare: TMergeResult = {
      data: arrCopy.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          location: idx,
          selected: false,
          sorted: false,
          active: false,
        };
      }),
    };

    this.data.push(compare);

    const mergeSort = (left: number, right: number) => {
      if (left >= right) return;

      const middle = left + parseInt(`${(right - left) / 2}`);
      mergeSort(left, middle);
      mergeSort(middle + 1, right);
      this.merge(arrCopy, left, middle, right);
    };
    mergeSort(0, arrCopy.length - 1);
    const final: TMergeResult = {
      data: arrCopy.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          location: idx,
          selected: false,
          sorted: true,
          active: false,
        };
      }),
    };

    this.data.push(final);

    return this.data;
  }

  private merge(
    arr: TUniqueArr[],
    left: number,
    middle: number,
    right: number,
  ) {
    const lftLength = middle - left + 1;
    const rgtLength = right - middle;
    const leftArr: TUniqueArr[] = new Array(lftLength);
    const rightArr: TUniqueArr[] = new Array(rgtLength);

    for (let i = 0; i < lftLength; i++) {
      leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < rgtLength; j++) {
      rightArr[j] = arr[middle + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    const tempData = arr.slice();
    const selected = (idx: number) => this.data[this.data.length - 1].data[idx];

    const compare: TMergeResult = {
      data: tempData.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          location: idx,
          selected: false,
          sorted: false,
          active: leftArr[i] === item || rightArr[j] === item,
        };
      }),
    };

    this.data.push(compare);
    while (i < lftLength && j < rgtLength) {
      if (leftArr[i].value <= rightArr[j].value) {
        const swap: TMergeResult = {
          data: tempData.map((item, idx) => {
            return {
              value: item.value,
              id: item.id,
              rank: idx,
              location:
                leftArr[i] === item
                  ? k
                  : selected(idx).selected
                    ? selected(idx).location
                    : idx,
              selected: leftArr[i] === item || selected(idx).selected,
              sorted: false,
              active: leftArr[i] === item || rightArr[j] === item,
            };
          }),
        };

        this.data.push(swap);

        arr[k] = leftArr[i];
        i++;
      } else {
        const swap: TMergeResult = {
          data: tempData.map((item, idx) => {
            return {
              value: item.value,
              id: item.id,
              rank: idx,
              location:
                rightArr[j] === item
                  ? k
                  : selected(idx).selected
                    ? selected(idx).location
                    : idx,
              selected: rightArr[j] === item || selected(idx).selected,
              sorted: false,
              active: leftArr[i] === item || rightArr[j] === item,
            };
          }),
        };

        this.data.push(swap);
        arr[k] = rightArr[j];
        j++;
      }
      const swap: TMergeResult = {
        data: tempData.map((item, idx) => {
          return {
            value: item.value,
            id: item.id,
            rank: idx,
            location: selected(idx).location,
            selected: selected(idx).selected,
            sorted: false,
            active: leftArr[i] === item || rightArr[j] === item,
          };
        }),
      };

      this.data.push(swap);

      k++;
    }

    while (i < lftLength) {
      const swap: TMergeResult = {
        data: tempData.map((item, idx) => {
          return {
            value: item.value,
            id: item.id,
            rank: idx,
            location:
              leftArr[i] === item
                ? k
                : selected(idx).selected
                  ? selected(idx).location
                  : idx,
            selected: leftArr[i] === item || selected(idx).selected,
            sorted: false,
            active: leftArr[i] === item || rightArr[j] === item,
          };
        }),
      };

      this.data.push(swap);
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rgtLength) {
      const swap: TMergeResult = {
        data: tempData.map((item, idx) => {
          return {
            value: item.value,
            id: item.id,
            rank: idx,
            location:
              rightArr[j] === item
                ? k
                : selected(idx).selected
                  ? selected(idx).location
                  : idx,
            selected: rightArr[j] === item || selected(idx).selected,
            sorted: false,
            active: leftArr[i] === item || rightArr[j] === item,
          };
        }),
      };

      this.data.push(swap);
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    const res: TMergeResult = {
      data: arr.map((item, idx) => {
        return {
          value: item.value,
          id: item.id,
          rank: idx,
          location: idx,
          selected: false,
          sorted: false,
          active: false,
        };
      }),
    };

    this.data.push(res);
  }
}

export default MergeService;
