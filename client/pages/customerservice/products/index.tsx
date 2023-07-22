import React, { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { NextPage } from "next";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import { useRouter } from "next/router";
import CustomerServiceLayout from "layout/customer.service.layout";
import SearchProduct from "./search.product";

const Products: NextPage = () => {
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Array<any>>([]);
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect((): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/bottle`)
      .then(({ data }): void => {
        console.log(data);
        setAllProducts(data.bottles);
        setProducts(data.bottles);
      })
      .catch((err): void => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  // const handleDeleteProduct = (id: string): void => {
  //   axios
  //     .delete(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/${id}`)
  //     .then(({ data }): void => {
  //       console.log(data);
  //       toast.success(data.message);
  //       setAllProducts(allProducts.filter((item) => item.bottleId !== id));
  //     })
  //     .catch((err): void => {
  //       console.log(handleAxiosResponseError(err));
  //       toast.error(handleAxiosResponseError(err));
  //     });
  // };

  // const handlePublish = (e: ChangeEvent<HTMLInputElement>, id: string) => {
  //   const value = e.target.checked;

  //   axios
  //     .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/bottle/publish/${id}`, {
  //       published: value,
  //     })
  //     .then(({ data }) => {
  //       setProducts(
  //         products.map((item: any) =>
  //           item.bottleId === id ? { ...item, published: value } : item
  //         )
  //       );
  //       toast.success(data.message);
  //     })
  //     .catch((err) => {
  //       console.log(handleAxiosResponseError(err));
  //       toast.error(handleAxiosResponseError(err));
  //     });
  // };

  return (
    <CustomerServiceLayout title="Bottles" tab={2}>
      <div>
        <div className="p-4 flex justify-between bg-[#222328] my-5 border border-[#363434] rounded-md">
          <SearchProduct setProducts={setProducts} allProducts={allProducts} />
        </div>
        {/* End of the input bar */}

        <div className="my-2 bg-[#222328]">
          <div className="flex justify-center">
            <table className="w-full m-1 border-separate border-spacing-y-3	">
              <thead className="w-full">
                <tr className="w-full w-full bg-[#222328] p-8 border-[#9E9E9E]  rounded-md">
                  <td className="px-2 py-2">SKU</td>
                  <td className="px-2 py-2">BOTTLE NAME</td>
                  {/* <td className="px-2 py-2">CATEGORY</td> */}
                  <td className="px-2 py-2">PRICE</td>
                  <td className="px-2 py-2">STOCK</td>
                  <td className="px-2 py-2">STATUS</td>
                  {/* <td className="px-2 py-2">DISCOUNT</td> */}
                  <td className="px-2 py-2">DETAILS</td>
                  <td className="px-2 py-2">PUBLISHED</td>
                  {/* <td className="px-2 py-2">ACTIONS</td> */}
                </tr>
              </thead>

              <tbody>
                {products.map((data: any, key) => {
                  return (
                    <tr
                      className="text-sm text-[#9E9E9E] my-3 bg-[#222328]  rounded-md "
                      key={key}
                    >
                      <td className="py-2 px-2">{data?.bottleId}</td>
                      <td className="py-2 px-2">{data?.bottleName}</td>
                      {/* <td className="py-2 px-2">{data?.type}</td> */}
                      <td className="py-2 px-2">Rs. {data?.price}</td>
                      <td className="py-2 px-2">{data?.availableQuantity}</td>
                      <td className="py-2 px-2">
                        <div className="bg-green-600 py-1 px-2 rounded-full text-white text-center">
                          Selling
                        </div>
                      </td>

                      {/* <td className="py-1 px-2 text-center">
                            {data?.discount}
                          </td> */}
                      <td className="py-1 px-2 text-center">
                        <div
                          className="hover:bg-slate-600 w-8 rounded-full cursor-pointer"
                          onClick={(): Promise<boolean> =>
                            router.push(
                              "/customerservice/products/" + data?.bottleId
                            )
                          }
                        >
                          <VisibilityOutlinedIcon />
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <label
                          htmlFor={"default-toggle" + key}
                          className="inline-flex relative items-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={data.published}
                            id={"default-toggle" + key}
                            className="sr-only peer"
                            readOnly
                            // onChange={(e) => handlePublish(e, data?.bottleId)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-transparent after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-black after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CustomerServiceLayout>
  );
};

export default Products;
