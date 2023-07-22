import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Header from "../components/Header";
import Button from "../components/Button";
import { useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import UserSidebar from "components/user.sidebar";

interface AccountTrackingProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const AccountTracking: NextPage<AccountTrackingProps> = ({
  products,
  isLightTheme,
}) => {
  const user = useAppSelector((state) => state.user.currentUser);
  const router = useRouter();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const orderId = params.get("orderId");
  const [orderStatus, setOrderStatus] = useState<any>([]);

  useEffect(() => {
    if (orderId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/events/${orderId}`
        )
        .then(({ data }) => {
          setOrderStatus(data.shippingEvents);
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
        });
    }
  }, [orderId]);

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } font-Raleway container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex h-screen">
        <div
          className={`w-96 mx-auto ${
            isLightTheme ? "bg-[#FDF3EB]" : "bg-black"
          }`}
        >
          <div className="w-full">
            <h1 className="text-2xl my-5">My account</h1>

            <h3 className="my-5 text-xl">
              Welcome {user?.firstName}, {user?.lastName}
            </h3>

            <UserSidebar active={1} isLightTheme={isLightTheme} />
          </div>
        </div>

        {/* Right side component */}
        <div className="w-full  mx-5">
          <div className="my-5">
            <h1 className="text-2xl text-gray-400">TrackOrder</h1>

            {/* Input range */}
            <div className="my-5">
              <input
                type="range"
                min="1"
                value={orderStatus.length}
                max="4"
                disabled
                className={`w-full bg-gray-400 ${
                  isLightTheme ? "text-[#865D4C]" : "text-gray-400"
                }`}
              />
            </div>

            {/* End of input range */}

            <div className="grid grid-cols-5">
              <div>
                <div
                  className={`${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } text-center text-xl`}
                >
                  Ordered
                </div>
                {orderStatus[0] ? (
                  <>
                    <div className="text-center">
                      {orderStatus[0]?.eventDateTime.split("T")[0]}
                    </div>
                    <div className="text-center">
                      {orderStatus[0]?.eventDateTime.split("T")[1].slice(0, -5)}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <div
                  className={`${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } text-center text-xl`}
                >
                  Ready
                </div>
                {orderStatus[1] ? (
                  <>
                    <div className="text-center">
                      {orderStatus[1]?.eventDateTime.split("T")[0]}
                    </div>
                    <div className="text-center">
                      {orderStatus[1]?.eventDateTime.split("T")[1].slice(0, -5)}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-span-2 justify-self-start">
                <div
                  className={`${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } text-center text-xl`}
                >
                  Shipped
                </div>
                <div className="text-center">
                  {orderStatus[2] ? (
                    <>
                      <div className="text-center">
                        {orderStatus[2]?.eventDateTime.split("T")[0]}
                      </div>
                      <div className="text-center">
                        {orderStatus[2]?.eventDateTime
                          .split("T")[1]
                          .slice(0, -5)}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div>
                <div
                  className={`${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } text-center text-xl`}
                >
                  Estimated delivered
                </div>

                {/* <div className="text-center">21/06/17</div> */}
              </div>
            </div>

            {/* Tracking details */}

            <div className="my-8">
              <h1 className="text-2xl ">Updates</h1>

              <div className="grid grid-cols-5 my-5">
                <div
                  className={`col-span-2 ${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } `}
                >
                  Date
                </div>
                <div
                  className={`col-span-2 ${
                    isLightTheme ? "text-[#865D4C]" : "text-[#6B6D6E]"
                  } `}
                >
                  Location
                </div>
                <div className=" text-[#6B6D6E]">Event</div>

                {/* <div className="flex justify-between  col-span-2">
                  <span>20/06/17</span>
                </div>

                <div className="col-span-2">Roma, IT</div>

                <div>Shipped</div> */}
              </div>

              {orderStatus.map((order: any, index: number) => (
                <div className="grid grid-cols-5 my-5" key={index}>
                  <div className="col-span-2">
                    {order.eventDateTime.split("T")[0]}
                  </div>

                  <div className="col-span-2">Roma, IT</div>

                  <div>{order.eventTitle}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <div className="w-fit mx-auto">
                <Button
                  text={"Back to Order Details"}
                  type={"yellow"}
                  handleClick={() => router.push("/user/orders")}
                  isLightTheme={isLightTheme}
                />
              </div>
            </div>

            {/* End of tracking details */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTracking;
