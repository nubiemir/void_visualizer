import ISorting from "./ISorting";

type TResult = {
  data: {
    rank: number;
    value: number;
  }[];
  lft: number;
  rgt: number;
};

class BubbleService implements ISorting {
  constructor(private arr: number[]) {}

  draw(): void {}

  animate(): void {}

  sort(): TResult[] {
    const arrCopy = this.arr.slice();
    const result: TResult[] = [];

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
