import { joiResolver } from "@hookform/resolvers/joi";
import Footer from "components/Footer";
import Header from "components/Header";
import { ForgetPasswordModel } from "model/register.form";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { ForgetPasswordSchema } from "schemas/login.schema";
import axios from "config/axios";
import { toast } from "react-toastify";
import { handleAxiosResponseError } from "utils";
import Link from "next/link";

interface ForgetProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const ForgetPassword: NextPage<ForgetProps> = ({ products, isLightTheme }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgetPasswordModel>({
    resolver: joiResolver(ForgetPasswordSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const handleUpdatePassword = (data: any) => {
    console.log(data);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/forgetpassword`,
        data
      )
      .then(({ data }) => {
        console.log(data);
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  return (
    <div className="bg-black h-full min-h-screen flex flex-col font-Raleway container mx-auto">
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex h-max m-auto pt-6 text-white">
        <div className="p-6 rounded-lg shadow border md:mt-0 sm:max-w-md bg-gray-800 border-gray-700 sm:p-8">
          <div className="px-8 mb-4 text-center">
            <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
            <p className="mb-4 text-sm">
              We get it, stuff happens. Just enter your email address below and
              we&apos;ll send you a link to reset your password!
            </p>
          </div>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit(handleUpdatePassword)}>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 text-black"
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <br />
            If not received : Check Spam Folder
            <div className="mb-6 text-center">
              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                Reset Password
              </button>
            </div>
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href={"/register"}>
                Create an Account!
              </Link>
            </div>
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href={"/login"}>
                Already have an account? Login!
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default ForgetPassword;
