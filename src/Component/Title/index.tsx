import React from "react";

type Props = {
  title: string;
};

const Title: React.FC<Props> = ({ title }) => {
  return <h2 className="main_clr text-center my-4">{title}</h2>;
};

export default Title;
