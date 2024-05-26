import LogoImage from "../../assets/logo.svg";

const Logo = () => {
  return (
    <div class="w-[100%] h-[100%] flex items-center">
      <div class="flex items-end gap-1">
        <div class="w-[30px] h-[30px]">
          <img
            src={LogoImage}
            width={"100%"}
            height={"100%"}
            class="object-fill"
          />
        </div>
        <h2 class="text-xl font-bold">Void</h2>
      </div>
    </div>
  );
};

export default Logo;
