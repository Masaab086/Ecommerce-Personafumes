import {
  // GetServerSideProps,
  // InferGetServerSidePropsType,
  NextPage,
} from "next";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "store/hooks";
import { bagActions } from "store/slices/bag.slice";
import Link from "next/link";
import Header from "components/Header";
import Footer from "components/Footer";

interface SuccessProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Success: NextPage<SuccessProps> = ({ products, isLightTheme }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bagActions.clearBag());
  }, [dispatch]);

  return (
    <div className="bg-black h-full min-h-screen flex flex-col font-Raleway container mx-auto">
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="flex flex-col h-max m-auto pt-6 text-white">
        <div className="bg-[#161616] p-6">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-white font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-white my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                href={"/"}
              >
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default Success;
