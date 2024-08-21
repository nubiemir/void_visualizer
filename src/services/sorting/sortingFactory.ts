import { IVisualizer } from "../../types";
import BinearyService from "../searching/bineary.service";
import LinearService from "../searching/linear.service";
import BubbleService from "./bubble.service";
import InsertionService from "./insertion.service";
import MergeService from "./merge.service";
import SelectionService from "./selection.service";

export const sortingFactory = (value: string): IVisualizer => {
  let service;
  switch (value) {
    case "bubble":
      service = new BubbleService();
      break;
    case "selection":
      service = new SelectionService();
      break;
    case "insertion":
      service = new InsertionService();
      break;
    case "merge":
      service = new MergeService();
      break;
    case "linear-search":
      service = new LinearService();
      break;
    case "bineary-search":
      service = new BinearyService();
      break;
    default:
      service = new SelectionService();
      break;
  }

  return service;
};
