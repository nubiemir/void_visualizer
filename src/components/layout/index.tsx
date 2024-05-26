import { ParentComponent } from "solid-js";
import Header from "../header";

const Layout: ParentComponent = (props) => {
  return (
    <>
      <div class="w-[100vw] h-[8vh]">
        <div class="w-[100%] h-[100%] border-b px-4">
          <Header />
        </div>
      </div>
      <div class="w-[100vw]">{props.children}</div>
    </>
  );
};

export default Layout;
