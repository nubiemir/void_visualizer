import BreadCrumbs from "../common/BreadCrumbs";
import MenuList from "../common/MenuList";
import LinkImage from "../../assets/test-image.png";
import { useLocation } from "@solidjs/router";

const Menu = () => {
  const pathname = useLocation().pathname;
  const sort = {
    introTitle: "Sortings",
    introDescription:
      "Searching is the process of finding a specific element within a collection. It is an important tool when working with large amounts of data.",
    title: "Sorting Algorithm",

    list: [
      {
        image: LinkImage,
        title: "Bubble Sort",
        subtitle: "This is a bubble sort",
        visualizeLink: `${pathname}/sorting/bubble`,
      },
      {
        image: LinkImage,
        title: "Selection Sort",
        subtitle: "This is an selection sort",
        visualizeLink: `${pathname}/sorting/selection`,
      },
      {
        image: LinkImage,
        title: "Insertion Sort",
        subtitle: "This is an insertion sort",
        visualizeLink: `${pathname}/sorting/insertion`,
      },
      {
        image: LinkImage,
        title: "Merge Sort",
        subtitle: "This is a merge sort",
        visualizeLink: `${pathname}/sorting/merge`,
      },
    ],
  };
  const search = {
    title: "Searching Algorithms",
    introTitle: "Searching",
    introDescription:
      "Searching is the process of finding a specific element within a collection. It is an important tool when working with large amounts of data.",
    list: [
      {
        image: LinkImage,
        title: "Linear Search",
        subtitle: "This is a linear search",
        visualizeLink: `${pathname}/searching/linear`,
      },
      {
        image: LinkImage,
        title: "Bineary Search",
        subtitle: "This is a bineary search",
        visualizeLink: `${pathname}/searching/bineary`,
      },
    ],
  };
  return (
    <section class="w-[95%] md:w-[70%] m-auto mt-4">
      <div class="mb-4">
        <BreadCrumbs />
      </div>
      <div class="mb-4">
        <h1 class="text-[32px] font-bold">Algorithms</h1>
      </div>
      <MenuList
        id="sorting"
        title={sort.title}
        introTitle={sort.introTitle}
        introDescription={sort.introDescription}
        list={sort.list}
      />
      <MenuList
        id="searching"
        title={search.title}
        introTitle={search.introTitle}
        introDescription={search.introDescription}
        list={search.list}
      />
    </section>
  );
};

export default Menu;
