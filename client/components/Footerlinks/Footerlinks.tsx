import React, { FC } from "react";
import Button from "../Button";
import Linkgroup from "../Linkgroup";
import Image from "next/image";
import { LinksData } from "../../Data/FooterLinks";

interface FooterLinksProps {
  isLightTheme: boolean;
}

const Footerlinks: FC<FooterLinksProps> = ({ isLightTheme }) => {
  return (
    <div
      className={`${
        isLightTheme ? "bg-[#F5E3DE]" : "bg-black"
      } p-10 py-10 flex flex-col md:flex-row`}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 w-full lg:w-3/5">
        {LinksData.map((link, key) => {
          return (
            <Linkgroup data={link} key={key} isLightTheme={isLightTheme} />
          );
        })}
      </div>

      <div
        className={`${
          isLightTheme ? "text-black" : "text-white"
        } w-full lg:w-2/5`}
      >
        <p
          className={`text-2xl ${
            isLightTheme ? "text-black" : "text-white"
          } font-bold my-5`}
        >
          The good stuff in your inbox
        </p>

        <a href="">News & updates from Perfume.</a>
        <br />
        <a href=""> No spam, we promise.</a>

        <div className="w-full py-6 flex">
          <input type="text" className="p-1 rounded-0 w-4/6 text-black " />
          <Button
            text={"SIGN UP"}
            type={"yellow"}
            customStyle={"w-/6"}
            isLightTheme={isLightTheme}
          />
        </div>

        <div className="flex">
          <div className="m-5">
            <Image
              src="/icons/twitter.png"
              width="60"
              height="60"
              alt="twitter"
            />
          </div>
          <div className="m-5">
            <Image
              src="/icons/social1.png"
              width="60"
              height="60"
              alt="social"
            />
          </div>
          <div className="m-5">
            <Image src="/icons/be.png" width="60" height="60" alt="be" />
          </div>
          <div className="m-5">
            <Image
              src="/icons/instagram.png"
              width="60"
              height="60"
              alt="instagram"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footerlinks;
