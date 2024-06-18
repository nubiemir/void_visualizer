import { ParentComponent } from "solid-js";

interface ITabListPops {
  variant?: "horizontal" | "vertical";
  sx?: string;
}

const TabList: ParentComponent<ITabListPops> = (props) => {
  return (
    <div
      class={`flex ${props.sx}`}
      classList={{ "flex-col": props.variant === "vertical" }}
    >
      {props.children}
    </div>
  );
};

export default TabList;
