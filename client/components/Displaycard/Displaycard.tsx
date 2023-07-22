import React, { Dispatch, useEffect, useState } from "react";
import Image from "next/image";
import { AnyAction } from "@reduxjs/toolkit";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { MdClear } from "react-icons/md";

interface DisplayCardProps {
  closeEvent: () => void;
  bag: any;
  dispatch: Dispatch<AnyAction>;
  bagActions: any;
  products: any;
  personalize: any;
  setSingleProduct: Function;
  setIsTab1: Function;
  isLightTheme?: boolean;
}

const Displaycard: React.FC<DisplayCardProps> = ({
  closeEvent,
  bag,
  dispatch,
  bagActions,
  products,
  personalize,
  setSingleProduct,
  setIsTab1,
  isLightTheme,
}) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setQuantity(bag.quantity);
  }, [quantity, bag]);

  useEffect(() => {
    const item = products?.find((col: any) => col.bottleId === bag.id);

    setPrice(item?.price * quantity + bag.fragranceCost);
  }, [products, bag, quantity]);

  const increaseQuantity = () => {
    const quant = quantity + 1;
    setQuantity(quantity + 1);
    dispatch(bagActions.updateBag({ id: bag.id, quantity: quant }));
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const quant = quantity - 1;
      setQuantity(quantity - 1);
      dispatch(bagActions.updateBag({ id: bag.id, quantity: quant }));
    }
  };

  const handleCheckout = (id: string, fragranceId: string) => {
    setSingleProduct({ id, fragranceId });
    setIsTab1(false);
  };

  const handleUpdatePersonalize = () => {
    router.push(
      `/personalize?id=${bag.id}&fragrance=${bag.fragranceId}&weight=${
        bag.weight
      }&quantity=${bag.quantity}&unitCost=${
        bag?.fragranceCost / bag.weight
      }&inspiration=${bag.inspiration}`
    );
  };

  return (
    <div>
      <div className="text-right pr-8 mt-3 flex justify-end">
        <div onClick={closeEvent} className="cursor-pointer right-0">
          <MdClear
            className={`h-6 w-6 ${
              isLightTheme ? "text-[#865D4C]" : "text-white"
            } `}
          />
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 mx-2 lg:mx-8 ">
        {/* Product */}
        <div className="flex px-2 py-2">
          <div className="relative w-32 h-36">
            <Image src={bag.image} fill alt="Product image" />
          </div>

          <div className="">
            {/* <p>{bag.title}</p> */}
            <p className="font-thin text-sm ">Size : {bag.weight}</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="self-center mx-auto ">
          <div className="items-center  	">
            <div className="flex  w-fit">
              <span
                className="border border-white rounded p-1 px-2 cursor-pointer	"
                onClick={decreaseQuantity}
              >
                -
              </span>
              <span className=" p-1 px-2">{quantity}</span>
              <span
                className="border-l border-white p-1 px-2 cursor-pointer	content-center border border-white rounded"
                onClick={increaseQuantity}
              >
                +
              </span>
            </div>
          </div>
        </div>
        {/* Price */}

        <div className="self-center">
          {personalize ? (
            <div className="flex justify-end">
              <p className="">Personalize price : Rs. {Number(personalize)}</p>
              <FaEdit
                className="ml-2 h-6 w-6 cursor-pointer hover:bg-slate-700 rounded"
                onClick={handleUpdatePersonalize}
              />
            </div>
          ) : (
            <></>
          )}

          <p className="text-right">Rs. {price}</p>
          <div className="flex justify-end py-2 items-center">
            <span className="px-2">checkout</span>{" "}
            <IoBagCheckOutline
              className="h-8 w-8 hover:bg-slate-700 rounded-full p-1 cursor-pointer"
              onClick={() => handleCheckout(bag.id, bag.fragranceId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Displaycard;
