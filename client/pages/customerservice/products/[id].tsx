import React, { useEffect, useState } from "react";
import Image from "next/image";
import { NextPage } from "next";

import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";
import CustomerServiceLayout from "layout/customer.service.layout";

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<any>();

  useEffect(() => {
    if (id)
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/bottle/${id}`)
        .then(({ data }) => {
          console.log(data);
          setProduct(data.bottle[0]);
        })
        .catch((err) => {
          console.log(handleAxiosResponseError(err));
        });
  }, [id]);

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
    <CustomerServiceLayout title="Bottle Details" tab={2}>
      <div className="grid grid-cols-2 gap-5 my-10">
        <div className="bg-[#23252A] py-28 relative h-full w-4/5 mx-auto">
          <Image
            src={
              product.media
                ? product?.media[0]?.imagePointer
                : "/images/blank.jpg"
            }
            fill
            alt="product"
          />
        </div>

        <div className="p-12 font-bold text-[#A09F9A]">
          <div className="">
            <span>Status: </span>{" "}
            <span className="text-[#DBC864]">This product Showing</span>
          </div>
          <div className=" text-xl">{product?.bottleName}</div>
          <div>SKU : {product?.bottleId}</div>

          <div className="my-8">
            <div className="text-xl">${product?.price}</div>
            <div className="flex items-center">
              <div className="text-white bg-[#10B981] px-4 py-1 rounded-xl mr-3 my-2 cursor-pointer">
                In Stock
              </div>
              <div>Quantity : {product?.availableQuantity}</div>
            </div>
          </div>

          {/* <div className="my-8">{product?.productDescription}</div> */}
          <div>Category : {product?.categoryType}</div>

          <div className="flex my-8">
            <div className="bg-[#323334] px-4 rounded-xl cursor-pointer mr-5">
              baby care
            </div>
            <div className="bg-[#323334] px-4 rounded-xl cursor-pointer">
              baby accessories
            </div>
          </div>
        </div>
      </div>
    </CustomerServiceLayout>
  );
};

export default Product;
