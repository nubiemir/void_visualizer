import MenuCard from "./MenuCard";
import testImage from "../../assets/test-image.png";
import { A } from "@solidjs/router";

const MenuList = () => {
  return (
    <section class="w-[70%] m-auto my-6">
      <div class="mb-2">
        <h1 class="text-lg font-bold text-bold">Featured Visualization</h1>
      </div>
      <div class="flex justify-between">
        <A href="/" class=" block">
          <MenuCard title="Hello" subtitle="Hi" image={testImage} />
        </A>
        <A href="/" class=" block">
          <MenuCard title="Hello" subtitle="Hi" image={testImage} />
        </A>
        <A href="/" class=" block">
          <MenuCard title="Hello" subtitle="Hi" image={testImage} />
        </A>
        <A href="/" class=" block">
          <MenuCard title="Hello" subtitle="Hi" image={testImage} />
        </A>
        <A href="/" class=" block">
          <MenuCard title="Hello" subtitle="Hi" image={testImage} />
        </A>
      </div>
    </section>
  );
};

export default MenuList;
