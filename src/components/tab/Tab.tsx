import { Show } from "solid-js";
import { useTabContext } from "../../context/tab/tab-context";

interface ITabProps {
  title?: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  index: number;
}
const Tab = (props: ITabProps) => {
  const { handleTabChange, index } = useTabContext();

  const selectedStyle = () => {
    return {
      "border-transparent": index() !== props.index,
    };
  };
  return (
    <button
      class="w-max flex items-center gap-2 px-2 pb-2 border-b-[3px]"
      classList={selectedStyle()}
      onclick={() => handleTabChange(props.index)}
    >
      <Show when={props.title}>
        <span>{props.title}</span>
      </Show>
      <Show when={props.icon}>
        <span>
          <img
            src={props.icon}
            width={props.iconWidth || 20}
            height={props.iconHeight || 20}
          />
        </span>
      </Show>
    </button>
  );
};

export default Tab;
