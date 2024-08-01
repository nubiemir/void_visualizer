import { A } from "@solidjs/router";

interface IMenuCardProps {
  image?: string;
  title?: string;
  visualizeLink: string;
  readLink: string;
}

const MenuCard = (props: IMenuCardProps) => {
  return (
    <div class="w-[100%] h-[100%] card glass bg-base-100 shadow-xl">
      <figure class="w-[100%] h-[100%]">
        <img src={props.image} class="min-w-[100%] object-contain" />
      </figure>
      <div class="card-body px-2 py-4 gap-1">
        <h1 class="card-title text-lg">{props.title}</h1>
        <div class="card-actions justify-between">
          <A
            class="btn btn-outline btn-primary h-[2.5rem] min-h-[2.5rem]"
            href={props.visualizeLink}
          >
            Visualize
          </A>
          <A
            class="btn btn-outline h-[2.5rem] min-h-[2.5rem]"
            href={props.readLink}
          >
            Read
          </A>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
