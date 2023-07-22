import React from "react";

interface ButtonProps {
  type: string;
  customStyle?: string;
  text: string;
  handleClick?: () => void;
  isLightTheme: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  customStyle,
  text,
  handleClick,
  isLightTheme,
}) => {
  let extraStyle: string = " ";

  if (type === "yellow") {
    extraStyle =
      extraStyle +
      ` ${
        isLightTheme ? "bg-[#865D4C] text-white" : "bg-yellow-200 text-black"
      } `;
  } else if (type === "black") {
    extraStyle =
      extraStyle +
      `  border bg-transparent ${
        isLightTheme ? "border-[#865D4C] text-black" : "border-white text-white"
      }`;
  }

  extraStyle = extraStyle + " " + customStyle;

  return (
    <button
      className={" p-4 font-semibold " + extraStyle}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
