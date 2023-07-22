import Button from "components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface FeatureProps {
  feature: any;
  isLightTheme: boolean;
}

const Feature: React.FC<FeatureProps> = ({ feature, isLightTheme }) => {
  const router = useRouter();
  return (
    // <div className="w-11/12 mx-auto">
    //   <div className="relative w-full h-[600px] m-auto">
    //     <Image
    //       src="/images/Perfume_1.png"
    //       // src="/images/heroimage3.png"
    //       fill
    //       alt="hero section 3"
    //     />
    //   </div>
    // </div>
    <div className="flex flex-col lg:flex-row justify-center items-center relative">
      {/* <div className="w-1/3 lg:w-6/12 mx-auto"> */}

      {/* Text container */}
      <div className="w-full lg:w-1/2 space-y-2">
        <div className="w-4/5 mx-auto">
          <p className="text-2xl md:text-5xl text-white my-8 font-thin">
            {/* {feature.heading} */}
            WELCOME TO THE WINTER BREEZE 2021
          </p>
          {/* <p className="text-white text-xl md:text-2xl my-6">
            {feature.subHeading}
          </p> */}
          {/* <p className="text-white">{feature.detail}</p> */}
          <p className="text-white text-lg">
            Personalize this Exquisite high-end product with the choice of your
            fragrance that is inspired by all the major brands with long lasting
            effects.{" "}
          </p>
          <div className="mt-12">
            <Button
              text={"EXPLORE MORE"}
              type={"black"}
              customStyle="w-fit"
              handleClick={(): Promise<boolean> => router.push("/product")}
              isLightTheme={isLightTheme}
            />
          </div>
          {/* <div className="flex items-center my-5 mt-16">
            <Image
              src="/icons/smallbottels.png"
              width="87"
              height="69"
              alt="small bottel"
            />
            <p className="text-xl mx-5 text-white">No Chemicals</p>
          </div> */}

          {/* <p className="text-white my-7">{feature.statement}</p> */}
        </div>
      </div>
      <div className="w-full md:w-1/2 h-2/5">
        <div className="w-4/5 mx-auto md:ml-auto">
          <div className="relative w-full h-96 lg:h-[500px] m-auto">
            <Image
              // src="/images/1_Banner_Design.png"
              src="/images/BlazingImpact_Front.png"
              fill
              alt="hero section 3"
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Feature;
