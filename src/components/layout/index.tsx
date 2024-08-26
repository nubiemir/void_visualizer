import { ParentComponent } from "solid-js";
import Header from "../header";
import ThemeContext from "../../context/theme/theme-context";

const Layout: ParentComponent = (props) => {
  return (
    <ThemeContext>
      <div class="w-[100vw] bg-base-300">
        <div class="w-[100%] h-[100%] max-w-[1600px] mx-[auto]">
          <Header />
        </div>
      </div>
      <div class="w-[100vw] max-w-[1600px] mx-[auto]">{props.children}</div>
    </ThemeContext>
  );
};

export default Layout;
