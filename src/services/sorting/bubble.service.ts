import * as d3 from "d3";
import BarsService from "./bars.service";

type TResult = {
  data: {
    rank: number;
    value: number;
  }[];
  lft: number;
  rgt: number;
};

class BubbleService extends BarsService {
  constructor(private arr: number[]) {
    super();
  }

  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement
  ): void {
    const svg = d3.select(container);
    const bar = svg.append("g").attr("fill", "steelblue").selectAll("rect");
    const data = this.sort();
    const x = this.scaleX(containerWidth, data[0].data);
    const y = this.scaleY(containerHeight, data[0].data);

    bar
      .data(data[0].data, (d: any) => d.value)
      .join(
        (enter) =>
          enter
            .append("rect")
            .attr("x", (d) => x(d.rank) as number)
            .attr("y", (d) => y(d.value) as number)
            .attr("height", (d) => y(0) - y(d.value))
            .attr("width", (_) => x.bandwidth()),
        (update) => update,
        (exit) => exit
      );
  }

  animate(): void {}

  sort(): TResult[] {
    const arrCopy = this.arr.slice();
    const result: TResult[] = [];

    const init = {
      data: arrCopy.map((itm, idx) => {
        return {
          rank: idx,
          value: itm,
        };
      }),
      lft: -1,
      rgt: -1,
    };

    result.push(init);
    for (let i = 0; i < arrCopy.length; i++) {
      for (let j = i; j < arrCopy.length - i; j++) {
        const before = {
          data: arrCopy.map((itm, idx) => {
            return {
              rank: idx,
              value: itm,
            };
          }),
          lft: j,
          rgt: j + 1,
        };

        result.push(before);

        if (arrCopy[j] > arrCopy[j + 1]) {
          this.swap(arrCopy, j, j + 1);
        }

        const after = {
          data: arrCopy.map((itm, idx) => {
            return {
              rank: idx,
              value: itm,
            };
          }),
          lft: j,
          rgt: j + 1,
        };

        result.push(after);
      }
    }
    return result;
  }

  private swap(arr: number[], lft: number, rht: number) {
    const tmp = arr[lft];
    arr[lft] = arr[rht];
    arr[rht] = tmp;
  }
}

export default BubbleService;
