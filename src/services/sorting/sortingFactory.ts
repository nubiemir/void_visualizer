import { ISorting } from "../../types";
import BubbleService from "./bubble.service";
import SelectionService from "./selection.service";

export const sortingFactory = (value: string): ISorting => {
  let service;
  switch (value) {
    case "bubble":
      service = new BubbleService();
      break;
    case "selection":
      service = new SelectionService();
      break;
    default:
      service = new SelectionService();
      break;
  }

  return service;
};
