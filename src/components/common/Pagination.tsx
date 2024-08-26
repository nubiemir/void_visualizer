import { ParentComponent, children } from "solid-js";

interface PaginationProps {
  title?: string;
}

const Pagination: ParentComponent<PaginationProps> = (props) => {
  const resolvedChildern = children(() => props.children);

  return (
    <div class="w-[100%] h-[100%] py-4 overflow-x-hidden">
      <div class="w-[100%] h-[100%] flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <h2 class="text-2xl font-bold">{props.title}</h2>
          </div>
        </div>
        <div class="w-[100%]">
          <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2 justify-center">
            {resolvedChildern()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
