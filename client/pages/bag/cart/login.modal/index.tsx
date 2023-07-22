import { joiResolver } from "@hookform/resolvers/joi";
import { LoginFormModel } from "model/login.form";
import { useRef } from "react";
import { LoginSchema } from "schemas/login.schema";
import axios from "config/axios";
import { authActions } from "store/slices/auth.slice";
import { userActions } from "store/slices/user.slice";
import { handleAxiosResponseError } from "utils";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "store/hooks";
import { toast } from "react-toastify";
import Link from "next/link";

interface LoginModalProps {
  setShowModal: Function;
}

const LoginModal: React.FC<LoginModalProps> = ({ setShowModal }) => {
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
  const dispatch = useAppDispatch();
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleLogin = handleSubmit((data): void => {
    // setClickLog(true);
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true;
    }

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, data)
      .then(({ data }): void => {
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        dispatch(authActions.setJWT(data.jwt));
        dispatch(
          userActions.setUserState({
            currentUser: data.user,
            userLoading: "loaded",
          })
        );
        setShowModal(false);
        // console.log(data);
        // setClickLog(false);
      })
      .catch((err): void => {
        if (submitButtonRef.current) submitButtonRef.current.disabled = false;
        toast.error(handleAxiosResponseError(err));
        // setClickLog(false);
        console.log(handleAxiosResponseError(err));
      });
  });
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-96 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={() => setShowModal(false)}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                Sign in to our platform
              </h3>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    {...register("userEmail")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Your password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    {...register("userPassword")}
                  />
                </div>
                <div className="flex justify-between">
                  <a
                    href="#"
                    className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:cursor-not-allowed"
                  ref={submitButtonRef}
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 ">
                  Not registered?{" "}
                  <Link
                    href={"/register"}
                    className="text-blue-700 hover:underline"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default LoginModal;
