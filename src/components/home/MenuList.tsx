import MenuCard from "./MenuCard";
import testImage from "../../assets/test-image.png";
// import { A } from "@solidjs/router";
import Carousel from "../common/Carousel";
import { For } from "solid-js";
import { menuList } from "../../types/menu-list";

const MenuList = () => {
  let ref: HTMLElement;

  return (
    <section class="md:w-[70%] w-[90%] m-auto my-6">
      <Carousel title="Featured Visualization" len={5}>
        <For each={menuList}>
          {(item, _) => (
            <div
              class="min-w-[180px] md:min-w-[220px] w-[100]"
              ref={(ele) => (ref = ele)}
            >
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
