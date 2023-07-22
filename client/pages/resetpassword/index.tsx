import { joiResolver } from "@hookform/resolvers/joi";
import Footer from "components/Footer";
import Header from "components/Header";
import { ResetPasswordModel } from "model/register.form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ResetPasswordSchema } from "schemas/login.schema";
import { handleAxiosResponseError } from "utils";
import axios from "config/axios";

interface ResetProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const ResetPassword: NextPage<ResetProps> = ({ products, isLightTheme }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordModel>({
    resolver: joiResolver(ResetPasswordSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const router = useRouter();
  const { token, id } = router.query;

  const handleUpdatePassword = (data: any) => {
    if (id && token) {
      const postData = { id, token, ...data };
      axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/forgetpassword/verify`,
          postData
        )
        .then(({ data }): void => {
          console.log(data);
          // setClickRegister(false);
          toast.success(data.message);
        })
        .catch((err): void => {
          console.log(handleAxiosResponseError(err));
          toast.error(handleAxiosResponseError(err));
        });
    }
  };

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } h-full min-h-screen flex flex-col font-Raleway container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex h-max m-auto pt-6">
        <div
          className={`w-80 p-6 rounded-lg shadow border md:mt-0 sm:max-w-md  border-gray-700 sm:p-8 ${
            isLightTheme ? "bg-[#FDF3EB]" : "bg-gray-800"
          }`}
        >
          <h2 className="mb-1 text-xl font-bold md:text-2xl">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(handleUpdatePassword)}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-black"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium"
              >
                Confirm password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 text-black"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default ResetPassword;
