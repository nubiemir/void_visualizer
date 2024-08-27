import { A } from "@solidjs/router";
import Link from "./Link";
import Logo from "./Logo";
import ThemeController from "./ThemeController";

const Header = () => {
  return (
    <header class="navbar">
      <div class="navbar-start">
        <div>
          <A href="/">
            <Logo />
          </A>
        </div>
      </div>
      <nav class="navbar-center px-4 hidden md:flex">
        <ul class="menu menu-horizontal gap-1">
          <Link label="Home" to="/"></Link>
          <Link label="Algorithm" to="/algorithm"></Link>
          <Link label="Data Structure" to="/data-structure"></Link>
          <Link label="Interview Prep" to="/interview-prep"></Link>
        </ul>
      </nav>
      <div class="navbar-end px-4">
        <div class="dropdown dropdown-end">
          <div tabIndex={0} role="button" class="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            class="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <Link label="Home" to="/"></Link>
            <Link label="Algorithm" to="/algorithm"></Link>
            <Link label="Data Structure" to="/data-structure"></Link>
            <Link label="Interview Prep" to="/interview-prep"></Link>
          </ul>
        </div>
        <ThemeController />
      </div>
    </header>
  );
};

export default Header;
