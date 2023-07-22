import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import {
  MdReviews,
  MdProductionQuantityLimits,
  MdFavoriteBorder,
  MdManageAccounts,
} from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

interface UserSidebarProps {
  active: number;
  isLightTheme: boolean;
}

const UserSidebar: React.FC<UserSidebarProps> = ({ active, isLightTheme }) => {
  const router = useRouter();

  return (
    <div className="w-full">
      <div
        className={`${
          isLightTheme ? "hover:bg-[#FFEDDF]" : "hover:bg-[#2B2C2D]"
        }  rounded my-2 ${
          active === 1
            ? `${isLightTheme ? "bg-[#FFEDDF]" : "bg-[#2B2C2D]"}`
            : ""
        } cursor-pointer`}
        onClick={() => router.push("/user/orders")}
      >
        <div className="w-11/12 grid grid-cols-4 p-2 ">
          <div className="self-center pt-2">
            <MdProductionQuantityLimits className="h-8 w-8" />
          </div>

          <p className="self-center col-span-2">Orders</p>

          <div className="self-center justify-self-end">
            <Image
              src="/icons/arrowright.png"
              width="15"
              height="29"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
      {/* <div
        className={`${
          isLightTheme ? "hover:bg-[#FFEDDF]" : "hover:bg-[#2B2C2D]"
        }  rounded my-2 ${
          active === 2
            ? `${isLightTheme ? "bg-[#FFEDDF]" : "bg-[#2B2C2D]"}`
            : ""
        } cursor-pointer`}
        onClick={() => router.push("/user/favourite")}
      >
        <div className="w-11/12 grid grid-cols-4 p-2 ">
          <div className="self-center pt-2">
            <MdFavoriteBorder className="h-8 w-8" />
          </div>

          <p className="self-center col-span-2">Favourite</p>

          <div className="self-center justify-self-end">
            <Image
              src="/icons/arrowright.png"
              width="15"
              height="29"
              alt="arrow icon"
            />
          </div>
        </div>
      </div> */}
      <div
        className={`${
          isLightTheme ? "hover:bg-[#FFEDDF]" : "hover:bg-[#2B2C2D]"
        }  rounded my-2 ${
          active === 3
            ? `${isLightTheme ? "bg-[#FFEDDF]" : "bg-[#2B2C2D]"}`
            : ""
        } cursor-pointer`}
        onClick={() => router.push("/user/reviews")}
      >
        <div className="w-11/12 grid grid-cols-4 p-2 ">
          <div className="self-center pt-2">
            <MdReviews className="h-8 w-8" />
          </div>

          <p className="self-center col-span-2">My Reviews</p>

          <div className="self-center justify-self-end">
            <Image
              src="/icons/arrowright.png"
              width="15"
              height="29"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          isLightTheme ? "hover:bg-[#FFEDDF]" : "hover:bg-[#2B2C2D]"
        }  rounded my-2 ${
          active === 4
            ? `${isLightTheme ? "bg-[#FFEDDF]" : "bg-[#2B2C2D]"}`
            : ""
        } cursor-pointer`}
        onClick={() => router.push("/user/account")}
      >
        <div className="w-11/12 grid grid-cols-4 p-2 ">
          <div className="self-center pt-2">
            <MdManageAccounts className="h-8 w-8" />
          </div>

          <p className="self-center col-span-2">Personal Data</p>

          <div className="self-center justify-self-end">
            <Image
              src="/icons/arrowright.png"
              width="15"
              height="29"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
      <div
        className={`${
          isLightTheme ? "hover:bg-[#FFEDDF]" : "hover:bg-[#2B2C2D]"
        }  rounded my-2 ${
          active === 5
            ? `${isLightTheme ? "bg-[#FFEDDF]" : "bg-[#2B2C2D]"}`
            : ""
        } cursor-pointer`}
        onClick={() => router.push("/signout")}
      >
        <div className="w-11/12 grid grid-cols-4 p-2 ">
          <div className="self-center pt-2">
            <FaSignOutAlt className="h-8 w-8" />
          </div>

          <p className="self-center col-span-2">Sign Out</p>

          <div className="self-center justify-self-end">
            <Image
              src="/icons/arrowright.png"
              width="15"
              height="29"
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
