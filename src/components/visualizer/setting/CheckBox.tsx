import { TOptions } from ".";

interface ICheckBoxProbs {
  checked: boolean;
  label: string;
  disabled?: boolean;
  id: string;
  onChange: (
    event: Event & {
      currentTarget: HTMLInputElement;
      target: HTMLInputElement;
    },
    type: keyof TOptions
  ) => void;
}
const CheckBox = (props: ICheckBoxProbs) => {
  return (
    <>
      <label
        for={props.id}
        class=" "
        classList={{ "text-slate-500": props.disabled }}
      >
        {props.label}
      </label>
      <input
        onChange={(event) => props.onChange(event, props.id as keyof TOptions)}
        disabled={props.disabled}
        type="checkbox"
        checked={props.checked}
        class="w-[18px] h-[18px] cursor-pointer"
        id={props.id}
      />
    </>
  );
};

export default CheckBox;
