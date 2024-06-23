import { A, useLocation } from "@solidjs/router";
import { createMemo, For } from "solid-js";
import CommonServices from "../../services/common";

const BreadCrumbs = () => {
  const location = useLocation();
  const commonServices = new CommonServices();
  const pathname = createMemo(() =>
    commonServices.parsePath(location.pathname)
  );

  let url = "";

  return (
    <>
      <For each={pathname()}>
        {(link, idx) => {
          url += link === "" ? "/" : `/${link}`;
          return (
            <A href={`${url}`}>
              <span
                class="mr-2"
                classList={{ "text-blue-600": idx() !== pathname().length - 1 }}
              >
                {link === "" && idx() !== pathname().length - 1 ? "Home" : link}
              </span>
              {idx() !== pathname().length - 1 && <span class="mr-2">/</span>}
            </A>
          );
        }}
      </For>
    </>
  );
};

export default BreadCrumbs;
