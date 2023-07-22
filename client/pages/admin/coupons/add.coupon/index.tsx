import React, { useRef, useState } from "react";
// import Image from "next/image";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { AddCouponModel } from "model/add.coupon";
import { AddCouponSchema } from "schemas/add.coupon.schema";
import { DateFormateWithDash } from "utils/date.handler";

interface AddCouponProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  setCoupons: Function;
}

const AddCoupon: React.FC<AddCouponProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  setCoupons,
}) => {
  // const [files, setFile] = useState<Array<any>>([]);
  // const [message, setMessage] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  // const imageRef = useRef<any>(null);
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
  });

  // const handleFile = (e: any): void => {
  //   setMessage("");
  //   const target = e.target as HTMLInputElement;

  //   if (target.files && target.files.length) {
  //     let file: FileList = target.files;

  //     for (let i = 0; i < file.length; i++) {
  //       const fileType = file[i]["type"];
  //       const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  //       if (validImageTypes.includes(fileType)) {
  //         axios
  //           .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/getsecureurl`)
  //           .then(({ data }): void => {
  //             let options = {
  //               method: "PUT",
  //               headers: {
  //                 "Content-Type": "multipart/form-data",
  //               },
  //               body: file[0],
  //             };

  //             fetch(data.secureUrl, options) //api for the get request
  //               .then((response): void => {
  //                 if (response.status === 200) {
  //                   console.log(response.url);
  //                   setFile((prev): any[] => [
  //                     ...prev,
  //                     { imagePointer: response.url.split("?")[0] },
  //                   ]);
  //                 }
  //               });
  //           })
  //           .catch((err): void => {
  //             console.log("Error : ", handleAxiosResponseError(err));
  //           });
  //       } else {
  //         setMessage("only images accepted");
  //       }
  //     }
  //   }
  // };

  // const handleImageInputClick = (): void => {
  //   const current = imageRef.current;
  //   if (current) current.click();
  // };

  const handleAddProduct = async (data: any): Promise<void> => {
    // console.log(data);
    setBtnClick(true);

    const postData = {
      ...data,
      // startDate: DateFormateWithDash(data.startDate),
      // endDate: DateFormateWithDash(data.endDate),
    };

    console.log(postData);

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/coupon`, postData)
      .then(({ data }): void => {
        console.log(data);
        setCoupons((prev: any) => [...prev, data.newCoupon]);
        toast.success(data.message);
        reset();
        setBtnClick(false);
        setSideBarDisplay(false);
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
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px]  p-1 px-3 flex justify-between items-center">
          <div>
            <div>Add Coupon</div>
            <div>Add your Coupon and necessary information from here</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarDisplay(false)}
          >
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleAddProduct)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}
            {/* <div className="grid grid-cols-3 cursor-pointer">
              <div>Coupon Banner Image</div>
              <div className="col-span-2">
                <div
                  className="py-4 border border-dashed border-[#A09F9A] text-center"
                  onClick={handleImageInputClick}
                >
                  <input
                    type="file"
                    onChange={handleFile}
                    ref={imageRef}
                    className="hidden"
                    multiple
                    name="files[]"
                  />
                  <div>U</div>
                  <div>Drag your image here</div>
                  <div className="text-sm text-[#A09F9A]">
                    (Only *.jpeg and *.png images will be accepted)
                  </div>
                </div>
                {message.length ? (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {message}
                  </p>
                ) : (
                  <></>
                )}

                <div className="flex gap-2 mt-2">
                  {files?.map((file: any, key: number) => {
                    return (
                      <div
                        key={key}
                        className="h-16 flex items-center justify-between rounded p-3"
                      >
                        <div className="flex flex-row items-center gap-2">
                          <div className="relative h-12 w-12 ">
                            <Image
                              src={file.imagePointer}
                              layout="fill"
                              alt="aws"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div> */}

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
              className="bg-[#24262D] w-5/12 py-1 rounded-md"
              onClick={(): void => setSideBarDisplay(false)}
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
                "Add Coupon"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCoupon;
