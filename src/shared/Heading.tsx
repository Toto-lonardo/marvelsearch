type title = {
  title: string;
};

export default function Heading({ title }: title) {
  return (
    <h2 className="text-center p-2 text-danger border-bottom border-2 ">
      {title}
    </h2>
  );
}

Heading.defaultProps = {
  title: "Default Title",
};
