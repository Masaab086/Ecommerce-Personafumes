import React from "react";
import AppsIcon from "@mui/icons-material/Apps";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { GiFragrance } from "react-icons/gi";
import { MdAddToHomeScreen, MdOutlineManageAccounts } from "react-icons/md";
import { useRouter } from "next/router";
import { IoSettings } from "react-icons/io5";

interface AdminSideBarProps {
  tabNo: Number;
}

const Adminsidebar: React.FC<AdminSideBarProps> = ({ tabNo }) => {
  const router = useRouter();

  return (
    <div className="w-56 h-[calc(100vh-64px)] text-white bg-[#23252A] scrollbar-thin scrollbar-thumb-gray-700 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
      <div className="px-10 font-bold text-2xl">Menu</div>
      <div className="text-[#A09F9A] my-5">
        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 1
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/reports")}
        >
          <span className="mx-5">
            <AppsIcon fontSize="large" />
          </span>
          <span>Reports</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 2
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/products")}
        >
          <span className="mx-5">
            <InventoryIcon fontSize="large" />
          </span>
          <span>Bottles</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 3
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/customer")}
        >
          <span className="mx-5">
            <PersonSharpIcon fontSize="large" />
          </span>
          <span>Customers</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 4
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/order")}
        >
          <span className="mx-5">
            <ExploreOutlinedIcon fontSize="large" />
          </span>
          <span>Orders</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 12
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/guestorder")}
        >
          <span className="mx-5">
            <ExploreOutlinedIcon fontSize="large" />
          </span>
          <span>Guest Orders</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 5
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/coupons")}
        >
          <span className="mx-5">
            <CardGiftcardOutlinedIcon fontSize="large" />
          </span>
          <span>Coupons</span>
        </div>

        <div
          className={`flex text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 6
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/fragrance")}
        >
          {/* <span className="mx-5"> */}
          <div className="mx-5">
            <GiFragrance className="h-8 w-8 mr-1" />
          </div>
          {/* </span> */}
          <span>Fragrances</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 8
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/members")}
        >
          <span className="mx-5">
            <SettingsOutlinedIcon fontSize="large" />
          </span>
          <span>Members</span>
        </div>

        <div
          className={`text-left py-4 px-2 flex hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 9
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/landingpage")}
        >
          <span className="mx-5">
            <MdAddToHomeScreen className="h-8 w-8" />
          </span>
          <span>Update App</span>
        </div>

        <div
          className={`flex text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 10
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/account")}
        >
          <span className="mx-5">
            <MdOutlineManageAccounts className="h-8 w-8" />
          </span>
          <span>Account</span>
        </div>

        {/* <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 7
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
        >
          <span className="mx-5">
          </span>
          <span>Settings</span>
        </div> */}

        <div
          className={`flex text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 7
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/superadmin/settings")}
        >
          {/* <span className="mx-5"> */}
          <div className="mx-5">
            <IoSettings className="h-8 w-8" />
          </div>
          {/* </span> */}
          <span>Settings</span>
        </div>

        <div
          className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
            tabNo === 11
              ? "border-[#DBC864] text-[#DBC864]"
              : "border-transparent"
          }`}
          onClick={() => router.push("/signout")}
        >
          <span className="mx-5">
            <ExitToAppIcon fontSize="large" />
          </span>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Adminsidebar;
