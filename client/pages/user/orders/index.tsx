import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Image from "next/image";
import Button from "components/Button";
import { useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import axios from "config/axios";
import Spinner from "components/Spinner";
import { handleAxiosResponseError } from "utils";
import UserSidebar from "components/user.sidebar";

interface OrderProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Orders: NextPage<OrderProps> = ({ products, isLightTheme }) => {
  const auth = useAppSelector((state) => state.auth.jwt);
  const user = useAppSelector((state) => state.user.currentUser);
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  if (!auth || auth === "logged_out") router.push("/");

  useEffect(() => {
    if (!auth || auth === "logged_out") router.push("/");
  }, [auth, router]);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/customer`)
      .then(({ data }) => {
        setOrders(data.orders);
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
            <UserSidebar active={1} isLightTheme={isLightTheme} />
            {/* End of Navitems */}
          </div>
        </div>

        {/* Right side component */}
        <div className="w-full mx-5">
          <div className="my-5">
            <h1 className="text-2xl text-gray-400">Orders</h1>
          </div>

          {/* <div className="flex text-xl">
            <span className="text-gray-400">Order placed in</span>
            <select
              name="selectYear"
              id="Year"
              className={`px-2 py-1 mx-3 rounded ${
                isLightTheme ? "" : "bg-[#2B2C2D]"
              }`}
            >
              <option value="2016" className="bg-[#2B2C2D]">
                2016
              </option>
            </select>
          </div> */}

          {/* Cards Section */}

          <div className="w-full my-5 overflow-y-auto h-[calc(100vh-158px)]">
            {orders?.map((order: any, key: any) => {
              return (
                <div className="grid grid-cols-5 gap-4 my-5" key={key}>
                  <div>
                    <div className="w-2/5">
                      <Image
                        src={order.image}
                        width="101"
                        height="152"
                        alt="bottle picture"
                      />
                    </div>
                  </div>

                  <div className="self-center text-sm font-thin">
                    <div className="text-center"> Order number</div>
                    <div className="text-center text-[#575656]">
                      {order.orderId}
                    </div>
                  </div>
                  <div className="self-center text-sm font-thin">
                    <div className="text-center"> Shipped date</div>
                    <div className="text-center text-[#575656]">
                      {order.dateTime.split("T")[0]}
                    </div>
                  </div>
                  <div className="self-center text-sm font-thin">
                    <div className=" flex justify-around">
                      <span> Total</span>{" "}
                      <span> Rs. {order.orderSubtotal}</span>
                    </div>
                    <div className=" flex justify-around">
                      <span> Status</span>
                      <span className="text-green-500">
                        {order.orderStatus}
                      </span>
                      {/* <span className="text-green-500"> Delivered</span> */}
                    </div>
                  </div>
                  <div className="self-center text-sm font-thin">
                    <Button
                      type={"yellow"}
                      text={"TRACK ORDER"}
                      customStyle={"h-fit text-sm px-2 py-3"}
                      handleClick={() =>
                        router.push(`/accounttracking?orderId=${order.orderId}`)
                      }
                      isLightTheme={isLightTheme}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* End of cards section */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
