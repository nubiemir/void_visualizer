interface IMediaProps {
  handleClick: (event: MouseEvent) => void;
  image: string;
  classList?: {
    [key: string]: boolean | undefined;
  };
  height?: number;
  width?: number;
}
const Media = (props: IMediaProps) => {
  return (
    <div class="w-[30px] flex justify-center items-center">
      <img
        src={props.image}
        width={props.height ?? 16}
        height={props.width ?? 16}
        onclick={props.handleClick}
        classList={props.classList}
      />
    </div>
  );
};

export default Media;
