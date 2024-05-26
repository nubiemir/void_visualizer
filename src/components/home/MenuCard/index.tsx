import MenuImage from "./MenuImage";
import MenuTopic from "./MenuTopic";

interface IMenuCardProps {
  image: string;
  title: string;
  subtitle: string;
}

const MenuCard = ({ image, title, subtitle }: IMenuCardProps) => {
  return (
    <div class="w-[100%] h-[100%]">
      <MenuImage image={image} />
      <div>
        <MenuTopic title={title} subtitle={subtitle} />
      </div>
    </div>
  );
};

export default MenuCard;
