import { JSXElement, ParentComponent } from "solid-js";
import { useTabContext } from "../../context";

const TabPanels: ParentComponent<{ children: JSXElement[] }> = (props) => {
  const { index } = useTabContext();
  if (!props.children) return null;
  return <div>{props.children[index()]}</div>;
};

export default TabPanels;
