import { joiResolver } from "@hookform/resolvers/joi";
import { ChangePassword } from "model/user.model";
import { ChangePasswordSchema } from "schemas/user.schema";
import { useForm } from "react-hook-form";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { useAppDispatch } from "store/hooks";
import { authActions } from "store/slices/auth.slice";

interface ChangePasswordProps {
  isLightTheme: boolean;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ isLightTheme }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: joiResolver(ChangePasswordSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: false,
    }),
  });

  const handleChangePassword = (data: ChangePassword) => {
    console.log(data);

    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/password`, data)
      .then(({ data }) => {
        console.log(data);
        toast.success(data.message);
        dispatch(authActions.setJWT(data.jwt));
      })
      .catch((err) => {
        toast.error(handleAxiosResponseError(err));
        console.log(handleAxiosResponseError(err));
      });
  };

  return (
    <div>
      <div className="mt-5 text-2xl">
        <h1>Change Password</h1>
      </div>

      <div className="px-4 py-5 sm:p-6">
        <form onSubmit={handleSubmit(handleChangePassword)}>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="currentPassword"
                className={`block text-sm font-medium  ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                Current Password
              </label>
              <input
                type="text"
                id="currentPassword"
                className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                  isLightTheme ? "border-[#865D4C]" : "border-white"
                }`}
                {...register("currentPassword")}
              />
              {errors.currentPassword && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="newPassword"
                className={`block text-sm font-medium  ${
                  isLightTheme ? "text-black" : "text-white"
                }`}
              >
                New Password
              </label>
              <input
                type="text"
                id="newPassword"
                className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
                  isLightTheme ? "border-[#865D4C]" : "border-white"
                }`}
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="text"
                id="confirmPassword"
                className={`mt-1 p-1 h-10 block w-full shadow-sm sm:text-sm border rounded bg-transparent ${
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
          <div className="px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className={`inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-md font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                isLightTheme
                  ? "text-white bg-[#865D4C]"
                  : "bg-yellow-200 text-black hover:bg-yellow-400"
              }`}
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
