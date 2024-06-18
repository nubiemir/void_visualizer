import { Show } from "solid-js";

interface IInputProps {
  type: string;
  placeholder?: string;
  value: string;
  helperText?: string;
  error: boolean;
  handleChange: (
    ev: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement }
  ) => void;
}
const Input = (props: IInputProps) => {
  return (
    <div>
      <input
        class="w-[100%] text-black px-2 py-1 rounded-sm outline-none "
        classList={{
          "outline-red-600": props.error,
        }}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(ev) => props.handleChange(ev)}
        onInput={(ev) => ev.stopPropagation()}
      />
      <Show when={props.helperText}>
        <p
          class="text-xs mt-2"
          classList={{
            "text-red-600": props.error,
          }}
        >
          {props.helperText}
        </p>
      </Show>
    </div>
  );
};

export default Input;
