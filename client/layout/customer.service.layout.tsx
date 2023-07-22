import Adminheader from "components/Adminheader";
import Spinner from "components/Spinner";
import { useRouter } from "next/router";
import { FC, ReactElement, useEffect } from "react";
import { useAppSelector } from "store/hooks";
import AppsIcon from "@mui/icons-material/Apps";
import InventoryIcon from "@mui/icons-material/Inventory";
import PersonSharpIcon from "@mui/icons-material/PersonSharp";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { MdOutlineManageAccounts } from "react-icons/md";
interface CustomerServiceLayoutProps {
  tab: Number;
  title: string;
  children: ReactElement;
}

const CustomerServiceLayout: FC<CustomerServiceLayoutProps> = ({
  title,
  tab,
  children,
}) => {
  const admin = useAppSelector((state) => state.admin.currentAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!admin) router.push("/");
  }, [admin]);

  if (!admin) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen overflow-y-hidden container mx-auto">
      <div className="h-2/12 bg-gray-300">
        <Adminheader admin={admin} />
      </div>
      <div className="flex bg-black h-10/12">
        <div className="w-2/12 ">
          <div className="w-56 h-[calc(100vh-64px)] text-white bg-[#23252A] scrollbar-thin scrollbar-thumb-gray-700 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <div className="px-10 font-bold text-2xl">Menu</div>
            <div className="text-[#A09F9A] my-5">
              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 1
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/reports")}
              >
                <span className="mx-5">
                  <AppsIcon fontSize="large" />
                </span>
                <span>Reports</span>
              </div>

              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 2
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/products")}
              >
                <span className="mx-5">
                  <InventoryIcon fontSize="large" />
                </span>
                <span>Bottles</span>
              </div>

              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 3
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/customer")}
              >
                <span className="mx-5">
                  <PersonSharpIcon fontSize="large" />
                </span>
                <span>Customers</span>
              </div>

              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 4
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/order")}
              >
                <span className="mx-5">
                  <ExploreOutlinedIcon fontSize="large" />
                </span>
                <span>Orders</span>
              </div>

              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 12
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/guestorder")}
              >
                <span className="mx-5">
                  <ExploreOutlinedIcon fontSize="large" />
                </span>
                <span>Guest Orders</span>
              </div>

              <div
                className={`flex text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 10
                    ? "border-[#DBC864] text-[#DBC864]"
                    : "border-transparent"
                }`}
                onClick={() => router.push("/customerservice/account")}
              >
                <span className="mx-5">
                  <MdOutlineManageAccounts className="h-8 w-8" />
                </span>
                <span>Account</span>
              </div>

              <div
                className={`text-left py-4 px-2 hover:text-[#DBC864] hover:cursor-pointer font-semibold border-l-4 hover:border-[#DBC864] ${
                  tab === 11
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
        </div>
        <div className="w-full text-white h-[calc(100vh-64px)] scrollbar-thin scrollbar-thumb-gray-700 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full pb-16">
          <div className="p-2 mx-8 my-2">
            <div className="text-2xl font-semibold ">
              <div>{title}</div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerServiceLayout;
