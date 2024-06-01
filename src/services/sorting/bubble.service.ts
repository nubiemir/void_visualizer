import * as d3 from "d3";
import BarsService from "./bars.service";
import { TUniqueArr } from "../../types";

type TResult = {
  data: {
    rank: number;
    value: number;
    compare: boolean;
    sorted: boolean;
    id: number;
  }[];
};

class BubbleService extends BarsService {
  private data: TResult[];
  constructor(private arr: TUniqueArr[]) {
    super();
    this.data = this.sort();
    console.log(this.data);
  }

  draw(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement
  ): void {
    const svg = d3.select(container);
    const bar = svg.append("g").attr("fill", "steelblue").selectAll("rect");
    const data = this.data.slice();
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

  async animate(
    containerWidth: number,
    containerHeight: number,
    container: SVGElement
  ) {
    const svg = d3.select(container);
    const data = this.data.slice();
    const x = this.scaleX(containerWidth, data[0].data);
    const y = this.scaleY(containerHeight, data[0].data);
    svg.selectChildren().remove();
    let bar = svg.append("g").attr("fill", "steelblue").selectAll("rect");
    //notes:
    /**
     * normal
     * duration 100
     * delay between animations 500
     * waiting time 1000
     */
    for (let i = 0; i < data.length; i++) {
      bar = bar
        .data(data[i].data, (d: any) => d.id)
        .join(
          (enter) =>
            enter
              .append("rect")
              .attr("x", (d) => x(d.rank) as number)
              .attr("y", (d) => y(d.value) as number)
              .attr("height", (d) => y(0) - y(d.value))
              .attr("width", (_) => x.bandwidth()),
          (update) =>
            update.call((update) =>
              update
                .transition()
                .duration(100)
                .ease(d3.easePolyInOut)
                .attr("fill", (d) =>
                  d.compare ? "red" : d.sorted ? "green" : "steelblue"
                )
                .transition()
                .delay(500)
                .duration(100)
                .ease(d3.easeLinear)
                .attr("x", (d) => x(d.rank) as number)
            ),
          (exit) => exit
        );
      await this.timer(1000);
    }
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

  private timer(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
  }
}

export default BubbleService;
