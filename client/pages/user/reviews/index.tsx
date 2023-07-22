import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import axios from "config/axios";
import Spinner from "components/Spinner";
import { handleAxiosResponseError } from "utils";
import UserSidebar from "components/user.sidebar";
import Remains from "./remains";
import History from "./history";

interface ReviewsProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Reviews: NextPage<ReviewsProps> = ({ products, isLightTheme }) => {
  const auth = useAppSelector((state) => state.auth.jwt);
  const user = useAppSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState<Number>(0);

  if (!auth || auth === "logged_out") router.push("/");

  useEffect(() => {
    if (!auth || auth === "logged_out") router.push("/");
  }, [auth, router]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/order/product`)
      .then(({ data }) => {
        setOrders(data.orders);
        console.log("Orders : ", data.orders);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  if (!auth || auth === "logged_out") {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } font-Raleway h-screen container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex">
        <div className={`w-96 mx-auto ${isLightTheme ? "bg-[#FDF3EB]" : ""}`}>
          <div className="w-full">
            <h1 className="text-2xl my-5">My account</h1>

            <h3 className="my-5 text-xl">
              Welcome {user?.firstName}, {user?.lastName}{" "}
            </h3>

            {/* Navitems */}
            <UserSidebar active={3} isLightTheme={isLightTheme} />
            {/* End of Navitems */}
          </div>
        </div>

        {/* Right side component */}
        <div className="w-full mx-5">
          <div className="my-5">
            <h1
              className={`text-2xl ${
                isLightTheme ? "text-[#865D4C]" : "text-gray-400"
              } `}
            >
              My Reviews
            </h1>
          </div>

          <div
            className={`flex text-xl  p-2 ${
              isLightTheme ? "bg-[#FDF3EB]" : "bg-[#2B2C2D]"
            }`}
          >
            <button
              className={`${tab === 0 && "underline"} hover:underline mx-2`}
              onClick={() => setTab(0)}
            >
              To be Reviewed
            </button>
            <button
              className={`${tab === 1 && "underline"} hover:underline mx-2`}
              onClick={() => setTab(1)}
            >
              History
            </button>
          </div>

          {/* Cards Section */}

          <div className={`mt-10 ${tab !== 0 && "hidden"} `}>
            <Remains
              orders={orders}
              setOrders={setOrders}
              isLightTheme={isLightTheme}
            />
          </div>
          <div className={`${tab !== 1 && "hidden"} mt-10`}>
            <History orders={orders} isLightTheme={isLightTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
