import { Bottle } from "model/interfaces";
import { FC } from "react";

interface AdditionalProps {
  className: string;
  isLightTheme: boolean;
  product: Bottle;
}

const Additional: FC<AdditionalProps> = ({
  className,
  isLightTheme,
  product,
}) => {
  return (
    <div
      className={`w-4/5 rounded-lg border mx-auto my-8 p-5 ${
        isLightTheme ? "border-[#865D4C]" : "border-white"
      } ${className}`}>
      <ul>
        <li>
          Brand : <span>Personafumes</span>
        </li>
        <li>
          Size :{" "}
          <span className="font-bold">
            {" "}
            {product.capacity} {product.unitOfMeasure}
          </span>
        </li>
        <li>
          Launched in <span className="font-bold">2023</span>
        </li>
      </ul>
    </div>
  );
};

export default Additional;
