type MenuList = {
  title: string;
  description: string;
  visualizeLink: string;
  category: string;
};

export const menuList: MenuList[] = [
  {
    title: "Bubble Sort",
    visualizeLink: "/algorithm/sorting/bubble",
    category: "Sorting",
    description: "Swaps adjacent elements if out of order.",
  },
  {
    title: "Selection Sort",
    visualizeLink: "/algorithm/sorting/selection",
    category: "Sorting",
    description: "Repeatedly finds and swaps the smallest element.",
  },
  {
    title: "Insertion Sort",
    visualizeLink: "/algorithm/sorting/insertion",
    category: "Sorting",
    description: "Builds a sorted list by inserting elements in order.",
  },
  {
    title: "Merge Sort",
    visualizeLink: "/algorithm/sorting/merge",
    category: "Sorting",
    description:
      "Recursively divides, sorts, and merges subarrays for sorting.",
  },
  {
    title: "Linear Search",
    visualizeLink: "/algorithm/searching/linear",
    category: "Searching",
    description: "Checks each element sequentially until the target is found.",
  },
  {
    title: "Bineary Search",
    visualizeLink: "/algorithm/searching/bineary",
    category: "Searching",
    description:
      "Repeatedly divides and checks sorted array halves for the target.",
  },
];
