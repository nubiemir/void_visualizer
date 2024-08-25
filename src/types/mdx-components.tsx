const mdx = {
  h1: (props: any) => <h1 class="text-2xl leading-10" {...props} />,
  hr: (props: any) => (
    <hr class="h-[4px] border-base my-1 rounded-full" {...props} />
  ),
};

export { mdx };
