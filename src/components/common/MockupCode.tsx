import { ParentComponent, children } from "solid-js";

const MockupCode: ParentComponent = (props) => {
  const c = children(() => props.children);
  return <div class="mockup-code">{c()}</div>;
};

export default MockupCode;
