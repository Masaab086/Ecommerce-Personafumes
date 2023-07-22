import Image from "next/image";
import React, { useEffect, useState } from "react";

interface BagItemProps {
  bag: any;
  products: any;
  personalize: number;
}

const BagItem: React.FC<BagItemProps> = ({ bag, products, personalize }) => {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const item = products.find((col: any) => col.bottleId === bag.id);
    // const itemPrice = item?.price.find(
    //   (col: any) => col.unitOfMeasure === bag.weight
    // );
    setPrice(item?.price * bag.quantity);
  }, [products, bag]);

  return (
    <>
      <div className="w-3/6 self-center">
        <Image src={bag.image} width="65" height="101" alt="" />
      </div>

      <div className="col-span-2 self-center leading-7">
        {/* <p className="text-xl">{bag.title}</p> */}
        <p>Size : {bag.weight}</p>
        <div className="flex justify-between">
          <p>Quantity: {bag.quantity}</p>
          {personalize ? (
            <p>Rs. {price + Number(personalize)}</p>
          ) : (
            <p>Rs. {price}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default BagItem;
