import React from "react";

interface TextProps {
  text: string;
}

const Text : React.FC<TextProps> = ({text}) => {
  return <div className="w-fit">{text}</div>;
};

export default Text;
