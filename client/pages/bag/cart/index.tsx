import React, { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "store/hooks";
import BagItem from "./bag.item";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { userActions } from "store/slices/user.slice";
import Spinner from "components/Spinner";
import { toast } from "react-toastify";
import LoginModal from "./login.modal";
import { useForm, useWatch } from "react-hook-form";
import { GuestUser } from "model/user.model";
import { joiResolver } from "@hookform/resolvers/joi";
import { GuestUserSchema } from "schemas/user.schema";
import { SalesTaxDataModal, ShippingTypeModal } from "model/sales.tax.modal";

interface CheckoutProps {
  products: Array<any>;
  dispatch: any;
  totalPrice: number;
  coupon: number;
  code: string;
  singleProduct: any;
  setState: Function;
  shippingCost: number;
  salesTaxData: SalesTaxDataModal;
  shippings: ShippingTypeModal[];
  isLightTheme: boolean;
}

const Checkout: React.FC<CheckoutProps> = ({
  products,
  dispatch,
  totalPrice,
  coupon,
  code,
  singleProduct,
  setState,
  shippingCost,
  salesTaxData,
  isLightTheme,
}) => {
  const auth = useAppSelector((state) => state.auth.jwt);
  const bag = useAppSelector((state) => state.bag.currentBag);
  const user = useAppSelector((state) => state.user.currentUser);
  const [showModal, setShowModal] = useState(false);
  const [btnClick, setBtnClick] = useState(false);
  const [guestbtnClick, setGuestBtnClick] = useState(false);
  const [shipAdd, setShipAdd] = useState<string>(
    user?.shippingAddress ? user?.shippingAddress : ""
  );

  const [editAdd, setEditAdd] = useState(false);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<GuestUser>({
    resolver: joiResolver(GuestUserSchema, {
      errors: { wrap: { label: "" } },
      abortEarly: true,
    }),
  });

  const guestRef = useRef<HTMLButtonElement>(null);

  const handleProceedToPurchase = (token: any) => {
    setBtnClick(true);
    if (auth === "logged_out" || !auth) {
      setBtnClick(false);
      return;
    }

    if (auth && auth !== "logged_out") {
      const orderBag: Array<any> = [];
      if (singleProduct.id && singleProduct.fragranceId) {
        bag.forEach((bagItem): void => {
          if (
            bagItem.id === singleProduct.id &&
            bagItem.fragranceId === singleProduct.fragranceId
          )
            orderBag.push({
              bottleId: bagItem.id,
              fragranceId: bagItem.fragranceId,
              weight: bagItem.weight,
              quantity: bagItem.quantity,
              personalize: bagItem?.personalize,
              variantId: bagItem.variantId,
            });
        });
      } else
        bag.forEach((bagItem: any): void => {
          orderBag.push({
            bottleId: bagItem.id,
            fragranceId: bagItem.fragranceId,
            weight: bagItem.weight,
            quantity: bagItem.quantity,
            personalize: bagItem?.personalize,
            variantId: bagItem.variantId,
          });
        });

      const order = {
        code,
        products: orderBag,
        saleTax: salesTaxData.salesTax,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order`, order)
        .then(({ data }) => {
          setBtnClick(false);
          window.location = data.url;
        })
        .catch((err) => {
          setBtnClick(false);
          console.log(handleAxiosResponseError(err));
          toast.error(handleAxiosResponseError(err));
        });
    }
  };

  const handleAddress = (e: FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/address`, {
        shippingAddress: shipAdd,
      })
      .then(({ data }) => {
        dispatch(userActions.setUserAddress({ address: shipAdd }));
        console.log("data : ", data);
        toast.success(data.message);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const handleAddressUpdate = (e: FormEvent) => {
    e.preventDefault();
    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer/address`, {
        shippingAddress: shipAdd,
      })
      .then(({ data }) => {
        console.log(data);
        dispatch(userActions.setUserAddress({ address: shipAdd }));
        setEditAdd(false);
        toast.success(data.message);
      })
      .catch((err) => {
        setEditAdd(false);
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const state = useWatch({
    control,
    name: "state",
  });

  useEffect(() => {
    setState(state);
  }, [state]);

  const handleProceedAsGuest = (data: GuestUser) => {
    console.log(data);
    setGuestBtnClick(true);
    const orderBag: Array<any> = [];
    if (singleProduct.id && singleProduct.fragranceId) {
      bag.forEach((bagItem): void => {
        if (
          bagItem.id === singleProduct.id &&
          bagItem.fragranceId === singleProduct.fragranceId
        )
          orderBag.push({
            bottleId: bagItem.id,
            fragranceId: bagItem.fragranceId,
            weight: bagItem.weight,
            quantity: bagItem.quantity,
            personalize: bagItem?.personalize,
            variantId: bagItem.variantId,
          });
      });
    } else
      bag.forEach((bagItem): void => {
        orderBag.push({
          bottleId: bagItem.id,
          fragranceId: bagItem.fragranceId,
          weight: bagItem.weight,
          quantity: bagItem.quantity,
          personalize: bagItem?.personalize,
          variantId: bagItem.variantId,
        });
      });

    const order = {
      code,
      products: orderBag,
      saleTax: 3,
    };

    const postBody = {
      order,
      customer: data,
    };

    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/guest/order`, postBody)
      .then(({ data }) => {
        setGuestBtnClick(false);
        window.location = data.url;
      })
      .catch((err) => {
        setGuestBtnClick(false);
        console.log(handleAxiosResponseError(err));
        toast.error(handleAxiosResponseError(err));
      });
  };

  const handleUserLogin = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="grid lg:grid-cols-8 py-8">
        {/* Left section */}
        <div className="col-span-5 m-5">
          {/* Box 1 */}
          <div
            className={`border rounded-lg p-4 py-8 ${
              isLightTheme ? "border-[#865D4C]" : "border-white"
            }`}
          >
            <div>
              <div>Login Information</div>
            </div>
            {/* Text section */}
            {auth && auth !== "logged_out" ? (
              <div>
                <div className="mt-6">
                  <h1 className="text-2xl font-bold">
                    {user?.firstName} {user?.lastName}
                  </h1>
                </div>

                <div className="mt-2">
                  <h3>Mail Address : {user?.userEmail}</h3>
                </div>

                <div className="mt-8">
                  <h1 className="text-xl">Shipping Address</h1>
                  {user?.shippingAddress ? (
                    <div>
                      {editAdd ? (
                        <div>
                          <form onSubmit={handleAddressUpdate}>
                            <input
                              type="text"
                              className={`border-2 rounded p-2 w-96 ${
                                isLightTheme
                                  ? "border-[#865D4C]"
                                  : "bg-black border-white"
                              }`}
                              required
                              value={shipAdd}
                              onChange={(e) => setShipAdd(e.target.value)}
                            />
                            <button
                              type="submit"
                              className={`font-semibold mx-auto rounded w-max p-2 ml-4 ${
                                isLightTheme
                                  ? "bg-[#865D4C] text-white"
                                  : "bg-yellow-200 text-black"
                              }`}
                            >
                              Update
                            </button>
                          </form>
                        </div>
                      ) : (
                        <div className="flex flex-cols">
                          <div>{user?.shippingAddress}</div>
                          <div
                            className="cursor-pointer ml-4"
                            onClick={() => setEditAdd(true)}
                          >
                            <Image
                              src="/icons/pen.png"
                              width="20"
                              height="20"
                              alt="edit iconc"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <form onSubmit={handleAddress}>
                        <input
                          type="text"
                          className={`bg-transparent border-2 rounded p-2 w-96 ${
                            isLightTheme
                              ? "border-[#865D4C] text-black"
                              : "border-white text-white"
                          }`}
                          required
                          value={shipAdd}
                          onChange={(e) => setShipAdd(e.target.value)}
                        />
                        <button
                          type="submit"
                          className={`font-semibold mx-auto rounded w-max p-2 ml-4 ${
                            isLightTheme
                              ? "bg-[#865D4C] text-white"
                              : "bg-yellow-200 text-black"
                          }`}
                        >
                          Add
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-12">
                  <h1 className="text-xl font-thin">Your Email</h1>
                  <p className="my-2 text-sm font-thin">
                    Insert your email address. If you wish to proceed as a
                    registered user you will also be asked for your password
                  </p>
                </div>
                {/* End of the text section */}
                {/* Mail input section */}
                <div className="mt-8">
                  <form onSubmit={handleSubmit(handleProceedAsGuest)}>
                    <div className="py-1 grid grid-cols-12 gap-0">
                      <label
                        htmlFor="emailInput"
                        className="text-lg pr-4 col-span-3"
                      >
                        Enter Mail
                      </label>
                      <input
                        type="email"
                        className={`col-span-7 bg-transparent p-1 border rounded w-full ${
                          isLightTheme
                            ? "border-[#865D4C] text-black"
                            : "border-white text-white"
                        }`}
                        {...register("guestEmail")}
                      />
                      {errors.guestEmail && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.guestEmail.message}
                        </p>
                      )}
                    </div>
                    <div className="py-1 grid grid-cols-12 gap-0">
                      <label className="text-lg pr-4 col-span-3">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        className={`col-span-7 bg-transparent p-1 border rounded w-full ${
                          isLightTheme
                            ? "border-[#865D4C] text-black"
                            : "border-white"
                        }`}
                        {...register("shippingAddress")}
                      />
                      {errors.shippingAddress && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.shippingAddress.message}
                        </p>
                      )}
                    </div>
                    <div className="py-1 flex items-center grid grid-cols-12 gap-0">
                      <label
                        className={`text-lg col-span-3 pr-4 bg-transparent ${
                          isLightTheme
                            ? "border-[#865D4C] text-black"
                            : "border-white text-white"
                        }`}
                      >
                        State
                      </label>

                      <select
                        className={`form-select appearance-none block col-span-7 w-full px-3 py-1.5 font-normal bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none text-white ${
                          isLightTheme ? "bg-[#865D4C]" : "bg-black"
                        } `}
                        aria-label="Default select example"
                        {...register("state")}
                      >
                        <option className="bg-transparent" value="">
                          Select State
                        </option>
                        <option value="Azad Kashmir">Azad Kashmir</option>
                        <option value="Balochistan">Balochistan</option>
                        <option value="Federally Administered Tribal Areas">
                          Federally Administered Tribal Areas
                        </option>
                        <option value="Gilgit-Baltistan">
                          Gilgit-Baltistan
                        </option>
                        <option value="Islamabad Capital Territory">
                          Islamabad Capital Territory
                        </option>
                        <option value="Khyber Pakhtunkhwa">
                          Khyber Pakhtunkhwa
                        </option>
                        <option value="Punjab">Punjab</option>
                        <option value="Sindh">Sindh</option>
                      </select>
                      {errors.state && (
                        <p className="mt-2 text-xs font-light text-red-400 sm:text-sm">
                          {errors.state.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      className="hidden"
                      ref={guestRef}
                    ></button>
                  </form>
                </div>
              </>
            )}
            {/* End of the mail input section */}
            {/* Paragraph */}
            <p className="text-sm font-thin mt-16">
              By clicking on “Proceed to purchase, you declare that you are over
              18 years of age and that you consent to the processing of your
              personal data by Giorgio Armani S.p.A. and its affiliated entities
              worldwide for the handling of your order, as indicated in the
              Privacy Policy.
            </p>{" "}
            {/* End of Paragraph */}
            {/* Button */}
            <div className="w-fit mx-auto mt-6 flex">
              {!user ? (
                <>
                  <button
                    type="submit"
                    className={` ${
                      guestbtnClick ? "p-2" : "p-4"
                    } w-48 font-semibold mx-2 rounded ${
                      isLightTheme
                        ? " bg-[#865D4C] text-white hover:bg-white hover:text-black"
                        : "bg-yellow-200 text-black hover:bg-white"
                    }`}
                    onClick={() => guestRef.current?.click()}
                  >
                    {guestbtnClick ? (
                      <Spinner className="h-10 w-10 text-black mx-auto" />
                    ) : (
                      "Proceed as Guest"
                    )}
                  </button>
                  <button
                    className={` p-4 w-48 font-semibold mx-auto rounded ${
                      isLightTheme
                        ? " bg-[#865D4C] text-white hover:bg-white hover:text-black"
                        : "bg-yellow-200 text-black hover:bg-white"
                    }`}
                    onClick={handleUserLogin}
                  >
                    Login and Checkout
                  </button>
                </>
              ) : (
                <button
                  className={` ${
                    btnClick ? "p-2" : "p-4"
                  } w-48 font-semibold mx-auto rounded ${
                    isLightTheme
                      ? " bg-[#865D4C] text-white hover:bg-white hover:text-black"
                      : "bg-yellow-200 text-black hover:bg-white"
                  } `}
                  onClick={handleProceedToPurchase}
                >
                  {btnClick ? (
                    <Spinner
                      className={`h-10 w-10 mx-auto ${
                        isLightTheme ? "text-[#865D4C]" : "text-black"
                      }`}
                    />
                  ) : (
                    "Proceed to purchase"
                  )}
                </button>
              )}
            </div>
            {/* End of Button */}
          </div>

          {/* Box 2 */}

          <div className="grid gap-y-6 my-8">
            <div
              className={`border rounded-lg p-5 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              Buying A Gift?
            </div>
            <div
              className={`border rounded-lg p-5 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              SHIPPING TO
            </div>
            <div
              className={`border rounded-lg p-5 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              SHIPPING
            </div>
            <div
              className={`border rounded-lg p-5 ${
                isLightTheme ? "border-[#865D4C]" : "border-white"
              }`}
            >
              PAYMENT
            </div>
          </div>
        </div>

        {/* End of left section */}

        {/* Right section */}

        <div
          className={`p-4 col-span-6 md:col-span-3 m-5 rounded-lg ${
            isLightTheme ? "bg-[#FDF3EB]" : "bg-[#1D1D1D]"
          }`}
        >
          <div className="">
            <span>Shopping Bag</span>
            {/* <span className="cursor-pointer">
              <Image src="/icons/pen.png" width="25" height="25" alt=""></Image>
            </span> */}
          </div>

          <p className="text-sm py-1">
            YOU HAVE {bag.length} ITEMS IN YOUR SHOPPING BAG
          </p>

          {/* Cards */}
          <div
            className={`my-6 border-b ${
              isLightTheme ? "border-[#865D4C]" : "border-white"
            } `}
          >
            {singleProduct.id !== "" && singleProduct.fragranceId !== "" ? (
              <div>
                {bag.map((item: any, key: number) => {
                  if (
                    singleProduct.id === item.id &&
                    singleProduct.fragranceId === item.fragranceId
                  )
                    return (
                      <div className="grid grid-cols-4 text-sm my-3" key={key}>
                        <BagItem
                          bag={item}
                          products={products}
                          personalize={item.personalizePrice}
                        />
                      </div>
                    );
                })}
              </div>
            ) : (
              <div>
                {bag.map((item: any, key: number) => {
                  return (
                    <div className="grid grid-cols-4 text-sm my-3" key={key}>
                      <BagItem
                        bag={item}
                        products={products}
                        personalize={item.personalizePrice}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Form grid */}
          <div className=""></div>
          <div className="grid gap-y-5 grid-cols-2 px-4">
            <span>Subtotal</span>
            <span className="text-right">Rs. {totalPrice - coupon}</span>
            <span>Discount</span>
            <span className="text-right">Rs. {coupon}</span>
            <div>Shipping</div>
            <div className="text-right ">
              Rs. {`${shippingCost ? shippingCost : "To be calculatd"}`}
            </div>

            {/* <span>Standard</span>
            <span className="text-right">$ 9.95</span> */}
            <span className="col-span-2">Delivery in 5-8 working days</span>

            <span>Sales Tax</span>
            <span className="text-right">{salesTaxData.salesTax}%</span>
            {/* <span className="col-span-2">Payment</span> */}

            <span>Credit Card</span>
            <span className="text-right">Free</span>
            <span>Total (Sales Tax excl.)</span>
            <span className="text-right">
              Rs.{" "}
              {totalPrice -
                coupon +
                Number(shippingCost) +
                (totalPrice * salesTaxData.salesTax) / 100}
            </span>
          </div>

          {/* <div className="flex justify-between px-4">
            <span>Total</span>
            <span>
              $ {totalPrice - coupon + Number(shippingCost) + totalPrice * 0.3}
            </span>
          </div> */}
        </div>

        {/* End of the right section */}
      </div>

      {showModal ? (
        <>
          <LoginModal setShowModal={setShowModal} />
        </>
      ) : null}
    </>
  );
};

export default Checkout;
