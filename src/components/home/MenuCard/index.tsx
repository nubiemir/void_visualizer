import { A } from "@solidjs/router";

interface IMenuCardProps {
  image?: string;
  title?: string;
  visualizeLink: string;
  readLink: string;
  category?: string;
}

const MenuCard = (props: IMenuCardProps) => {
  return (
    <div class="w-[100%] h-[100%] card bg-base-300 p-2">
      <div class="card-body px-2 py-4 gap-1">
        <h4 class="opacity-65">{props.category}</h4>
        <h1 class="card-title text-lg">{props.title}</h1>
        <p>Swaps adjacent elements if out of order.</p>
        <div class="divider"></div>
        <div class="flex justify-between">
          <div class="sm:tooltip" data-tip="Read">
            <A class="btn bg-base-100" href={props.readLink}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 512 512"
              >
                <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152l0 264-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427L0 224c0-17.7 14.3-32 32-32l30.3 0c63.6 0 125.6 19.6 177.7 56zm32 264l0-264c52.1-36.4 114.1-56 177.7-56l30.3 0c17.7 0 32 14.3 32 32l0 203c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
              </svg>
            </A>
          </div>
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
