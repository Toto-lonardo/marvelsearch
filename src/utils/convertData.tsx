const ConvertData = ({ inputdate }: { inputdate: string }) => {
  const formatdate = new Date(inputdate);

  return formatdate.toLocaleString("en-US", {
    year: "numeric", // "2020"
    month: "long", // "February"
    day: "numeric", // "19"
  });
};

export default ConvertData;
