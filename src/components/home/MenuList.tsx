import MenuCard from "./MenuCard";
import testImage from "../../assets/test-image.png";
import Pagination from "../common/Pagination";
import { For } from "solid-js";
import { menuList } from "../../types/menu-list";

const MenuList = () => {
  return (
    <section class="md:w-[70%] w-[90%] m-auto my-6">
      <Pagination title="Featured Visualization">
        <For each={menuList}>
          {(item, _) => (
            <MenuCard
              title={item.title}
              image={testImage}
              visualizeLink={item.visualizeLink}
              category={item.category}
              description={item.description}
            />
          )}
        </For>
      </Pagination>
    </section>
  );
};

export default MenuList;
