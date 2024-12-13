import { ParentComponent, children } from "solid-js";
import BreadCrumbs from "../common/BreadCrumbs";
import Container from "./Container";

const Visualizer: ParentComponent = (props) => {
  const resolvedChildren = children(() => props.children);

  return (
    <section class="w-full h-full grid grid-rows-[minmax(30px,30px)_1fr]">
      <div class="w-[95%] mx-auto flex">
        <BreadCrumbs />
      </div>
      <Container>{resolvedChildren()}</Container>
    </section>
  );
};

export default Visualizer;
