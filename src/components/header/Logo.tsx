import LogoImage from "../../assets/light-logo.svg";

const Logo = () => {
  return (
    <div class="w-[100%] h-[100%] flex items-center">
      <div class="flex items-end gap-1">
        <div class="w-[130px] h-[50px]">
          <img
            src={LogoImage}
            width={"100%"}
            height={"100%"}
            class="object-fill"
          />
        </div>
      </div>
    </div>
  );
};

export default Logo;
