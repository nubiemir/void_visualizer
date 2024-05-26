interface IMenuTopicProps {
  title: string;
  subtitle: string;
}

const MenuTopic = ({ title, subtitle }: IMenuTopicProps) => {
  return (
    <>
      <h3 class="font-bold text-[16px] text-bold">{title}</h3>
      <p class="text-light text-[14px]">{subtitle}</p>
    </>
  );
};

export default MenuTopic;
