import * as d3 from "d3";

class BarsService {
  private margin = {
    bottom: 10,
    top: 10,
    left: 20,
    right: 20,
  };
  constructor() {}

  scaleX(width: number, data: { rank: number; value: number }[]) {
    return d3
      .scaleBand<number>()
      .domain(d3.range(data.length))
      .range([this.margin.left, width - this.margin.right])
      .padding(0.1);
  }

  scaleY(height: number, data: { rank: number; value: number }[]) {
    return d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value) as number])
      .range([height - this.margin.bottom, 0 + this.margin.top]);
  }
}

export default BarsService;
