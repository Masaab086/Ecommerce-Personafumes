import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { LoginSchema } from "../../schemas/login.schema";
import { LoginFormModel } from "../../model/login.form";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { handleAxiosResponseError } from "../../utils";
import { useAppDispatch } from "../../store/hooks";
import { authActions } from "../../store/slices/auth.slice";
import { userActions } from "../../store/slices/user.slice";
import Link from "next/link";
import { toast } from "react-toastify";
import { adminActions } from "store/slices/admin.slice";
import { useRouter } from "next/router";

interface LoginFormProps {
  isLightTheme: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ isLightTheme }) => {
  const dispatch = useAppDispatch();
  // const currentUser = useAppSelector((state) => state.user.currentUser);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [clickLog, setClickLog] = useState<boolean>();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormModel>({
    resolver: joiResolver(LoginSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const handleLogin = handleSubmit((data): void => {
    setClickLog(true);
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, data)
      .then(({ data }): void => {
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        dispatch(authActions.setJWT(data.jwt));
        if (data.user.customerId) {
          dispatch(
            userActions.setUserState({
              currentUser: data.user,
              userLoading: "loaded",
            })
          );

          router.push("/user/account");
        } else {
          dispatch(
            adminActions.setCurrentUser({
              currentAdmin: data.user,
            })
          );
          if (data.user.role === "superadmin")
            router.push("/superadmin/reports");
          else if (data.user.role === "admin") router.push("/admin/reports");
          else if (data.user.role === "customerservice")
            router.push("/customerservice/reports");
          else if (data.user.role === "supplier")
            router.push("/supplier/order");
        }
        toast.success(data.message);
        console.log(data);
        setClickLog(false);
      })
      .catch((err): void => {
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        setClickLog(false);
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  });

  return (
    <div className="flex justify-center pt-5 h-auto lg:w-2/4 w-full">
      <form
        className={`grid grid-cols-1 w-4/5 lg:w-4/5 xl:w-4/5 ${
          isLightTheme ? "text-black" : "text-white"
        }`}
        onSubmit={handleLogin}
      >
        <span className="text-2xl font-bold">Login here</span>
        <p className="w-4/5 text-sm">
          Enter your e-mail and password to accrss the My Account section.
        </p>

        <span className="text-red-600 ">*Required Fields</span>

        {/* userName input  group with label*/}
        <div>
          <label className="text-sm" htmlFor="userEmail">
            EMAIL ADDRESS *
          </label>
          <br />
          <input
            type="email"
            id="userEmail"
            className={`p-2 text-lg rounded-0 bg-transparent border w-full my-1 ${
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

        {/* Passwod input  group with label*/}
        <div>
          <label className="text-sm" htmlFor="userPassword">
            PASSWORD *
          </label>
          <br />
          <input
            type="password"
            id="userPassword"
            className={`p-2 text-lg rounded-0 bg-transparent border w-full my-1 ${
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

        {/* Forgooten password link */}
        <Link
          href="/forgetpassword"
          className="underline text-sm text-end my-5"
        >
          FORFOT YOUR PASSWORD?
        </Link>

        {/* Login Button */}
        <button
          type="submit"
          className={`w-full h-12 p-1 text-center font-semibold disabled:cursor-not-allowed ${
            isLightTheme
              ? "bg-[#865D4C] text-white"
              : "bg-yellow-200 text-black"
          }`}
          ref={submitButtonRef}
        >
          {clickLog ? <CircularProgress color="inherit" /> : "Log In"}
        </button>

        {/* Border */}
        <div className="mt-14">
          <hr className="border-white w-full " />
        </div>

        <div
          className={`text-xl text-center ${
            isLightTheme
              ? "bg-[#865D4C] text-white"
              : "bg-yellow-200 text-black"
          }`}
        >
          <Link href="/register">New User</Link>
        </div>
        <p className=" text-sm">
          Create an account and discover all the benefits reserved for our
          registered users.
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
