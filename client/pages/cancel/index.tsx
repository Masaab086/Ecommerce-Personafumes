import Footer from "components/Footer";
import Header from "components/Header";
import { NextPage } from "next";
import Link from "next/link";

interface CancelProps {
  products: Array<any>;
  isLightTheme: boolean;
}

const Cancel: NextPage<CancelProps> = ({ products, isLightTheme }) => {
  return (
    <div className="bg-black w-full h-full min-h-screen flex flex-col font-Raleway container mx-auto">
      <Header products={products} isLightTheme={isLightTheme} />

      <div className="w-full h-max m-auto pt-6 text-white">
        <div className="bg-[#161616] p-6">
          <svg
            height="32"
            className="mx-auto w-32 h-32"
            // style="overflow:visible;enable-background:new 0 0 32 32"
            viewBox="0 0 32 32"
            width="32"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <g>
              <g id="Error_1_">
                <g id="Error">
                  <circle
                    cx="16"
                    cy="16"
                    id="BG"
                    r="16"
                    style={{ fill: "#D72828" }}
                  />
                  <path
                    d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z"
                    id="Exclamatory_x5F_Sign"
                    style={{ fill: "#E6E6E6" }}
                  />
                </g>
              </g>
            </g>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-white font-semibold text-center">
              Payment Error!
            </h3>
            <p className="text-white my-2">Please Try Again Later.</p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link
                href={"/"}
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
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

export default Cancel;
