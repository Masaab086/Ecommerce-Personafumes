import React from "react";
import Image from "next/image";

interface BorderLessCardProps {
  card: {
    img: string;
    title: string;
    description: string;
  };
}

const Borderlesscard: React.FC<BorderLessCardProps> = ({ card }) => {
  return (
    <div className="text-center w-3/5">
      <div className="flex justify-center">
        <Image src={card.img} width="85" height="85" alt="card" />
      </div>
      <p className="text-[#865D4C] text-xl">{card.title}</p>
      <p className="text-black my-5">{card.description}</p>
    </div>
  );
};

export default Borderlesscard;
