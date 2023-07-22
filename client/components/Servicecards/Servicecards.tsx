import React, { FC } from "react";
import Borderlesscard from "../Borderlesscard";
import { ImLoop2 } from "react-icons/im";
import { FiTruck } from "react-icons/fi";
import { GiAlarmClock } from "react-icons/gi";
import Image from "next/image";

const staticCardData = [
  {
    img: "/icons/cycle.png",
    title: "Free Same Day Delivery*",
    description:
      "Product any fault within 07 days for an immediately exchange.",
  },
  {
    img: "/icons/truck.png",
    title: "Free Same Day Delivery*",
    description:
      "Product any fault within 07 days for an immediately exchange.",
  },
  {
    img: "/icons/clock.png",
    title: "Free Same Day Delivery*",
    description:
      "Product any fault within 07 days for an immediately exchange.",
  },
];

interface ServicecardsProps {
  isLightTheme: boolean;
}

const Servicecards: FC<ServicecardsProps> = ({ isLightTheme }) => {
  return (
    <div className={`${isLightTheme ? "bg-white" : "bg-black"}  p-20 py-28`}>
      <div className="grid lg:grid-cols-3 gap-y-4 justify-items-center">
        {/* {staticCardData.map((card, key) => {
          return <div className="text-center w-3/5">
          <div className="flex justify-center">
            <Image src={card.img} width="85" height="85" alt="card" />
          </div>
          <p className="text-[#865D4C] text-xl">{card.title}</p>
          <p className="text-black my-5">{card.description}</p>
        </div>
        })} */}

        <div className="text-center w-3/5">
          <div className="flex justify-center mb-4">
            <ImLoop2
              className={`h-12 w-12 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
          </div>
          <p
            className={`${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } text-xl`}
          >
            {staticCardData[0].title}
          </p>
          <p className={`${isLightTheme ? "text-black" : "text-white"} my-5`}>
            {staticCardData[0].description}
          </p>
        </div>
        <div className="text-center w-3/5">
          <div className="flex justify-center mb-4">
            <FiTruck
              className={`h-12 w-12 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
          </div>
          <p
            className={`${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } text-xl`}
          >
            {staticCardData[1].title}
          </p>
          <p className={`${isLightTheme ? "text-black" : "text-white"} my-5`}>
            {staticCardData[1].description}
          </p>
        </div>
        <div className="text-center w-3/5">
          <div className="flex justify-center mb-4">
            <GiAlarmClock
              className={`h-12 w-12 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
          </div>
          <p
            className={`${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } text-xl`}
          >
            {staticCardData[2].title}
          </p>
          <p className={`${isLightTheme ? "text-black" : "text-white"} my-5`}>
            {staticCardData[2].description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Servicecards;
