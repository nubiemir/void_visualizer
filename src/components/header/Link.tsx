import { A } from "@solidjs/router";

interface ILinkProps {
  label: string;
  to: string;
}

const Link = ({ label, to }: ILinkProps) => {
  return (
    <li class=" text-sm font-semibold">
      <A href={to} class="text-bold">
        {label}
      </A>
    </li>
  );
};

export default Link;
