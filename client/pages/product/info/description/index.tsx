import { FC } from "react";

interface DescriptionProps {
  className: string;
  isLightTheme: boolean;
  description: string;
}

const Description: FC<DescriptionProps> = ({
  className,
  isLightTheme,
  description,
}) => {
  return (
    <div
      className={`w-4/5 rounded-lg border mx-auto my-8 p-5 ${
        isLightTheme ? "border-[#865D4C]" : "border-white"
      } ${className}`}
    >
      <div>{description}</div>
    </div>
  );
};

export default Description;
