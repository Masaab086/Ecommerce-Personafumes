import Button from "components/Button";
import Displaycard from "components/Displaycard";
import Image from "next/image";
import Link from "next/link";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { toast } from "react-toastify";
import { SalesTaxDataModal } from "model/sales.tax.modal";
import { GrSecure } from "react-icons/gr";
import { TbArrowsRightLeft } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard, FaCcPaypal } from "react-icons/fa";

interface ShoppingBagProps {
  bag: Array<any>;
  products: Array<any>;
  dispatch: any;
  bagActions: any;
  totalPrice: number;
  setCoupon: Function;
  coupon: number;
  handleTabChange: Function;
  code: string;
  setCode: Function;
  setSingleProduct: Function;
  setIsTab1: Function;
  shippingCost: number;
  salesTaxData: SalesTaxDataModal;
  isLightTheme: boolean;
}

const ShoppingBag: React.FC<ShoppingBagProps> = ({
  bag,
  products,
  dispatch,
  bagActions,
  totalPrice,
  setCoupon,
  coupon,
  handleTabChange,
  code,
  setCode,
  setSingleProduct,
  setIsTab1,
  shippingCost,
  salesTaxData,
  isLightTheme,
}) => {
  // const [code, setCode] = useState<string>("");

  const handelDeleteCard = (variantId: string): void => {
    dispatch(bagActions.removeBag({ variantId }));
  };

  const handleCouponVerification = () => {
    if (!code) {
      toast.warning("Please Enter Promotional Code!");
      return;
    }
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/coupon/verify/${code}`)
      .then(({ data }) => {
        if (Number(data.coupon.minAmount) > totalPrice) {
          toast.warning(
            `Order amount should be greater than ${data.coupon.minAmount}`
          );
          return;
        }
        toast.success(data.message);
        setCoupon((Number(data.coupon.discount) / 100) * totalPrice);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  return (
    <div className="flex flex-col lg:flex-row mx-2 md:mx-20 my-20 gap-x-8 ">
      <div
        className={`border rounded-lg h-max w-full lg:w-3/5 ${
          isLightTheme ? "border-[#865D4C]" : "bg-black"
        }`}
      >
        <div
          className={`grid grid-cols-3 border-b px-8 p-5 ${
            isLightTheme ? "border-[#865D4C]" : "bg-black"
          }`}
        >
          <span>Product</span>
          <span className="justify-self-center">Quantity</span>
          <span className="justify-self-end">Price</span>
        </div>

        <div>
          {bag.map((item, key: number) => {
            return (
              <div
                className={`border-b ${
                  isLightTheme ? "border-[#865D4C]" : "bg-black"
                }`}
                key={key}
              >
                <Displaycard
                  closeEvent={(): void => handelDeleteCard(item.variantId)}
                  bag={item}
                  dispatch={dispatch}
                  bagActions={bagActions}
                  products={products}
                  personalize={item.personalizePrice}
                  setSingleProduct={setSingleProduct}
                  setIsTab1={setIsTab1}
                  isLightTheme={isLightTheme}
                />
              </div>
            );
          })}
        </div>

        <div>
          <div className="text-right pr-8 py-2">Total: Rs {totalPrice}</div>

          <div className="grid lg:grid-cols-3 gap-x-2 justify-between items-center py-6 w-4/5 mx-auto">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Please enter Your Promotional Code"
                className="bg-transparent p-2 py-4 border border-1 rounded w-80"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            <div>
              <button
                className={` p-4 font-semibold rounded w-full ${
                  isLightTheme
                    ? "bg-[#865D4C] text-white hover:bg-white hover:text-black"
                    : "bg-yellow-200 text-black hover:bg-white"
                }`}
                onClick={handleCouponVerification}
              >
                Apply
              </button>
            </div>
          </div>

          <div className="w-4/5 mx-auto my-5">
            <Link href={"/product"}>Back To Shopping</Link>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#1D1D1D] col-span-3 rounded-lg"> */}
      <div
        className={`rounded-lg w-full lg:w-2/5 ${
          isLightTheme ? "bg-[#FDF3EB]" : "bg-[#1D1D1D]"
        }`}
      >
        <div className="grid grid-cols-2 p-5 font-thin">
          <div>Subtotal</div>
          <div className="text-right ">Rs. {totalPrice}</div>
          <div>Discount</div>
          <div className="text-right ">Rs. {coupon}</div>

          <div>Shipping</div>
          <div className="text-right ">
            Rs. {`${shippingCost ? shippingCost : "To be calculatd"}`}
          </div>
          <div className="col-span-2">Delivery in 5-8 working days</div>
          <div>Sales Tax</div>
          <div className="text-right">{salesTaxData.salesTax}%</div>
          <div>Total (Sales Tax excl.)</div>
          <div className="text-right">
            Rs.{" "}
            {totalPrice -
              coupon +
              Number(shippingCost) +
              (totalPrice * salesTaxData.salesTax) / 100}
          </div>
        </div>

        <div className="w-fit mx-auto my-5 ">
          {bag.length ? (
            <Button
              text={"Proceed to purchase"}
              type={"black"}
              customStyle={" mx-auto  rounded-xl"}
              handleClick={() => handleTabChange(false)}
              isLightTheme={isLightTheme}
            />
          ) : (
            <></>
          )}

          {/* <p className="text-center my-8">or</p>

          <Link href={"/"} className={"my-5"}>
            <a className={"border border-white rounded p-3"}>
              Check with
              <Image
                src="/icons/paypalicon.png"
                width="96"
                height="16"
                layout="intrinsic"
                alt={""}
              />
            </a>
          </Link> */}
        </div>

        {/* <p className="text-center text-sm font-thin pb-8 border-b border-white">
          PayPal Express Checkout is fast and easy: save your information and
          complete your order in three simple steps.
        </p> */}

        {/* Text section */}
        <div className="p-5">
          <div className="text-xl my-2 flex">
            {/* <Image
              src="/icons/lock.png"
              width="16"
              height="20"
              alt="lock icon"
            /> */}

            <GrSecure
              className={`h-6 w-6 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
            <span className="pl-2">SECURE PAYMENTS</span>
          </div>
          <p className="mb-5 text-sm">
            Payment information is transferred according to the highest security
            standards, guaranteed by Trustwave and Geotrust: your credit card
            details will be completely encrypted.
          </p>
          <div className="text-xl my-2 flex">
            {/* <Image
              src="/icons/arrow.png"
              width="16"
              height="20"
              alt="arrow icon"
            /> */}
            <TbArrowsRightLeft
              className={`h-6 w-6 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
            <span className="pl-2">EASY RETURNS </span>
          </div>
          <p className="mb-5 text-sm">
            Returns and exchanges service: you have 20 days from delivery to
            follow our quick and easy return procedure.
          </p>
          <p className="p-2 my-2 text-sm">
            For further information, visit the Customer Care area.
          </p>

          <div className="text-xl my-2 flex">
            <MdOutlinePayment
              className={`h-6 w-6 ${
                isLightTheme ? "text-[#865D4C]" : "text-white"
              } `}
            />
            {/* <Image
              src="/icons/icon1.png"
              width="26"
              height="17"
              alt="icon one"
            /> */}
            YOU CAN PAY BY:
          </div>

          <div className="my-8 grid grid-cols-4 gap-3 w-full">
            <div
              className={`flex justify-center rounded border ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              <SiVisa className="h-10 w-10 text-blue-600" />
            </div>
            <div
              className={`flex justify-center rounded border ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              <FaCcMastercard className="h-10 w-10 text-blue-600" />
            </div>
            <div
              className={`flex justify-center rounded border ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              <FaCcPaypal className="h-10 w-10 text-blue-600" />
            </div>
            {/* <div className="flex justify-center rounded border border-[#865D4C]">
              <SiVisa className="h-10 w-10 text-blue" />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingBag;
