import BubbleMDX from "./bubble.mdx";
import { mdx } from "../../../types";

const Bubble = () => {
  return (
    <section class="w-[90%] m-auto mt-4">
      <BubbleMDX components={mdx} />
    </section>
  );
};
export default Bubble;
