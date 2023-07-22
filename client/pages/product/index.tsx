import React, { ChangeEvent, useEffect, useState } from "react";
import type { NextPage } from "next";
import Breadcrumb from "../../components/Breadcrumb";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Footerlinks from "../../components/Footerlinks";
import Footer from "../../components/Footer";
import Servicecards from "../../components/Servicecards";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bottle } from "model/interfaces";

interface Props {
  products: Array<Bottle>;
  // latestArrivals: Array<any>;
  isLightTheme: boolean;
}

const Product: NextPage<Props> = ({
  products,
  // latestArrivals,
  isLightTheme,
}) => {
  const router = useRouter();
  const { category } = router.query;
  const [product, setProduct] = useState<Array<any>>(products);
  const [stock, setStock] = useState({ inStock: 0, outStock: 0 });
  const [maxPrice, setMaxPrice] = useState<any>({});
  const [amount, setAmount] = useState<{ min: string; max: string }>({
    min: "",
    max: "",
  });

  useEffect(() => {
    if (category)
      setProduct(
        products.filter(
          (item) =>
            item.categoryType.toLowerCase() === category ||
            item.categoryType.toLowerCase() === "both"
        )
      );
    else setProduct(products);
  }, [products, category]);

  useEffect(() => {
    setStock({ inStock: 0, outStock: 0 });
    let inStock = 0;
    let outStock = 0;
    product.forEach((item) => {
      item.availableQuantity >= 10 ? inStock++ : outStock++;
    });

    setStock({ inStock, outStock });
  }, [product]);

  useEffect(() => {
    if (product.length) {
      setMaxPrice(
        product.reduce(function (prev, curr) {
          return Number(prev.price) > Number(curr.price) ? prev : curr;
        })
      );
    }
  }, [product]);

  const handleChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount({ ...amount, min: e.target.value });

    if (amount.min && amount.max)
      setProduct(
        products.filter(
          (item) =>
            Number(item.price) >= Number(e.target.value) &&
            Number(item.price) <= Number(amount.max)
        )
      );
    else
      setProduct(
        products.filter((item) => Number(item.price) >= Number(e.target.value))
      );
  };

  const handleChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount({ ...amount, max: e.target.value });

    if (amount.min && amount.max)
      setProduct(
        products.filter(
          (item) =>
            Number(item.price) >= Number(amount.min) &&
            Number(item.price) <= Number(e.target.value)
        )
      );
    else
      setProduct(
        products.filter((item) => Number(item.price) <= Number(e.target.value))
      );
  };

  const handleClear = () => {
    setProduct(products);
    setAmount({ min: "", max: "" });
  };

  return (
    <>
      <div className="bg-black text-white container mx-auto">
        <Header products={products} isLightTheme={isLightTheme} />
        <div>
          <Breadcrumb
            siteTitle={"COLLECTION"}
            link1={"Home"}
            path1={"/"}
            link2={"Products"}
            path2={"/product"}
            isLightTheme={isLightTheme}
          />

          <div className="flex">
            <div className="w-80 hidden lg:block">
              <div className="w-full px-4 mx-auto">
                {/* Category Section */}
                <h1 className="text-5xl text-[#9B9999] border-b py-8 border-[#383838] my-5 ">
                  Category
                </h1>

                <ul className="list-disc mx-2 p-3 my-6">
                  <li className="mx-4 w-max">
                    <Link href="/product">All Products</Link>
                  </li>
                  <li className="mx-4 w-max">
                    <Link href="/product?category=men">Men Perfume</Link>
                  </li>
                  <li className="mx-4 w-max">
                    <Link href="/product?category=women">Women Perfume</Link>
                  </li>
                </ul>
                {/* Avalibality section */}
                <p className="text-5xl text-[#9B9999] border-b py-8 border-[#383838] my-5">
                  Availability
                </p>

                <div className="flex">
                  <div className="flex items-center">
                    <input type="radio" name="availability" id="inStock" />
                    <label htmlFor="inStock" className="ml-2">
                      In stock ({stock.inStock})
                    </label>
                  </div>
                  <div className="flex items-center ml-4">
                    <input type="radio" name="availability" id="outStock" />
                    <label htmlFor="outStock" className="ml-2">
                      Out stock ({stock.outStock})
                    </label>
                  </div>
                </div>

                {/* Price Section  */}
                <p className="text-5xl text-[#9B9999] border-b py-8 border-[#383838] my-5">
                  Price
                </p>

                <div className="my-3">
                  <p className="text-white">
                    The highest price is = Rs.{" "}
                    {maxPrice.price ? maxPrice.price : 0}{" "}
                  </p>

                  <div className="flex text-white my-3 justify-between mx-2">
                    <div className="mr-2">
                      <label htmlFor="fromPrice">From Rs. </label>
                      <br />
                      <input
                        type="text"
                        id="fromPrice"
                        className="bg-transparent border border-white rounded-0 focus:outline-none p-1 w-full"
                        value={amount.min}
                        onChange={handleChangeMin}
                      />
                    </div>
                    <div className="ml-2">
                      <label htmlFor="toPrice">To Rs. </label>
                      <br />
                      <input
                        type="text"
                        id="toPrice"
                        className="bg-transparent border border-white rounded-0 focus:outline-none p-1 w-full"
                        value={amount.max}
                        onChange={handleChangeMax}
                      />
                    </div>
                  </div>
                  <Button
                    text={"Clear All"}
                    type={"yellow"}
                    customStyle={"w-full py-2"}
                    handleClick={handleClear}
                    isLightTheme={isLightTheme}
                  />
                </div>

                {/* Lates arival */}
                <h3 className="text-3xl text-[#9B9999] border-b py-8 border-[#383838] my-5">
                  Latest Arrivals
                </h3>

                {/* <div>
                  {latestArrivals?.map((card: any, key: number) => {
                    return (
                      <Link
                        href={`/product/${
                          card.bottleId
                        }?type=${card.categoryType.toLowerCase()}`}
                        key={key}
                        className="w-96"
                      >
                        <Card card={card} horizental={true} />
                      </Link>
                    );
                  })}
                </div> */}
              </div>
            </div>

            {/* Grid container */}
            <div className="w-full lg:w-4/5">
              {/* <div className="flex justify-between p-5">
                <div></div>

                <div className="mx-8 items-center">
                  <label htmlFor="categorySelect">Sort by</label>
                  <select
                    name="categorySelect"
                    id="categorySelect"
                    className="bg-[#2B2C2D] p-2 px-8 mx-2 text-left"
                  >
                    <option value="Featured">Featured</option>
                  </select>
                </div>
              </div> */}

              {/* Products Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {product?.map((card: any, key: number) => {
                  return (
                    <Link
                      href={`/product/${
                        card.bottleId
                      }?type=${card.categoryType.toLowerCase()}`}
                      key={key}
                      className="w-96 mx-auto"
                    >
                      <Card card={card} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <Servicecards isLightTheme={isLightTheme} />
        <Footerlinks isLightTheme={isLightTheme} />
        <Footer isLightTheme={isLightTheme} />
      </div>
    </>
  );
};

export default Product;
