import Card from "components/Card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel";

interface ProductsProps {
  latest: Array<any>;
  allProducts: Array<any>;
}

const Products: React.FC<ProductsProps> = ({ latest, allProducts }) => {
  const [tab, setTab] = useState<Number>(0);
  const [products, setProducts] = useState<Array<any>>(latest);

  const handleTabChange = (num: Number) => {
    setTab(num);
    if (num === 0) setProducts(latest);
    else if (num === 1)
      setProducts(
        allProducts.filter((product) => product.categoryType === "Men")
      );
    else if (num === 2)
      setProducts(
        allProducts.filter((product) => product.categoryType === "Women")
      );
  };

  // useEffect(() => {
  //   if (tab === 0) setProducts(latest);
  //   else if (tab === 1)
  //     setProducts(
  //       allProducts.filter((product) => product.categoryType === "Men")
  //     );
  //   else if (tab === 2)
  //     setProducts(
  //       allProducts.filter((product) => product.categoryType === "Women")
  //     );
  // }, [tab, products, latest, allProducts]);

  return (
    <div className="py-20">
      <div className="items-center flex-col">
        <h1 className="text-2xl text-center text-white">
          You will love what we have done
        </h1>

        <div className="flex flex-col md:flex-row justify-center ">
          <button
            className={`border border-white ${
              tab === 0
                ? "bg-yellow-200 text-black"
                : "bg-transparent text-white"
            } hover:bg-white hover:text-black p-4 font-semibold m-6`}
            onClick={() => handleTabChange(0)}
          >
            NEW ARRIVAL
          </button>
          <button
            className={`border border-white ${
              tab === 1
                ? "bg-yellow-200 text-black"
                : "bg-transparent text-white"
            } hover:bg-white hover:text-black p-4 font-semibold m-6`}
            onClick={() => handleTabChange(1)}
          >
            MEN FRAGRANCE
          </button>
          <button
            className={`border border-white ${
              tab === 2
                ? "bg-yellow-200 text-black"
                : "bg-transparent text-white"
            } hover:bg-white hover:text-black p-4 font-semibold m-6`}
            onClick={() => handleTabChange(2)}
          >
            WOMEN FRAGRANCE
          </button>
        </div>
      </div>

      {/* <div className="mx-auto flex w-max">
        {products?.map((card, key) => {
          return (
            <Link
              href={`/product/${
                card.bottleId
              }?type=${card.categoryType.toLowerCase()}`}
              key={key}
            >
              <a>
                <Card card={card} />
              </a>
            </Link>
          );
        })}
      </div> */}
      <Carousel products={products} />
    </div>
  );
};

export default Products;
