import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Header from "components/Header";
import Breadcrumb from "components/Breadcrumb";
import Button from "components/Button";
import Footer from "components/Footer";
import Footerlinks from "components/Footerlinks";
import Servicecards from "components/Servicecards";
import Info from "./info";
import Media from "./images";
import { useRouter } from "next/router";
import { bagActions } from "store/slices/bag.slice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import Spinner from "components/Spinner";
import { Bottle, BottleVariant, Fragrance, Review } from "model/interfaces.js";

export const getServerSideProps: GetServerSideProps = async (
  context
): Promise<{
  props: { fragrances: Fragrance[]; reviews: Review[]; bottles: Bottle[] };
}> => {
  const type = context?.query?.type;
  const id = context?.params?.id;

  const frag = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/fragrance${
      type === "both" ? "" : `?type=${type}`
    }`
  );
  const rev = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/review/bottle/${id}`
  );

  const prod = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/${id}`
  );

  const { fragrances } = await frag.json();
  const { reviews } = await rev.json();
  const { bottles } = await prod.json();

  return {
    props: {
      fragrances,
      reviews,
      bottles,
    },
  };
};

interface Props {
  reviews: Review[];
  bottles: Bottle[];
  fragrances: Fragrance[];
  isLightTheme: boolean;
}

const ProductDetail: NextPage<Props> = ({
  bottles,
  fragrances,
  reviews,
  isLightTheme,
}) => {
  const router = useRouter();
  const { id } = router.query;

  const [quantity, setQuantity] = useState<number>(1);
  const [fragrance, setFragrance] = useState<Fragrance>(fragrances[0]);
  const [measure, setMeasure] = useState<string>("25");
  const [options, setOptions] = useState<Array<any>>([]);
  const [inBag, setInBag] = useState<boolean>(false);
  const bag = useAppSelector((state) => state.bag.currentBag);
  const dispatch = useAppDispatch();
  const product = bottles[0];
  const [variant, setVariant] = useState(bottles[0].variants[0]);

  const increaseQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBag = (): void => {
    const bagdata = {
      id: product.bottleId,
      variantId: variant.variantId,
      image: variant.frontImage,
      // title: product.productTitle,
      inspiration: fragrance.inspiration,
      fragranceId: fragrance.fragranceId,
      fragranceCost: Number(fragrance?.unitCost) * Number(measure),
      weight: measure,
      quantity: quantity,
    };

    console.log(bagdata);

    dispatch(bagActions.addBag(bagdata));
    router.push("/bag");
  };

  useEffect(() => {
    setOptions([]);
    if (id && product) {
      for (let i = 25; i <= parseInt(product.capacity); i = i + 25)
        setOptions((prev) => [...prev, i]);
    }
  }, [id, product]);

  useEffect((): void => {
    if (variant && bag !== undefined) {
      const isFind = bag?.find((item) => item.variantId === variant.variantId);

      isFind ? setInBag(true) : setInBag(false);
    }
  }, [variant, bag]);

  const handleFragranceChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const target = e.target;
    const frag = fragrances.find(
      (item: Fragrance): boolean => item.fragranceId === target.value
    );
    if (frag) setFragrance(frag);
  };

  const handleMeasureChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const target = e.target;
    setMeasure(target.value);
  };

  const handleVariant = (value: string) => {
    const findVariant = product.variants.find(
      (item: BottleVariant): boolean => value === item.variantName
    );

    if (findVariant) setVariant(findVariant);
  };

  if (product === undefined) {
    return (
      <div className="flex h-screen bg-black">
        <div className="m-auto">
          <Spinner className="h-12 w-12 text-white" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isLightTheme ? "bg-white text-black" : "bg-black text-white"
      } h-full container mx-auto`}>
      <Header products={bottles} isLightTheme={isLightTheme} />
      <Breadcrumb
        siteTitle={product?.bottleName}
        link1={"All"}
        path1={"/product"}
        link2={"Ladies Dedorant"}
        isLightTheme={isLightTheme}
      />

      <div>
        <div className="grid lg:grid-cols-2 my-12">
          <Media
            media={product?.variants}
            variant={variant}
            handleVariant={handleVariant}
          />

          {/* Input area section right side of the image */}

          <div>
            {/* <h1 className="font-thin text-3xl text-center lg:text-start">
              {product?.bottleName}
            </h1> */}
            <div className="grid grid-cols-4 gap-x-2 gap-y-4">
              {/* <span>Vendor</span>
              <span className="col-span-3">Galmo</span>
              <span>Type:</span>
              <span className="col-span-3">Perfume</span> */}
              <span>Availability:</span>
              <span className="text-green-600 col-span-3">In stock!</span>
              <span>Quantity</span>
              <div className="col-span-3">
                <div className="flex border border-white rounded-sm w-fit">
                  <span
                    className="border-r border-white p-1 px-2 cursor-pointer	"
                    onClick={decreaseQuantity}>
                    -
                  </span>
                  <span className=" p-1 px-2">{quantity}</span>
                  <span
                    className="border-l border-white p-1 px-2 cursor-pointer	"
                    onClick={increaseQuantity}>
                    +
                  </span>
                </div>
              </div>

              <div>Color : </div>
              <div className="col-span-3">
                <div className="w-full md:w-6/12 flex">
                  <select
                    className={`form-select appearance-none block w-full px-3 py-1.5 font-normal bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none ${
                      isLightTheme
                        ? "bg-tranparent text-black"
                        : "bg-black text-white"
                    }`}
                    aria-label="Default select example"
                    value={variant.variantName}
                    onChange={(e) => handleVariant(e.target.value)}>
                    <option value={"white"}>White</option>
                    <option value={"gray"}>Gray</option>
                    <option value={"purple"}>Purple</option>
                    <option value={"orange"}>Orange</option>
                    <option value={"pink"}>Pink</option>
                  </select>
                </div>
              </div>

              <div>Inspiration : </div>
              <div className="col-span-3">
                <div className="w-full md:w-6/12 flex">
                  <select
                    className={`form-select appearance-none block w-full px-3 py-1.5 font-normal bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none ${
                      isLightTheme
                        ? "bg-tranparent text-black"
                        : "bg-black text-white"
                    }`}
                    aria-label="Default select example"
                    value={fragrance?.fragranceId}
                    onChange={handleFragranceChange}>
                    {fragrances?.map((fragrance, key) => (
                      <option value={fragrance.fragranceId} key={key}>
                        {fragrance.inspiration}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <span>Fragrance Name : </span>
              <span className="col-span-3">{fragrance?.fragranceName}</span>

              <div>Miligram: </div>
              <div className="col-span-3">
                <div className="w-full md:w-6/12">
                  <select
                    className={`form-select appearance-none block w-full px-3 py-1.5 font-normal bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:outline-none ${
                      isLightTheme
                        ? "bg-tranparent text-black"
                        : "bg-black text-white"
                    }`}
                    aria-label="Default select example"
                    value={measure}
                    onChange={handleMeasureChange}>
                    {/* <option value="0">Measure</option> */}

                    {options?.map((item, key) => (
                      <option value={item} key={key}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <span>Bottle Price:</span>
              <span className="col-span-3">
                {product.price ? product.price : 0}
              </span>

              <span>Fragrance Price:</span>
              <span className="col-span-3">
                {Number(fragrance?.unitCost) * Number(measure)}
              </span>

              <div className="col-span-4 grid lg:grid-cols-4 gap-3">
                {/* <Button
                  text={"EXPLORE MORE"}
                  type={"black"}
                  customStyle=" rounded-sm"
                  handleClick={() => router.push("/product")}
                /> */}
                {inBag ? (
                  <></>
                ) : (
                  <Button
                    text={"BUY IT NOW"}
                    type={"yellow"}
                    customStyle=" rounded-sm"
                    handleClick={handleBag}
                    isLightTheme={isLightTheme}
                  />
                )}

                {product.personalizable ? (
                  // <Link
                  //   className="text-yellow-700 text-center cursor-pointer self-center"
                  // href={`/personalize?id=${product?.bottleId}&fragrance=${fragrance?.fragranceId}&weight=${measure}&quantity=${quantity}&unitCost=${fragrance?.unitCost}&inspiration=${fragrance?.inspiration}`}
                  // >
                  //   Personalization{" "}
                  // </Link>
                  <button
                    className={
                      "p-4 font-semibold rounded-sm border border-white text-black bg-[#eeeeee]"
                    }
                    onClick={() =>
                      router.push(
                        `/personalize?id=${product?.bottleId}&fragrance=${fragrance?.fragranceId}&weight=${measure}&quantity=${quantity}&unitCost=${fragrance?.unitCost}&inspiration=${fragrance?.inspiration}&variantId=${variant.variantId}`
                      )
                    }>
                    PERSONALIZE
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}

      <Info
        reviews={reviews.filter(
          (review) =>
            review?.bottleId === id ||
            review?.fragranceId === fragrance?.fragranceId
        )}
        product={product}
        isLightTheme={isLightTheme}
      />

      <Servicecards isLightTheme={isLightTheme} />
      <Footerlinks isLightTheme={isLightTheme} />
      <Footer isLightTheme={isLightTheme} />
    </div>
  );
};

export default ProductDetail;
