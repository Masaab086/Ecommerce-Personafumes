import React, { useState } from "react";
import Button from "../../../components/Button";
import Description from "./description";
import Reviews from "./reviews";
import { Bottle, Review } from "model/interfaces";
import Additional from "./additional";

interface InfoProps {
  reviews: Review[];
  isLightTheme: boolean;
  product: Bottle;
}

const Info: React.FC<InfoProps> = ({ reviews, isLightTheme, product }) => {
  const [tab, setTab] = useState<Number>(0);

  const handleTabChange = (num: Number) => {
    setTab(num);
  };

  return (
    <div className="py-8">
      <div className="grid lg:grid-cols-5 gap-3 w-4/5 mx-auto ">
        <Button
          type={tab === 0 ? "yellow" : "black"}
          text={"PRODUCT DESCRIPTION"}
          handleClick={() => handleTabChange(0)}
          isLightTheme={isLightTheme}
        />
        <Button
          type={tab === 1 ? "yellow" : "black"}
          text={"ADDITIONAL INFORMATION"}
          handleClick={() => handleTabChange(1)}
          isLightTheme={isLightTheme}
        />
        <Button
          type={tab === 2 ? "yellow" : "black"}
          text={"REVIEWS"}
          handleClick={() => handleTabChange(2)}
          isLightTheme={isLightTheme}
        />
      </div>

      <Description
        className={tab === 0 ? "block" : "hidden"}
        description={product.description}
        isLightTheme={isLightTheme}
      />
      <Additional
        className={tab === 1 ? "block" : "hidden"}
        product={product}
        isLightTheme={isLightTheme}
      />

      <Reviews className={tab === 2 ? "flex" : "hidden"} reviews={reviews} />
    </div>
  );
};

export default Info;
