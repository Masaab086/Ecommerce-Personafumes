import React, { FC } from "react";
import Image from "next/image";

interface FooterProps {
  isLightTheme: boolean;
}

const Footer: FC<FooterProps> = ({ isLightTheme }) => {
  return (
    // absolute inset-x-0 bottom-0 h-16
    <div
      className={`grid lg:grid-cols-2 border border-t-1 h-20 content-center	overflow-hidden mt-auto ${
        isLightTheme
          ? "text-black border-[#865D4C] bg-[#F5E3DE]"
          : "text-white bg-[#1D1D1D] border-black"
      }`}
    >
      <p className="justify-self-center lg:justify-self-start flex items-center ml-8">
        Copyright © 2022 perfumes. - All Rights Reserved
      </p>
      <div className=" hidden lg:flex justify-end align-center content-center mr-8">
        <button className="mx-3">
          <Image
            src="/images/visacard.png"
            width="109"
            height="50"
            alt="Pay with Visa card"
          />
        </button>

        <button className="mx-3">
          <Image
            src="/images/mastercard.png"
            width="109"
            height="50"
            alt="Pay with Master card"
          />
        </button>
        <button className="mx-3">
          <Image
            src="/images/paypalcard.png"
            width="109"
            height="50"
            alt="Pay with Paypal"
          />
        </button>
        <button className="mx-3">
          <Image
            src="/images/skillcard.png"
            width="109"
            height="50"
            alt="Pay with Skill"
          />
        </button>
      </div>
    </div>
  );
};

export default Footer;
