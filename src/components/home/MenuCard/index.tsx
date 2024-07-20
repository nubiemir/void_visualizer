interface IMenuCardProps {
  image?: string;
  title?: string;
  subtitle?: string;
}

const MenuCard = (props: IMenuCardProps) => {
  return (
    <div class="w-[100%] h-[100%] card glass bg-base-100 shadow-xl">
        <figure class="w-[100%] h-[100%]">
            <img src={props.image} class="min-w-[100%] object-contain"/>
        </figure>
        <div class="card-body px-2 py-4 gap-1">
            <h1 class="card-title text-lg">{props.title}</h1>
            <p>{props.subtitle}</p>
            <div class="card-actions justify-between">
                <button class="btn btn-outline btn-primary h-[2.5rem] min-h-[2.5rem]">Visualize</button>
                <button class="btn btn-outline h-[2.5rem] min-h-[2.5rem]">Read</button>
            </div>
        </div>
    </div>
  );
};

export default MenuCard;
