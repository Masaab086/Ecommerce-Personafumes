import React, { useState } from "react";
import type { NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface OTPProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const OTP: NextPage<OTPProps> = ({ products, isLightTheme }) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  const handleOtp = () => {
    const phone = localStorage.getItem("phone");
    console.log("phone : ", phone);
    if (phone) {
      const data = { phone, input };
      console.log(data);
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/otp/verify`,
          data
        )
        .then(({ data }) => {
          console.log(data);
          router.push("/user/account");
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
          toast.error(handleAxiosResponseError(err));
        });
    }
  };

  return (
    <div className="bg-black w-full h-full min-h-screen flex flex-col font-Raleway">
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="h-max m-auto w-full md:w-6/12 pt-6 text-black">
        <div className="py-20 px-3">
          <div className="container mx-auto">
            <div className="max-w-sm mx-auto md:max-w-lg">
              <div className="w-full">
                <div className="bg-white h-64 py-3 rounded text-center">
                  <h1 className="text-2xl font-bold">OTP Verification</h1>
                  <div className="flex flex-col mt-4">
                    <span>Enter the OTP you received at</span>
                    <span className="font-bold">your number</span>
                  </div>

                  <div
                    id="otp"
                    className="flex flex-row justify-center text-center px-2 mt-5"
                  >
                    <input
                      className="m-2 border h-10 text-center form-control rounded"
                      type="text"
                      maxLength={6}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </div>

                  <div className="flex justify-center text-center mt-5">
                    <div
                      className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"
                      onClick={handleOtp}
                    >
                      <span className="font-bold">Verify</span>
                      <i className="bx bx-caret-right ml-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default OTP;
