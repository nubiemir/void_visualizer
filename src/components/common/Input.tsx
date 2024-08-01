import { Show } from "solid-js";

interface IInputProps {
  type: string;
  placeholder?: string;
  id?: string;
  value: string;
  helperText?: string;
  error: boolean;
  handleChange: (
    ev: Event & { currentTarget: HTMLInputElement; target: HTMLInputElement },
  ) => void;
}
const Input = (props: IInputProps) => {
  return (
    <div>
      <input
        class="input input-bordered w-full"
        classList={{
          "input-error": props.error,
        }}
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(ev) => props.handleChange(ev)}
        onInput={(ev) => ev.stopPropagation()}
        id={props.id}
      />
      <Show when={props.helperText}>
        <p
          class="text-xs text-white mt-2"
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
