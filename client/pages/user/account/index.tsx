import type { NextPage } from "next";
import React, { useEffect, useRef, useState } from "react";
import Header from "components/Header";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useRouter } from "next/router";
import axios from "config/axios";
import Spinner from "components/Spinner";
import { handleAxiosResponseError } from "utils";
import UserSidebar from "components/user.sidebar";
import { useForm } from "react-hook-form";
import { MainUser, User } from "model/user.model";
import { joiResolver } from "@hookform/resolvers/joi";
import { CustomerSchema } from "schemas/user.schema";
import ChangePassword from "./change.password";
import { toast } from "react-toastify";
import { userActions } from "store/slices/user.slice";

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

interface AccountProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Account: NextPage<AccountProps> = ({ products, isLightTheme }) => {
  const auth = useAppSelector((state) => state.auth.jwt);
  const user = useAppSelector((state) => state.user.currentUser);
  const router = useRouter();
  const curryear = new Date().getFullYear();
  const imageRef = useRef<any>(null);
  const [profile, setProfile] = useState<any>(user?.profile);
  const [message, setMessage] = useState<string>("");
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MainUser>({
    resolver: joiResolver(CustomerSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      city: user?.city,
      state: user?.state,
      zipCode: user?.zipCode,
      day: Number(user?.dateOfBirth?.split("-")[0]),
      month: Number(user?.dateOfBirth?.split("-")[1]),
      year: Number(user?.dateOfBirth?.split("-")[2]),
      shippingAddress: user?.shippingAddress,
      gender: user?.gender,
    },
  });

  const years = Array.from(
    new Array(100),
    (val, index): number => curryear - index
  );

  if (!auth || auth === "logged_out") router.push("/");

  useEffect(() => {
    if (!auth || auth === "logged_out") router.push("/");
  }, [auth, router]);

  const handleFile = (e: any): void => {
    setMessage("");
    const target = e.target as HTMLInputElement;

    if (target.files && target.files.length) {
      let file: FileList = target.files;

      for (let i = 0; i < file.length; i++) {
        const fileType = file[i]["type"];
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (validImageTypes.includes(fileType)) {
          axios
            .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/profile`)
            .then(({ data }): void => {
              let options = {
                method: "PUT",
                headers: {
                  "Content-Type": fileType,
                },
                body: file[0],
              };

              fetch(data.secureUrl, options) //api for the get request
                .then((response): void => {
                  if (response.status === 200) {
                    console.log(response.url.split("?")[0]);
                    setProfile(response.url.split("?")[0]);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err): void => {
              console.log("Error : ", handleAxiosResponseError(err));
            });
        } else {
          setMessage("only images accepted");
        }
      }
    }
  };

  const handleImageInputClick = (): void => {
    const current = imageRef.current;
    if (current) current.click();
  };

  const handleCustomerUpdate = (data: MainUser) => {
    const dateOfBirth = `${data.day}-${data.month}-${data.year}`;

    const postData = {
      // ...user,
      ...data,
      profile: profile
        ? profile
        : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      dateOfBirth,
    };
    console.log(postData);

    axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/profile`,
        postData
      )
      .then(({ data }) => {
        console.log(data);
        toast.success(data.message);
        dispatch(
          userActions.setCurrentUser({
            currentUser: data.customer,
          })
        );
      })
      .catch((err) => {
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

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
      {/* <div className="bg-black font-Raleway text-white h-screen container mx-auto"> */}
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex">
        <div className={`w-96 mx-auto ${isLightTheme ? "bg-[#FDF3EB]" : ""}`}>
          <div className="w-full">
            <h1 className="text-2xl my-5">My account</h1>

            <h3 className="my-5 text-xl">
              Welcome {user?.firstName}, {user?.lastName}{" "}
            </h3>

            {/* Navitems */}
            <UserSidebar active={4} isLightTheme={isLightTheme} />
            {/* End of Navitems */}
          </div>
        </div>

        <div className="h-[calc(100vh-70px)] w-full overflow-y-auto">
          <div className="mt-5 text-2xl">
            <h1>Personal Information</h1>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(handleCustomerUpdate)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div
                      className="col-span-6 sm:col-span-3 py-4 border border-dashed border-[#A09F9A] text-center cursor-pointer"
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
                      <div>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>Upload Profile Image</div>
                      <div className="text-sm text-[#A09F9A]">
                        (Only *.jpeg and *.png images will be accepted)
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      {profile && (
                        <div className="relative w-32 h-full mx-auto">
                          <Image src={profile} alt="image" fill />
                        </div>
                      )}
                    </div>
                    {message && (
                      <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                        {message}
                      </p>
                    )}
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-white"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-white"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-white"
                      >
                        Email address
                      </label>
                      <input
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        readOnly
                        value={user?.userEmail}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-white"
                      >
                        Phone
                      </label>
                      <input
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        readOnly
                        value={user?.phone}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-5">
                      <label htmlFor="">Date of Birth</label>
                      <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
                        {/* Input  - Day */}
                        <div>
                          <select
                            id="day"
                            className={`w-full bg-transparent rounded border rounded-0 p-2 ${
                              isLightTheme ? "border-[#865D4C]" : "border-white"
                            }`}
                            defaultValue={user?.day}
                            {...register("day")}
                          >
                            <option
                              value=""
                              className={`${
                                isLightTheme
                                  ? "bg-[#865D4C] text-white"
                                  : "bg-black text-white"
                              }`}
                            >
                              Day
                            </option>
                            {days.map((day, key) => {
                              return (
                                <option
                                  value={`${day}`}
                                  className={`${
                                    isLightTheme
                                      ? "bg-[#865D4C] text-white"
                                      : "bg-black text-white"
                                  }`}
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
                            className={`w-full bg-transparent rounded border rounded-0 p-2 ${
                              isLightTheme ? "border-[#865D4C]" : "border-white"
                            }`}
                            {...register("month")}
                          >
                            <option
                              value=""
                              className={`${
                                isLightTheme
                                  ? "bg-[#865D4C] text-white"
                                  : "bg-black text-white"
                              }`}
                            >
                              Month
                            </option>
                            {months.map((month, key) => {
                              return (
                                <option
                                  value={`${key + 1}`}
                                  className={`${
                                    isLightTheme
                                      ? "bg-[#865D4C] text-white"
                                      : "bg-black text-white"
                                  }`}
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
                            className={`w-full bg-transparent rounded border rounded-0 p-2 ${
                              isLightTheme ? "border-[#865D4C]" : "border-white"
                            }`}
                            {...register("year")}
                            // defaultValue={"year"}
                          >
                            <option
                              value=""
                              className={`${
                                isLightTheme
                                  ? "bg-[#865D4C] text-white"
                                  : "bg-black text-white"
                              }`}
                            >
                              Year
                            </option>
                            {years.map((yer, index) => {
                              return (
                                <option
                                  key={`year${index}`}
                                  value={yer}
                                  className={`${
                                    isLightTheme
                                      ? "bg-[#865D4C] text-white"
                                      : "bg-black text-white"
                                  }`}
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

                    <div className="col-span-6 sm:col-span-1">
                      <label htmlFor="gender">Gender</label>
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

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-white"
                      >
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        id="street-address"
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        {...register("shippingAddress")}
                      />
                      {errors.shippingAddress && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.shippingAddress.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-white"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.city.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-white"
                      >
                        State / Province
                      </label>
                      <select
                        className={`form-select appearance-none block w-6/12 px-3 py-1.5 font-normal bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none ${
                          isLightTheme
                            ? "bg-[#865D4C] text-white"
                            : "bg-black text-white"
                        } `}
                        aria-label="Default select example"
                        {...register("state")}
                      >
                        <option className="bg-transparent" value="">
                          Select State
                        </option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Federally Administered Tribal Areas">
                          Federally Administered Tribal Areas
                        </option>
                        <option value="Gilgit-Baltistan">
                          Gilgit-Baltistan
                        </option>
                        <option value="Islamabad Capital Territory">
                          Islamabad Capital Territory
                        </option>
                        <option value="Khyber Pakhtunkhwa">
                          Khyber Pakhtunkhwa
                        </option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                      </select>
                      {errors.state && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.state.message}
                        </p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-white"
                      >
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        id="postal-code"
                        className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                          isLightTheme ? "border-[#865D4C]" : "border-white"
                        }`}
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
                <div className="px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className={`inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-md font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      isLightTheme
                        ? "text-white bg-[#865D4C]"
                        : "text-black bg-yellow-200 hover:bg-yellow-400"
                    } `}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>

          <ChangePassword isLightTheme={isLightTheme} />
        </div>
      </div>
    </div>
  );
};

export default Account;
