interface IMenuImageProps {
  image: string;
}

const MenuImage = ({ image }: IMenuImageProps) => {
  return (
    <img
      src={image}
      width={"100%"}
      height={"100%"}
      class="object-fill rounded-md"
    />
  );
};

export default MenuImage;
