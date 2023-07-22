import Button from "components/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

interface AboutProps {
  about: any;
  isLightTheme: boolean;
}

const About: React.FC<AboutProps> = ({ about, isLightTheme }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center relative">
      {/* <div className="w-1/3 lg:w-6/12 mx-auto"> */}

      {/* Text container */}
      <div className="w-full lg:w-1/2 space-y-2">
        <div className="w-4/5 mx-auto">
          <p className="text-2xl md:text-5xl text-white my-8 font-thin">
            {/* {feature.heading} */}
            BEST FRAGRANCE, BEST BOTTLE, BEST PRICE 2022
          </p>
          {/* <p className="text-white text-xl md:text-2xl my-6">
            {feature.subHeading}
          </p> */}
          {/* <p className="text-white">{feature.detail}</p> */}
          <p className="text-white text-lg">
            Unexpected and undeniably bold. Fresh clean and profoundly sensual,
            the woody, aromatic fragrance reveals the spirit of a man who
            chooses his own destiny with independence and determination of a man
            who defies convention.
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
        <div className="w-9/12 mx-auto md:ml-auto">
          <div className="relative w-full h-96 lg:h-[500px] m-auto">
            <Image
              // src="/images/1_Banner_Design.png"
              src="/images/Enchantment_Front.png"
              fill
              alt="hero section 3"
            />
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
    // <div className="w-11/12 mx-auto">
    //   <div className="relative w-full h-[600px]">
    //     <Image
    //       src="/images/Perfume_5.png"
    //       // src="/images/heroimage4.png"
    //       fill
    //       alt="hero 4"
    //     />
    //   </div>
    // </div>
    // <div className="bg-black flex justify-center items-center py-20">
    //   <div className="flex justify-center hidden lg:block">
    //     <div className="w-4/5">
    //       <Image
    //         // src="/images/Perfume_2_Size_1.png"
    //         src="/images/heroimage4.png"
    //         width="730"
    //         height="767"
    //         alt="hero 4"
    //       />
    //     </div>
    //   </div>

    //   <div>
    //     <div className="w-4/5 mx-auto lg:mx-0">
    //       <h1 className="font-thin text-2xl md:text-5xl text-white my-8">
    //         {about.heading}
    //       </h1>
    //       <p className="text-white">{about.detail}</p>
    //       {about.list.map((item: any, index: number) => (
    //         <div className="flex my-4 items-center" key={index}>
    //           <Image src="/icons/tick.png" width="40" height="40" alt="tick" />
    //           <p className="text-white mx-4 my-5">{item}. </p>
    //         </div>
    //       ))}
    //       {/* <div className="flex my-4 items-center">
    //         <Image src="/icons/tick.png" width="40" height="40" alt="tick" />
    //         <p className="text-white mx-4">
    //           Ipsum in consequat, quam eget platea tellus facilisis.{" "}
    //         </p>
    //       </div>
    //       <div className="flex my-4 items-center">
    //         <Image src="/icons/tick.png" width="40" height="40" alt="tick " />
    //         <p className="text-white mx-4">
    //           Ipsum in consequat, quam eget platea tellus facilisis.{" "}
    //         </p>
    //       </div> */}
    //       <Button
    //         text={"EXPLORE MORE"}
    //         type={"black"}
    //         customStyle="m-6"
    //         handleClick={(): Promise<boolean> => router.push("/product")}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default About;
