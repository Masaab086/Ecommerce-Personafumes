import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { AddCouponModel } from "model/add.coupon";
import { AddCouponSchema } from "schemas/add.coupon.schema";

interface UpdateCouponProps {
  sideBarUpdate: boolean;
  setSideBarUpdate: Function;
  setCoupons: Function;
  coupon: any;
  coupons: any;
}

const UpdateCoupon: React.FC<UpdateCouponProps> = ({
  sideBarUpdate,
  setSideBarUpdate,
  setCoupons,
  coupon,
  coupons,
}) => {
  const [btnClick, setBtnClick] = useState(false);
  const { campaignName, code, discount, endDate, startDate, minAmount } =
    coupon;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddCouponModel>({
    resolver: joiResolver(AddCouponSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
    defaultValues: {
      campaignName,
      code,
      discount,
      endDate,
      startDate,
      minAmount,
    },
  });

  useEffect(() => {
    reset({
      campaignName,
      code,
      discount,
      endDate,
      startDate,
      minAmount,
    });
  }, [coupon, reset]);

  const handleAddProduct = async (data: any): Promise<void> => {
    // console.log(data);
    setBtnClick(true);

    const postData = {
      ...data,
    };

    console.log(postData);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/coupon/${coupon.couponId}`,
        postData
      )
      .then(({ data }): void => {
        console.log(data);
        setCoupons(
          coupons.map((item: any) =>
            item.couponId === coupon.couponId ? { ...data.coupon } : item
          )
        );
        toast.success(data.message);
        reset();
        setBtnClick(false);
        setSideBarUpdate(false);
      })
      .catch((err): void => {
        console.log("Error : ", handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
        setBtnClick(false);
      });
  };

  return (
    <>
      <div
        className={`h-fit absolute top-0 right-0 w-3/6 text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarUpdate == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px]  p-1 px-3 flex justify-between items-center">
          <div>
            <div>Update Coupon</div>
            <div>Update your Coupon and necessary information from here</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarUpdate(false)}
          >
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 3 */}
            <div className="grid grid-cols-3 my-5">
              <div>Campaign Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Campaign Title"
                  {...register("campaignName")}
                />
                {errors.campaignName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.campaignName.message}
                  </p>
                )}
              </div>
            </div>

            {/* INput 5 */}
            <div className="grid grid-cols-3 my-5">
              <div>Campaign Code</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Campaign Code"
                  {...register("code")}
                />
                {errors.code && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Coupon Start date</div>
              <div className="col-span-2">
                <input
                  type="date"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Category"
                  {...register("startDate")}
                />

                {errors.startDate && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.startDate.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 my-5">
              <div>Coupon Validity date</div>
              <div className="col-span-2">
                <input
                  type="date"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Category"
                  {...register("endDate")}
                />

                {errors.endDate && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Discount Percentage</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Discount Percentage"
                  {...register("discount")}
                />
                {errors.discount && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Minimum Amount</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="Minimum amount required"
                  {...register("minAmount")}
                />
                {errors.minAmount && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.minAmount.message}
                  </p>
                )}
              </div>
            </div>
            {/* End of the input 5 */}
          </div>

          {/* End buttons section */}
          <div className="flex justify-around py-6 px-4">
            <button
              type="button"
              className="bg-[#24262D] w-5/12 py-1 rounded-md"
              onClick={(): void => setSideBarUpdate(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#DBC864] text-black rounded-md w-5/12 py-1"
              // onClick={() => setSideBarDisplay(false)}
            >
              {/* Add Product */}
              {btnClick ? (
                <Spinner className="mx-auto  h-8 w-8 text-gray-800" />
              ) : (
                "Update Coupon"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCoupon;
