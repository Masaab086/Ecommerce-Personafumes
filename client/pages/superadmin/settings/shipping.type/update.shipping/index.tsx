import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { ShippingTypeModal } from "model/sales.tax.modal";
import { ShippingSchema } from "schemas/shpping.schema";
import { Country, State } from "country-state-city";

interface UpdateShippingProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  setShippingData: Function;
  shipping: ShippingTypeModal;
}

const UpdateShipping: React.FC<UpdateShippingProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  setShippingData,
  shipping,
}) => {
  const [btnClick, setBtnClick] = useState(false);
  const allCountires: Array<any> = Country.getAllCountries();
  const [countryStates, setCountryStates] = useState<Array<any>>(
    State.getAllStates()
  );
  const [defaultData, setDefaultData] = useState<ShippingTypeModal>(shipping);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ShippingTypeModal>({
    resolver: joiResolver(ShippingSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: true,
    }),
    defaultValues: useMemo((): ShippingTypeModal => {
      return defaultData;
    }, [defaultData]),
  });

  useEffect(() => {
    setDefaultData(shipping);
    setCountryStates(State.getStatesOfCountry(shipping.country));
  }, [shipping]);

  useEffect(() => {
    reset(defaultData);
  }, [shipping, defaultData, reset]);

  const handleUpdateShipping = (data: ShippingTypeModal) => {
    console.log(data);
    setBtnClick(true);
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/shipping`, data)
      .then(({ data }) => {
        console.log(data);
        setBtnClick(false);
        toast.success(data.message);
        setShippingData((prev: ShippingTypeModal[]) =>
          prev.map((item: ShippingTypeModal) =>
            item.shippingTypeId === shipping.shippingTypeId
              ? data.shipping
              : item
          )
        );
        setSideBarDisplay(false);
      })
      .catch((err) => {
        setBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  // const handleCountry = (e: ChangeEvent) => {
  //   const target = e.target as HTMLSelectElement;

  //   if (target.value) {
  //     setValue(`country`, target.value);
  //     setCountryStates(State.getStatesOfCountry(target.value));
  //   }
  // };

  return (
    <>
      <div
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6 text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px] p-1 px-3 flex justify-between items-center">
          <div>
            <div>Update Shipping</div>
            <div>Update your shipping and necessary information from here</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarDisplay(false)}
          >
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleUpdateShipping)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}

            <div className="grid grid-cols-3 my-5">
              <div>Country</div>
              <div className="col-span-2">
                <div className="my-2 flex flex-col">
                  <select
                    className="bg-transparent w-full text-base px-2 py-1.5  border border-[#938E8E] rounded-md"
                    // value={country}
                    // onChange={handleCountry}
                    {...register(`country`)}
                  >
                    <option className="bg-black" value={""}>
                      Country
                    </option>
                    {allCountires.map((item, index) => (
                      <option
                        className="bg-black"
                        value={item.isoCode}
                        key={index}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.country ? (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors?.country.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>State</div>
              <div className="col-span-2">
                <div className="my-2 flex flex-col">
                  <select
                    className="bg-transparent w-full text-base px-2 py-1.5  border border-[#938E8E] rounded-md"
                    {...register(`state`)}
                  >
                    <option className="bg-black" value={""}>
                      State
                    </option>
                    {countryStates.map((item, index) => (
                      <option
                        className="bg-black"
                        value={item.name}
                        key={index}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {errors.state ? (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors?.state.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Shipping Type</div>
              <div className="col-span-2">
                <div className="my-2 flex flex-col">
                  <select
                    className="bg-transparent w-full text-base px-2 py-1.5  border border-[#938E8E] rounded-md"
                    // value={singleState}
                    // onChange={(e) => handleStates(e, index)}
                    {...register(`shippingType`)}
                  >
                    <option className="bg-black" value={""}>
                      Shipping Type
                    </option>
                    <option className="bg-black" value={"By Road"}>
                      By Road
                    </option>
                    <option className="bg-black" value={"By Air"}>
                      By Air
                    </option>
                  </select>
                  {errors.shippingType ? (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors?.shippingType.message}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Domestic Rate</div>
              <div className="col-span-2">
                <input
                  className="rounded bg-gray-700 border border-white p-1 w-full my-2"
                  {...register(`domesticRate`)}
                />
                {errors.domesticRate ? (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors?.domesticRate.message}
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Internation Rate</div>
              <div className="col-span-2">
                <input
                  className="rounded bg-gray-700 border border-white p-1 w-full my-2"
                  {...register(`internationalRate`)}
                />
                {errors.internationalRate ? (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors?.internationalRate.message}
                  </p>
                ) : (
                  <></>
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
                "Update Shipping"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateShipping;
