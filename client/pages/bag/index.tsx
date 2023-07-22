import React, { useCallback, useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Header from "components/Header";
import Footer from "components/Footer";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { bagActions } from "store/slices/bag.slice";
import ShoppingBag from "./shoppingbag";
import Checkout from "./cart";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { SalesTaxDataModal, ShippingTypeModal } from "model/sales.tax.modal";

export const getServerSideProps: GetServerSideProps = async (): Promise<{
  props: { salesTaxData: SalesTaxDataModal; shippings: ShippingTypeModal[] };
}> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/salestax`);
  const { salesTaxData } = await res.json();
  const resShipping = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/shipping`
  );
  const { shippings } = await resShipping.json();

  return {
    props: {
      salesTaxData,
      shippings,
    },
  };
};

interface Props {
  products: Array<any>;
  latestArivals: Array<any>;
  salesTaxData: SalesTaxDataModal;
  shippings: ShippingTypeModal[];
  isLightTheme: boolean;
}
const Bag: NextPage<Props> = ({
  products,
  salesTaxData,
  shippings,
  isLightTheme,
}) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const dispatch = useAppDispatch();
  const bag = useAppSelector((state) => state.bag.currentBag);
  const user = useAppSelector((state) => state.user.currentUser);
  const [isTab1, setIsTab1] = useState<boolean>(true);
  const [coupon, setCoupon] = useState<any>(0);
  const [code, setCode] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [state, setState] = useState<string>();
  const [singleProduct, setSingleProduct] = useState<any>({
    id: "",
    fragranceId: "",
  });

  const handleState = useCallback((value: string) => {
    setState(value);
  }, []);

  useEffect((): void => {
    let price: number = 0;
    // setPersonalizeItems([]);
    setTotalPrice(0);

    if (singleProduct.id !== "" && singleProduct.fragranceId !== "") {
      bag.forEach((bagItem): void => {
        if (
          singleProduct.id === bagItem.id &&
          singleProduct.fragranceId === bagItem.fragranceId
        )
          products.forEach((prod: any) => {
            if (prod.bottleId === singleProduct.id) {
              price += bagItem.quantity * prod.price;
              price += bagItem.fragranceCost;
              if (bagItem.personalizePrice) price += bagItem.personalizePrice;
            }
          });
      });
    } else
      bag.forEach((bagItem): void => {
        products.forEach((prod: any) => {
          if (
            prod.bottleId === bagItem.id &&
            singleProduct.id === "" &&
            singleProduct.fragranceId === ""
          ) {
            price += bagItem.quantity * prod.price;
            price += bagItem.fragranceCost;
            if (bagItem.personalizePrice) price += bagItem.personalizePrice;
          }
        });
      });
    setTotalPrice(price);
  }, [bag, products, singleProduct]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/shipping/charges/${
          user ? user?.state : state
        }`
      )
      .then(({ data }) => {
        setShippingCost(data.shippingCost.domesticRate);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, [user, state]);

  const handleTabChange = (tab: boolean) => {
    setSingleProduct({ id: "", fragranceId: "" });
    setIsTab1(tab);
  };

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } font-Raleway container mx-auto`}
    >
      <Header products={products} isLightTheme={isLightTheme} />

      {/* Tabs */}
      <div
        className={`${
          isLightTheme ? "bg-[#FDF3EB]" : "bg-[#161616]"
        } py-6 pl-20 h-20 flex`}
      >
        <div
          className={`font-bold text-xl cursor-pointer pb-1 ${
            isTab1 &&
            `border-b ${isLightTheme ? "border-[#865D4C]" : "border-white"} `
          } `}
          onClick={() => setIsTab1(true)}
        >
          1. Shopping Bag
        </div>
        <div
          className={`ml-10 font-bold text-xl cursor-pointer ${
            !isTab1 &&
            `border-b ${isLightTheme ? "border-[#865D4C]" : "border-white"}`
          } `}
          onClick={() => setIsTab1(false)}
        >
          2. Checkout
        </div>
      </div>

      {isTab1 ? (
        <ShoppingBag
          bag={bag}
          products={products}
          dispatch={dispatch}
          bagActions={bagActions}
          totalPrice={totalPrice}
          setCoupon={setCoupon}
          coupon={coupon}
          handleTabChange={handleTabChange}
          code={code}
          setCode={setCode}
          setIsTab1={setIsTab1}
          setSingleProduct={setSingleProduct}
          shippingCost={shippingCost}
          salesTaxData={salesTaxData}
          isLightTheme={isLightTheme}
        />
      ) : (
        <Checkout
          products={products}
          dispatch={dispatch}
          totalPrice={totalPrice}
          coupon={coupon}
          code={code}
          singleProduct={singleProduct}
          setState={handleState}
          shippingCost={shippingCost}
          salesTaxData={salesTaxData}
          shippings={shippings}
          isLightTheme={isLightTheme}
        />
      )}

      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default Bag;
