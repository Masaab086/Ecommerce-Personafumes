import React from "react";
import Image from "next/image";

interface CardProps {
  card: any;
  horizental?: boolean;
}

const Card2: React.FC<CardProps> = ({ card, horizental }) => {
  // let newStyle = " hidden";
  // if (card.newarrival == true) {
  //   newStyle = " ";
  // }
  let customStyle = "";
  if (horizental === true) {
    customStyle = "flex justify-center items-center";
  }

  return (
    <div
      className={
        "p-4 bg-[#111111] px-8 m-8 items-center flex flex-col justify-center hover:shadow-sm" +
        customStyle
      }
    >
      <div>
        <div
          className={"text-white bg-[#865D4C] w-fit rounded-xl text-sm px-4"}
        >
          New
        </div>
        <Image
          // src={"/images/cardimg1.png"}
          src={
            card?.media[0] ? card.media[0].imagePointer : "/images/blank.jpg"
          }
          width="160"
          height="247"
          alt={"Card picture"}
        />
      </div>
      <div>
        <p className="text-center text-white my-2">{card.title}</p>
        <p className="text-center text-white my-2">
          Rs. {card?.price ? card.price : 0}
        </p>
      </div>
    </div>
  );
};

export default Card2;
