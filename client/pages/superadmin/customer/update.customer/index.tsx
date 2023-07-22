import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import Spinner from "components/Spinner";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { UserUpdate } from "model/user.model";
import { CustomerSchemaUpdate } from "schemas/user.schema";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const curryear = new Date().getFullYear();

const years = Array.from(
  new Array(100),
  (val, index): number => curryear - index
);

interface UpdateCustomerProps {
  sideBarDisplay: boolean;
  setSideBarDisplay: Function;
  customer: any;
  setCustomers: Function;
  setAllCustomers: Function;
}

const UpdateCustomer: React.FC<UpdateCustomerProps> = ({
  sideBarDisplay,
  setSideBarDisplay,
  customer,
  setCustomers,
  setAllCustomers,
}) => {
  const [btnClick, setBtnClick] = useState(false);
  const {
    firstName,
    lastName,
    city,
    state,
    zipCode,
    userEmail,
    phone,
    dateOfBirth,
    shippingAddress,
    gender,
  } = customer;

  const [defaultData, setDefaultData] = useState({
    firstName,
    lastName,
    city,
    state,
    zipCode,
    userEmail,
    phone,
    day: Number(dateOfBirth?.split("-")[0]),
    month: Number(dateOfBirth?.split("-")[1]),
    year: Number(dateOfBirth?.split("-")[2]),
    shippingAddress,
    gender,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: joiResolver(CustomerSchemaUpdate, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
    defaultValues: useMemo(() => {
      return defaultData;
    }, [defaultData]),
  });

  useEffect(() => {
    reset(defaultData);
  }, [reset, defaultData]);

  useEffect(() => {
    if (customer?.customerId)
      setDefaultData({
        firstName: customer?.firstName,
        lastName: customer?.lastName,
        city: customer?.city,
        state: customer?.state,
        zipCode: customer?.zipCode,
        userEmail: customer?.userEmail,
        phone: customer?.phone,
        day: Number(customer?.dateOfBirth?.split("-")[0]),
        month: Number(customer?.dateOfBirth?.split("-")[1]),
        year: Number(customer?.dateOfBirth?.split("-")[2]),
        shippingAddress: customer?.shippingAddress,
        gender: customer?.gender,
      });

    return () => {
      setDefaultData({
        firstName: "",
        lastName: "",
        city: "",
        state: "",
        zipCode: "",
        userEmail: "",
        phone: "",
        day: 0,
        month: 0,
        year: 0,
        shippingAddress: "",
        gender: "",
      });
    };
  }, [customer]);

  const handleCustomerUpdate = (data: UserUpdate) => {
    const dateOfBirth = `${data.day}-${data.month}-${data.year}`;
    setBtnClick(true);
    const postData = {
      ...data,
      dateOfBirth,
    };
    console.log(postData);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/customer/profile/${customer.customerId}`,
        postData
      )
      .then(({ data }) => {
        console.log(data);
        setCustomers((cust: any) =>
          cust.map((item: any) =>
            item.customerId === customer.customerId
              ? { ...item, ...data.newCustomer }
              : item
          )
        );
        setAllCustomers((cust: any) =>
          cust.map((item: any) =>
            item.customerId === customer.customerId
              ? { ...item, ...data.newCustomer }
              : item
          )
        );
        toast.success(data.message);
        reset();
        setBtnClick(false);
      })
      .catch((err) => {
        setBtnClick(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <>
      <div
        className={`h-screen overflow-y-auto absolute top-0 right-0 w-3/6  text-white ease-in-out duration-300 bg-[#14181B]  ${
          sideBarDisplay == true ? "translate-x-0" : "translate-x-full hidden"
        } `}
      >
        <div className="h-[64px]  p-1 px-3 flex justify-between items-center">
          <div>
            <div>Update Customer</div>
          </div>

          <div
            className="cursor-pointer"
            onClick={(): void => setSideBarDisplay(false)}
          >
            X
          </div>
        </div>

        {/* Inputs section */}
        <form onSubmit={handleSubmit(handleCustomerUpdate)}>
          <div className="bg-[#24262D] px-6 py-8">
            {/* INput 1 */}

            <div className="grid grid-cols-3 my-5">
              <div>First Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Last Name</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Email</div>
              <div className="col-span-2">
                <input
                  type="email"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("userEmail")}
                />
                {errors.userEmail && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.userEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Phone</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Gender</div>
              <div className="col-span-2">
                <div id="gender" className="flex items-center pt-2">
                  <div className="mr-2 flex items-center">
                    <label htmlFor="male" className={`mr-1 `}>
                      Male
                    </label>
                    <input
                      type="radio"
                      id="male"
                      value="male"
                      {...register("gender")}
                    />
                  </div>
                  <div className="ml-2 flex items-center">
                    <label htmlFor="female" className="mr-1">
                      Female
                    </label>
                    <input
                      type="radio"
                      id="female"
                      value="female"
                      {...register("gender")}
                    />
                  </div>
                  {errors.gender && (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 my-5">
              <div>Date of Birth</div>
              <div className="col-span-2">
                <div>
                  <select
                    id="day"
                    className="w-full bg-transparent rounded border border-white rounded-0 p-2"
                    {...register("day")}
                  >
                    <option value="" className="bg-black">
                      Day
                    </option>
                    {days.map((day, key) => {
                      return (
                        <option
                          value={`${day}`}
                          className="bg-black text-white"
                          key={key}
                        >
                          {day}
                        </option>
                      );
                    })}
                  </select>
                  {errors.day && (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors.day.message}
                    </p>
                  )}
                </div>
                {/* Input groud - last Name */}
                <div>
                  <select
                    id="selectmonth"
                    className="w-full bg-transparent rounded border border-white rounded-0 p-2"
                    {...register("month")}
                  >
                    <option value="" className="bg-black">
                      Month
                    </option>
                    {months.map((month, key) => {
                      return (
                        <option
                          value={`${key + 1}`}
                          className="bg-black"
                          key={key}
                        >
                          {month}
                        </option>
                      );
                    })}
                  </select>
                  {errors.month && (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors.month.message}
                    </p>
                  )}
                </div>
                {/* Input grid - Year */}
                <div>
                  <select
                    id="selectyear"
                    className="w-full bg-transparent rounded border border-white rounded-0 p-2"
                    {...register("year")}
                    // defaultValue={"year"}
                  >
                    <option value="" className="bg-black">
                      Year
                    </option>
                    {years.map((yer, index) => {
                      return (
                        <option
                          key={`year${index}`}
                          value={yer}
                          className="bg-black"
                        >
                          {yer}
                        </option>
                      );
                    })}
                  </select>
                  {errors.year && (
                    <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 my-5">
              <div>Shipping Address</div>
              <div className="col-span-2">
                <input
                  type="text"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("shippingAddress")}
                />
                {errors.shippingAddress && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.shippingAddress.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 my-5">
              <div>City</div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="city"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 my-5">
              <div>State</div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="region"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 my-5">
              <div>ZIP / Postal</div>
              <div className="col-span-2">
                <input
                  type="text"
                  id="postal-code"
                  className="mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border border-white rounded bg-transparent"
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                    {errors.zipCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* End buttons section */}
          <div className="flex justify-around py-6 px-4">
            <button
              type="button"
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
                "Update Customer"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCustomer;
