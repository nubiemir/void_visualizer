import { For } from "solid-js";
import MenuLink from "./MenuLink";

type Menu = {
  image: string;
  title: string;
  subtitle: string;
  visualizeLink: string;
  readLink: string;
};

interface IMenuListProps {
  introTitle: string;
  introDescription: string;
  title: string;
  list: Menu[];
}

const MenuList = ({
  title,
  list,
  introTitle,
  introDescription,
}: IMenuListProps) => {
  return (
    <div class="mb-10">
      <div class="mb-6">
        <h3 class="font-bold">{introTitle}</h3>
        <p>{introDescription}</p>
      </div>
      <div class="mb-2">
        <h2 class="text-[20px] font-semibold">{title}</h2>
      </div>

      <For each={list}>
        {(item) => (
          <MenuLink
            image={item.image}
            title={item.title}
            subtitle={item.subtitle}
            visualizeLink={item.visualizeLink}
            readLink={item.readLink}
          />
        )}
      </For>
    </div>
  );
};

export default MenuList;

// `http://localhost:5173${pathname}/visualize-bubble-sort`
// `http://localhost:5173${pathname}/read-bubble-sort`
