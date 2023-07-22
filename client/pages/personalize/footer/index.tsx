import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface FooterProps {
  product: any;
  exportAsImage: any;
  handleOrder: () => void;
  frontImageRef: any;
  backImageRef: any;
  isLightTheme: boolean;
  isThreed: boolean;
}

const Footer: FC<FooterProps> = ({
  product,
  exportAsImage,
  handleOrder,
  frontImageRef,
  backImageRef,
  isLightTheme,
  isThreed,
}) => {
  return (
    <div
      className={`flex z-10 justify-between ${
        isLightTheme ? "bg-[#FDF3EB]" : "bg-[#14181B]"
      }  mt-auto `}
    >
      {/* Footer Left section */}
      <div className="flex items-center">
        {/* <div className="border border-wight rounded flex px-4 py-2 justify-center items-center m-5 h-fit">
            <Image
              src="/icons/logo.png"
              width="30"
              height="33"
              layout="intrinsic"
              alt="logo"
            />
            <div className="mx-2"> Add Products</div>
          </div> */}

        <div className="flex">
          <div className="border-r border-whight my-3  p-2">
            <div className="bg-[#282B2E] p-2">
              <Image
                src={
                  product.media
                    ? product.media[0].imagePointer
                    : "/images/blank.jpg"
                }
                width="30"
                height="53"
                alt="bottle"
              />
            </div>
          </div>

          <div className="grid w-full p-2">
            <div className="flex flex-col justify-between w-full self-center ">
              <span className="text-[12px]">{product?.bottleName}</span>
              <Link href={"/product"}>change Product</Link>
            </div>
          </div>
        </div>
      </div>
      {/* End of footer left section */}
      {/* Footer right section */}
      <div className="flex gap-10 mx-5">
        {/* Button 2 */}
        <div
          className={`border border-wight rounded ${
            isThreed ? "hidden" : "flex"
          } items-center self-center h-fit justify-around px-10 py-2 cursor-pointer hover:bg-slate-700 w-12`}
          onClick={() =>
            exportAsImage(frontImageRef.current, backImageRef.current)
          }
        >
          Preview
        </div>
        <div
          className="border border-wight rounded items-center self-center h-fit p-2 hover:bg-slate-700 hover:rounded cursor-pointer"
          onClick={handleOrder}
        >
          Checkout
        </div>
        {/* End of Button 3 */}
      </div>
      {/* End of Footer right section */}
    </div>
  );
};

export default Footer;
