import { A } from "@solidjs/router";
import { Show } from "solid-js";

interface ILinkProps {
  image: string;
  title: string;
  subtitle: string;
  readLink?: string;
  visualizeLink?: string;
}
const MenuLink = ({
  image,
  title,
  subtitle,
  readLink,
  visualizeLink,
}: ILinkProps) => {
  return (
    <div class="w-[100%] py-2">
      <div class="flex justify-between items-center">
        <div class="flex gap-4 items-center">
          <img src={image} class="object-cover rounded-md h-[40px] w-[40px]" />
          <div>
            <h4 class="text-[16px] font-semibold">{title}</h4>
            <p class="text-[14px] text-light">{subtitle}</p>
          </div>
        </div>
        <div class="flex gap-4">
          <Show when={visualizeLink}>
            <A
              href={visualizeLink!}
              class="bg-[#E8EDF2] py-1 px-4 text-bold rounded-md"
            >
              visualize
            </A>
          </Show>
          <Show when={readLink}>
            <A
              href={readLink!}
              class="outline outline-1 outline-blue-600 py-1 px-4 rounded-md text-blue-600"
            >
              read
            </A>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default MenuLink;
