export type TUniqueArr = {
  value: number;
  id: number;
};

export type TResult = {
  data: {
    rank: number;
    value: number;
    compare: boolean;
    sorted: boolean;
    id: number;
  }[];
};
