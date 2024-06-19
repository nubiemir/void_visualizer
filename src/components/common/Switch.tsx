import { createSignal } from "solid-js";
import Icon from "../../assets/caret-right-solid.svg";

const Switch = () => {
  const [value, setValue] = createSignal(false);
  let ref: HTMLInputElement;

  const handleCheckBoxToggle = (
    event: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }
  ) => {
    const target = event.target;
    setValue(target.checked);
  };

  const handleSwitchClick = () => {
    ref.click();
  };

  return (
    <div>
      <div
        onclick={handleSwitchClick}
        class="w-[40px] h-[12px] bg-switch-container  rounded-lg relative flex items-center cursor-pointer"
      >
        <div
          class="w-[20px] h-[20px] rounded-[50%] bg-bold absolute left-0 transition duration-800 flex justify-center items-center"
          classList={{ "translate-x-[20px]": value() }}
        >
          <img src={Icon} width={8} height={8} />
        </div>
      </div>
      <input
        id="hidden"
        ref={(ele) => (ref = ele)}
        hidden
        type="checkbox"
        checked={value()}
        onchange={handleCheckBoxToggle}
      />
    </div>
  );
};

export default Switch;
