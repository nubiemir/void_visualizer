import { A } from "@solidjs/router";

interface IMenuCardProps {
  image?: string;
  title?: string;
  description?: string;
  visualizeLink: string;
  category?: string;
}

const MenuCard = (props: IMenuCardProps) => {
  return (
    <div class="w-[100%] h-[100%] card bg-base-300 p-2">
      <div class="card-body px-2 py-4 gap-1">
        <h4 class="opacity-65">{props.category}</h4>
        <h1 class="card-title text-lg">{props.title}</h1>
        <p>{props.description}</p>
        <div class="divider"></div>
        <div class="flex justify-end">
          <div class="sm:tooltip" data-tip="Visualize">
            <A class="btn bg-base-100" href={props.visualizeLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 567 512"
              >
                <path d="M0 80C0 53.5 21.5 32 48 32l96 0c26.5 0 48 21.5 48 48l0 16 192 0 0-16c0-26.5 21.5-48 48-48l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-16-192 0 0 16c0 1.7-.1 3.4-.3 5L272 288l96 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-96 0c-26.5 0-48-21.5-48-48l0-96c0-1.7 .1-3.4 .3-5L144 224l-96 0c-26.5 0-48-21.5-48-48L0 80z" />
              </svg>
            </A>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
