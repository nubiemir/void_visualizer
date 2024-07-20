import { A } from "@solidjs/router";

interface ILinkProps {
  label: string;
  to: string;
}

const Link = ({ label, to }: ILinkProps) => {
  return (
    <li class="font-semibold">
      <A href={to} end>
        {label}
      </A>
    </li>
  );
};

export default Link;
