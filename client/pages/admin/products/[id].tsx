import React, { useEffect, useState } from "react";
import Image from "next/image";
import Adminheader from "components/Adminheader";
import Adminsidebar from "components/Adminsidebar";
import {
  // GetServerSideProps,
  // InferGetServerSidePropsType,
  NextPage,
} from "next";
import UpdateProduct from "./update.product";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { useRouter } from "next/router";
import Spinner from "components/Spinner";
import AdminLayout from "layout/admin.layout";

// type Data = {
//   status: string;
//   message: string;
//   code: string;
//   product: any;
// };

// export const getServerSideProps: GetServerSideProps = async (
//   context
// ): Promise<{
//   props: { data: Data };
// }> => {
//   const id = context.params?.id;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/bottle/${id}`
//   );
//   const data: Data = await res.json();

//   return {
//     props: {
//       data,
//     },
//   };
// };

const Product: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [product, setProduct] = useState<any>();

  // console.log(data);

  // const { bottles } = data;
  // const product = bottles[0];

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
    <AdminLayout title="Bottle Details" tab={2}>
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
            <div className="text-xl">{product?.price}</div>
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

          <button
            onClick={(): void => setSideBarDisplay(true)}
            className="px-4 rounded-lg bg-[#DBC864] w-fit text-black  py-2"
          >
            Edit Product
          </button>
        </div>

        <UpdateProduct
          product={product}
          sideBarDisplay={sideBarDisplay}
          setSideBarDisplay={setSideBarDisplay}
        />
      </div>
    </AdminLayout>
  );
};

export default Product;
