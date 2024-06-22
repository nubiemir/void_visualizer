import { Show } from "solid-js";
import { usePreviewStore } from "../../context";
import BreadCrumbs from "../common/BreadCrumbs";
import Container from "./Container";

const Visualizer = () => {
  const { previewStore } = usePreviewStore();

  return (
    <Show
      when={previewStore.expand}
      fallback={
        <section class="w-[70%] m-auto mt-4">
          <div class="mb-4 flex">
            <BreadCrumbs />
          </div>
          <Container />
        </section>
      }
    >
      <section class="absolute bg-[#f7fafc] top-0 right-0 left-0 bottom-0 flex items-center animate-appear">
        <Container />
      </section>
    </Show>
  );
};

export default Visualizer;
