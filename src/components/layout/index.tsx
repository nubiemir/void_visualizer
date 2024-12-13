import { ParentComponent, children } from "solid-js";
import Header from "../header";
import ThemeContext from "../../context/theme/theme-context";

const Layout: ParentComponent = (props) => {
  const resolvedChildren = children(() => props.children);

  return (
    <ThemeContext>
      <div class="grid grid-rows-[minmax(30px,80px)_1fr] min-h-screen">
        <div class="w-[100vw]  bg-base-300">
          <div class="w-[100%] h-[100%] max-w-[1600px] mx-[auto]">
            <Header />
          </div>
        </div>
        <div class="w-[100vw] h-[100%] p-2">{resolvedChildren()}</div>
      </div>
    </ThemeContext>
  );
};

export default Layout;
