import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "./../../config/axios";
import { RegisterFormModel } from "../../model/register.form";
import { handleAxiosResponseError } from "../../utils";
import { RegisterSchema } from "../../schemas/register.schema";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { authActions } from "../../store/slices/auth.slice";
// import { userActions } from "../../store/slices/user.slice";
import { toast } from "react-toastify";
// import { adminActions } from "store/slices/admin.slice";
import { useRouter } from "next/router";

interface RegisterFormProps {
  isLightTheme: boolean;
}

const Registerform: React.FC<RegisterFormProps> = ({ isLightTheme }) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  // const auth = useAppSelector((state) => state.auth.jwt);
  const [clickRegister, setClickRegister] = useState<boolean>();
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const curryear = new Date().getFullYear();
  const years = Array.from(
    new Array(100),
    (val, index): number => curryear - index
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormModel>({
    resolver: joiResolver(RegisterSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

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
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const handelRegister = handleSubmit((data): void => {
    setClickRegister(true);

    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }

    const dateOfBirth: string = data.day + "-" + data.month + "-" + data.year;

    const postData = {
      firstName: data.firstName,
      lastName: data.lastName,
      userEmail: data.userEmail,
      userPassword: data.userPassword,
      phone: data.phone,
      gender: data.gender,
      sendInfo: data.sendInfo,
      recordInfo: data.recordInfo,
      dateOfBirth,
    };

    localStorage.setItem("email", data.userEmail);
    localStorage.setItem("phone", data.phone);

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/signup`, postData)
      .then(({ data }): void => {
        console.log(data);
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        router.push("/verifyoption");
        console.log(data);
      })
      .catch((err): void => {
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        setClickRegister(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  });

  return (
    <div className="w-full lg:w-2/4 h-full ">
      <div
        className={`text-xl font-bold text-center w-full ${
          isLightTheme ? "text-black" : "text-white"
        }`}
      >
        Register
      </div>

      <form
        className={`grid grid-cols-1 gap-y-6 w-4/5 mx-auto h-fit ${
          isLightTheme ? "text-black" : "text-white"
        }`}
        onSubmit={handelRegister}
      >
        {/* Gender Selection */}
        <div className="">
          <label htmlFor="gender">Gender</label>
          <div id="gender" className="flex items-center">
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
          </div>
          {errors.gender && (
            <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
              {errors.gender.message}
            </p>
          )}
        </div>

        {/* Name entry */}
        <div className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
          {/* Input groud - First Name */}
          <div>
            <label htmlFor="firstname">First Name</label>
            <br />
            <input
              type="text"
              id="firstname"
              className={`w-full bg-transparent border rounded-0 p-2 ${
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
          <div>
            <label htmlFor="lasttname">Last Name</label>
            <br />
            <input
              type="text"
              id="lastname"
              className={`w-full bg-transparent border rounded-0 p-2 ${
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
        </div>

        {/* Date of birth input */}
        <div>
          <label htmlFor="">Date of Birth</label>
          <div className="grid lg:grid-cols-3 gap-x-6 gap-y-4">
            {/* Input  - Day */}
            <div>
              <select
                id="day"
                className={`w-full bg-transparent border rounded-0 p-2 ${
                  isLightTheme ? "border-[#865D4C]" : "border-white"
                }`}
                {...register("day")}
              >
                <option value="" className="bg-[#865D4C]">
                  Day 
                </option>
                {days.map((day, key) => {
                  return (
                    <option
                      value={`${day}`}
                      className={
                        isLightTheme
                          ? "bg-[#865D4C] text-white"
                          : "bg-black text-white"
                      }
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
                className={`w-full bg-transparent border rounded-0 p-2 ${
                  isLightTheme ? "border-[#865D4C]" : "border-white"
                }`}
                {...register("month")}
              >
                <option value="" className="bg-[#865D4C] text-white">
                  Month
                </option>
                {months.map((month, key) => {
                  return (
                    <option
                      value={`${key + 1}`}
                      className={
                        isLightTheme
                          ? "bg-[#865D4C] text-white"
                          : "bg-black text-white"
                      }
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
                className={`w-full bg-transparent border rounded-0 p-2 ${
                  isLightTheme ? "border-[#865D4C]" : "border-white"
                }`}
                // defaultValue={"year"}
                {...register("year")}
              >
                <option value="" className="bg-[#865D4C] text-white">
                  Year
                </option>
                {years.map((yer, index) => {
                  return (
                    <option
                      key={`year${index}`}
                      value={yer}
                      className={
                        isLightTheme
                          ? "bg-[#865D4C] text-white"
                          : "bg-black text-white"
                      }
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

        {/* Email entry */}
        <div className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
          {/* Input groud - email */}
          <div>
            <label htmlFor="email">Email Address</label>
            <br />
            <input
              type="email"
              id="email"
              className={`w-full bg-transparent border rounded-0 p-2 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
              {...register("userEmail")}
            />
            {errors.userEmail && (
              <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                {errors.userEmail.message}
              </p>
            )}
          </div>

          {/* Input groud - Confirm email */}
          <div>
            <label htmlFor="phone">Phone #</label>
            <br />
            <input
              type="phone"
              className={`w-full bg-transparent border rounded-0 p-2 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        {/* Password entry */}
        <div className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
          {/* Input groud - password */}
          <div>
            <label htmlFor="email">Password</label>
            <br />
            <input
              type="password"
              id="password"
              className={`w-full bg-transparent border rounded-0 p-2 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
              {...register("userPassword")}
            />
            {errors.userPassword && (
              <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                {errors.userPassword.message}
              </p>
            )}
          </div>

          {/* Input groud - Confirm email */}
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <br />
            <input
              type="password"
              id="confirmPassword"
              className={`w-full bg-transparent border rounded-0 p-2 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Password Secure link */}

        <a href="" className="text-lg underline">
          HOW TO MAKE YOUR PASSWORD SECURE
        </a>

        <p className="">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </p>

        <div className="flex">
          <input
            type="checkbox"
            className="mr-2 mt-2"
            {...register("sendInfo")}
          />

          <p>
            After having read the Privacy Policy, I agree to have my personal
            data processed by Giorgio Armani S.p.A. and its affiliated entities
            worldwide for marketing purposes - sending information about Armani
            promotions and news via newsletter.
          </p>
        </div>
        <div className="flex">
          <input
            type="checkbox"
            className="mr-2 mt-2"
            {...register("recordInfo")}
          />
          <p>
            After having read the Privacy Policy, I agree to have my data
            processed by Giorgio Armani S.p.A. and its affiliated entities
            worldwide to record and analyze my preferences (profiling).
          </p>
        </div>

        <button
          ref={submitButtonRef}
          type="submit"
          className="h-10 w-20 bg-yellow-200 font-bold text-black w-fit justify-self-center rounded-1"
        >
          {clickRegister ? <CircularProgress color="inherit" /> : "Register"}
          {/* <CircularProgress color="inherit" /> */}
        </button>
      </form>
    </div>
  );
};

export default Registerform;
