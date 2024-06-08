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
  constructor(private arr: TUniqueArr[]) {
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
    const data = this.data.slice();
    const x = this.scaleX(containerWidth, data[0].data);
    const y = this.scaleY(containerHeight, data[0].data);
    const bar = svg.append("g").attr("fill", "steelblue").selectAll("rect");
    bar
      .data(data[frameIdx].data, (d: any) => d.value)
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
        (update) => update,
        (exit) => exit
      );
  }

  //notes:
  /**
   * normal
   * duration 100
   * delay between animations 500
   * waiting time 1000
   */
  async *animate(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement,
    isPaused: Accessor<boolean>,
    frameIdx: Accessor<number>
  ) {
    const svg = d3.select(container);
    const data = this.data.slice();
    const x = this.scaleX(containerWidth, data[0].data);
    const y = this.scaleY(containerHeight, data[0].data);
    svg.selectChildren().remove();
    let bar: TBar = svg.append("g").attr("fill", "steelblue").selectAll("rect");

    let timer;

    for (let i = frameIdx() || 0; i < data.length; i++) {
      if (isPaused()) {
        timer && clearTimeout(timer);
        bar.interrupt();
        svg.selectChildren().remove();
        this.draw(containerWidth, containerHeight, container, i - 1);
        return i - 1;
      }
      bar = bar
        .data(data[i].data, (d: any) => d.id)
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("x", (d) => x(d.rank) as number)
              .attr("y", (d) => y(d.value) as number)
              .attr("height", (d) => y(0) - y(d.value))
              .attr("fill", (d) =>
                d.compare ? "red" : d.sorted ? "green" : "steelblue"
              )
              .attr("width", (_) => x.bandwidth()),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(10)
                .ease(d3.easePolyInOut)
                .attr("fill", (d) =>
                  d.compare ? "red" : d.sorted ? "green" : "steelblue"
                )
                .attr("x", (d) => x(d.rank) as number)
            ),
          (exit) => exit
        );
      timer = await this.timer(100);
      yield i;
    }
    return data.length - 1;
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

  private timer(ms: number): Promise<number> {
    return new Promise((res) => {
      const timer = setTimeout(() => {
        res(timer);
      }, ms);
    });
  }
}

export default BubbleService;
