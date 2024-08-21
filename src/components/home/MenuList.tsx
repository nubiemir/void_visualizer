import MenuCard from "./MenuCard";
import testImage from "../../assets/test-image.png";
import Carousel from "../common/Carousel";
import { For } from "solid-js";
import { menuList } from "../../types/menu-list";

const MenuList = () => {
  return (
    <section class="md:w-[70%] w-[90%] m-auto my-6">
      <Carousel title="Featured Visualization" len={menuList.length}>
        <For each={menuList}>
          {(item, _) => (
            <div class="min-w-[180px] md:min-w-[220px] w-[100]">
              <MenuCard
                title={item.title}
                image={testImage}
                visualizeLink={item.visualizeLink}
                readLink={item.readLink}
              />
            </div>
          )}
        </For>
      </Carousel>
    </section>
  );
};

export default MenuList;
