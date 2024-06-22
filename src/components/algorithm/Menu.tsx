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
        visualizeLink: `http://localhost:5173${pathname}/bubble`,
        readLink: `http://localhost:5173${pathname}/read-bubble`,
      },
      {
        image: LinkImage,
        title: "Selection Sort",
        subtitle: "This is an selection sort",
        visualizeLink: `http://localhost:5173${pathname}/selection`,
        readLink: `http://localhost:5173${pathname}/read-selection`,
      },
      {
        image: LinkImage,
        title: "Insertion Sort",
        subtitle: "This is an insertion sort",
        visualizeLink: `http://localhost:5173${pathname}/visualize-insertion-sort`,
        readLink: `http://localhost:5173${pathname}/visualize-insertion-sort`,
      },
      {
        image: LinkImage,
        title: "Merge Sort",
        subtitle: "This is a merge sort",
        visualizeLink: `http://localhost:5173${pathname}/visualize-merge-sort`,
        readLink: `http://localhost:5173${pathname}/visualize-merge-sort`,
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
        visualizeLink: `http://localhost:5173${pathname}/visualize-linear-search`,
        readLink: `http://localhost:5173${pathname}/visualize-linear-search`,
      },
      {
        image: LinkImage,
        title: "Bineary Search",
        subtitle: "This is a bineary search",
        visualizeLink: `http://localhost:5173${pathname}/visualize-bineary-search`,
        readLink: `http://localhost:5173${pathname}/visualize-bineary-search`,
      },
    ],
  };
  return (
    <section class="w-[70%] m-auto mt-4">
      <div class="mb-4">
        <BreadCrumbs />
      </div>
      <div class="mb-4">
        <h1 class="text-[32px] text-bold font-bold">Algorithms</h1>
      </div>
      <MenuList
        title={sort.title}
        introTitle={sort.introTitle}
        introDescription={sort.introDescription}
        list={sort.list}
      />
      <MenuList
        title={search.title}
        introTitle={search.introTitle}
        introDescription={search.introDescription}
        list={search.list}
      />
    </section>
  );
};

export default Menu;
