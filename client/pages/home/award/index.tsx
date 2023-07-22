import { useRouter } from "next/router";
import React from "react";
import Button from "../../../components/Button";

interface AwardProps {
  award: any;
  isLightTheme: boolean;
}

const Award: React.FC<AwardProps> = ({ award, isLightTheme }) => {
  const router = useRouter();
  return (
    <div
      className={`flex flex-col md:flex-row justify-center items-center  p-10 md:p-20 ${
        isLightTheme ? "bg-[#FDF3EB]" : "bg-black"
      } `}
    >
      <div className="flex lg:px-8 justify-center flex-col w-full lg:w-4/5">
        <h3
          className={`mx-auto text-2xl md:text-5xl ${
            isLightTheme ? "text-[#865D4C]" : "text-white"
          }`}
        >
          {award.heading}
        </h3>

        <p
          className={`${
            isLightTheme ? "text-black" : "text-white"
          } w-full md:w-3/5 my-10`}
        >
          {award.detail}
        </p>

        <Button
          text={"EXPLORE MORE"}
          type={"black"}
          customStyle="w-fit"
          handleClick={(): Promise<boolean> => router.push("/product")}
          isLightTheme={isLightTheme}
        />
      </div>

      <div className="mt-8 md:mt-0 block">
        <div className="w-4/5 mx-auto rounded">
          <div className="w-full aspect-h-9 aspect-w-16 relative rounded-2xl">
            <video autoPlay={true} muted={true} loop={true}>
              <source src={award.mediaPointer} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Award;
