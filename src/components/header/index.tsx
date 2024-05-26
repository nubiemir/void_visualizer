import { A } from "@solidjs/router";
import Link from "./Link";
import Logo from "./Logo";

const Header = () => {
  return (
    <header class="flex content-between items-center w-[100%] h-[100%] ">
      <div class="w-[25%] h-[100%]">
        <A href="/">
          <Logo />
        </A>
      </div>
      <nav class="w-[75%] h-[100%]">
        <ul class="flex h-[100%] items-center gap-8">
          <Link label="Home" to="/"></Link>
          <Link label="Algorithm" to="/algorithm"></Link>
          <Link label="Data Structure" to="/data-structure"></Link>
          <Link label="Interview Prep" to="/interview-prep"></Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
