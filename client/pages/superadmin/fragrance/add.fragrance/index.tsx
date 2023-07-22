import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddFragranceModal } from "model/add.product";
import { joiResolver } from "@hookform/resolvers/joi";
import { AddFragranceSchema } from "schemas/add.product.schema";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";

interface AddProductProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  setAllFragrances: Function;
}

const AddFragrance: React.FC<AddProductProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  setAllFragrances,
}) => {
  const [btnClick, setBtnClick] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddFragranceModal>({
    resolver: joiResolver(AddFragranceSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const handleAddProduct = (data: any) => {
    setBtnClick(true);

    console.log(data);
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/fragrance`, data)
      .then(({ data }): void => {
        console.log(data);
        setAllFragrances((prev: any) => [...prev, data.fragrance]);
        toast.success(data.message);
        setSideBarDisplay(false);
        setBtnClick(false);
        reset();
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
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6 text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px] p-1 px-3 flex justify-between items-center">
          <div>
            <div>Add Fragrance</div>
            <div>Add your fragrance and necessary information from here</div>
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

            <div className="grid grid-cols-3 my-5">
              <div>Fragrance Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none bg-transparent px-4 py-1"
                  placeholder="Fragrance Name"
                  {...register("fragranceName")}
                />
                {errors.fragranceName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.fragranceName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Gender</div>
              <div className="col-span-2">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 font-normal bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  aria-label="Default select example"
                  {...register("gender")}
                >
                  <option value="Men" className="bg-black">
                    Men
                  </option>
                  <option value="Women" className="bg-black">
                    Women
                  </option>
                  <option value="Unisex" className="bg-black">
                    Unisex
                  </option>
                </select>
                {errors.gender && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Inspiration</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="inspiration"
                  {...register("inspiration")}
                />
                {errors.inspiration && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.inspiration.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Target</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="target"
                  {...register("target")}
                />
                {errors.target && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.target.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Unit Cost</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="unitCost"
                  {...register("unitCost")}
                />
                {errors.unitCost && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.unitCost.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Unit of Measure</div>
              <div className="col-span-2">
                <select
                  className="form-select appearance-none block w-full px-3 py-1.5 font-normal bg-transparent bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none"
                  aria-label="Default select example"
                  {...register("unitOfMeasure")}
                >
                  <option value="ML" className="bg-black">
                    Mili-liter
                  </option>
                  <option value="LTR" className="bg-black">
                    Liter
                  </option>
                </select>
                {errors.unitOfMeasure && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.unitOfMeasure.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Available unites</div>
              <div className="col-span-2">
                <input
                  type="number"
                  className="w-full border rounded border-[#626366] outline-none  bg-transparent px-4 py-1"
                  placeholder="unites"
                  {...register("availableUnites")}
                />
                {errors.availableUnites && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.availableUnites.message}
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
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#DBC864] text-black rounded-md w-5/12 py-1"
            >
              {btnClick ? (
                <Spinner className="mx-auto  h-8 w-8 text-gray-800" />
              ) : (
                "Add Fragrance"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFragrance;
