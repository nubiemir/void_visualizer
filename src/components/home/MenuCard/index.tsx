import { A } from "@solidjs/router";
import VisualizeIcon from "../../../assets/graph.svg";
import ReadIcon from "../../../assets/book.svg";

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
              <img src={ReadIcon} width={20} height={20} />
            </A>
          </div>
          <div class="sm:tooltip" data-tip="Visualize">
            <A class="btn bg-base-100" href={props.visualizeLink}>
              <img src={VisualizeIcon} width={20} height={20} />
            </A>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
