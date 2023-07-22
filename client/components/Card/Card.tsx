import React from "react";
import Image from "next/image";

interface CardProps {
  // card: {
  //   productId: string;
  //   productTitle: string;
  //   productDescription: string;
  //   quantity: number;
  //   categoryType: string;
  //   discount: string;
  //   minQuantity: number;
  //   personalizable: number;
  //   newarrival?: boolean;
  //   price: Array<any>;
  //   media: Array<any>;
  // };
  card: any;
  horizental?: boolean;
}

const Card: React.FC<CardProps> = ({ card, horizental }) => {
  let customStyle = "";
  if (horizental === true) {
    customStyle = "flex justify-center items-center";
  }

  return (
    <div
      className={
        "bg-[#111111] m-2 items-center flex flex-col justify-center hover:shadow-sm" +
        customStyle
      }
    >
      <div className="relative w-full h-80">
        <Image
          src={
            card?.media[0] ? card.media[0].imagePointer : "/images/blank.jpg"
          }
          fill
          alt={"Card picture"}
        />
      </div>
      <div>
        <p className="text-center text-white my-2">{card.bottleName}</p>
        <p className="text-center text-white my-2">
          Rs. {card?.price ? card.price : 0}
        </p>
      </div>
    </div>
  );
};

export default Card;
