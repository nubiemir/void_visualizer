import { TOptions } from ".";

interface ICheckBoxProbs {
  checked: boolean;
  label: string;
  id: string;
  onChange: (event: Event, type: keyof TOptions) => void;
}
const CheckBox = (props: ICheckBoxProbs) => {
  return (
    <>
      <label for={props.id}>{props.label}</label>
      <input
        onchange={(event) => props.onChange(event, props.id as keyof TOptions)}
        type="checkbox"
        checked={props.checked}
        class="w-[18px] h-[18px] cursor-pointer"
        id={props.id}
      />
    </>
  );
};

export default CheckBox;
