import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { NextPage } from "next";
import axios from "config/axios";
import { handleAxiosResponseError } from "utils";
import OrderProductsModal from "./order.products";
import Pagination from "components/pagination";
import SearchOrder from "./order.search";
import { FaEye } from "react-icons/fa";
import AdminLayout from "layout/admin.layout";

const Order: NextPage = () => {
  // const [status, setStatus] = useState()
  const [allOrders, setAllOrders] = useState<any>([]);
  const [orderProducts, setOrderProducts] = useState<Array<any>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [orders, setOrders] = useState<Array<any>>([]);
  const [suppliers, setSuppliers] = useState<Array<any>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortOrder, SetSortOrder] = useState<string>("");
  const [orderDetail, setOrderDetail] = useState<any>();
  const [supplier, setSupplier] = useState<string>("");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/admin/orders`)
      .then(({ data }) => {
        console.log("Orders : ", data);
        setAllOrders(data.orders);
        setOrders(data.orders);
      })
      .catch((err) => {
        console.log("Error");
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/supplier`)
      .then(({ data }) => {
        console.log("Supplier : ", data);
        setSuppliers(data.suppliers);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  }, []);

  const handleStatusChange = (e: any, id: string) => {
    const value = e.target.value;

    console.log(value, id);

    axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/order/status/${id}`, {
        status: value,
      })
      .then(({ data }) => {
        console.log(data);
        setOrders((All: any) =>
          All.map((order: any): any =>
            order.orderId === id ? { ...order, orderStatus: value } : order
          )
        );
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleOrderProducts = (id: string, orderData: any) => {
    setSupplier("");
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/${id}`)
      .then(({ data }) => {
        setOrderProducts(data.bottle);
        setOrderDetail(orderData);

        if (data.supplier.length) setSupplier(data.supplier[0].adminId);
        setShowModal(!showModal);
      })
      .catch((err) => {
        console.log(handleAxiosResponseError(err));
      });
  };

  const handleModelShow = () => {
    setShowModal(!showModal);
  };

  function compareDate(a: any, b: any) {
    if (a.dateTime > b.dateTime) {
      return -1;
    }
    if (a.dateTime < b.dateTime) {
      return 1;
    }
    return 0;
  }

  function compareAmount(a: any, b: any) {
    if (a.orderTotal > b.orderTotal) {
      return -1;
    }
    if (a.orderTotal < b.orderTotal) {
      return 1;
    }
    return 0;
  }

  const handleSortOrders = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target;
    if (target) {
      const value = target.value;
      SetSortOrder(value);
      if (value === "") setOrders(allOrders);
      else if (value === "date") setOrders([...orders].sort(compareDate));
      else if (value === "amount") setOrders([...orders].sort(compareAmount));
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentOrders = useMemo(() => {
    return orders.slice(indexOfFirstPost, indexOfLastPost);
  }, [orders, indexOfFirstPost, indexOfLastPost]);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  return (
    <AdminLayout title="Orders" tab={4}>
      <div>
        <div className="p-4 flex justify-between bg-[#222328] my-5 border border-[#363434] rounded-md">
          <SearchOrder allOrders={allOrders} setOrders={setOrders} />

          <select
            className="bg-transparent col-span-2 text-sm px-4 py-1 border border-[#938E8E] rounded-md"
            value={sortOrder}
            onChange={handleSortOrders}
          >
            <option className="bg-black" value={""}>
              All
            </option>
            <option className="bg-black" value={"amount"}>
              Amount
            </option>
            <option className="bg-black" value={"date"}>
              Date
            </option>
          </select>
        </div>
        {/* End of the input bar */}

        {/* Table section */}

        <div className="overflow-x-auto relative">
          <table className="w-full text-base text-left text-gray-400">
            <thead className="text-xs uppercase bg-[#222328] text-gray-400">
              <tr>
                {/* <th scope="col" className="py-3 px-2">
                  ID
                </th> */}
                <th scope="col" className="py-3 px-2">
                  DATE
                </th>
                <th scope="col" className="py-3 px-2">
                  CUSTOMER NAME
                </th>
                <th scope="col" className="py-3 px-2">
                  SHIPPING ADDRESS
                </th>
                <th scope="col" className="py-3 px-2">
                  PHONE
                </th>
                <th scope="col" className="py-3 px-2">
                  METHOD
                </th>
                <th scope="col" className="py-3 px-2">
                  AMOUNT
                </th>
                <th scope="col" className="py-3 px-2">
                  STATUS
                </th>
                <th scope="col" className="py-3 px-2">
                  ACTION
                </th>
                <th scope="col" className="py-3 px-2">
                  DETAIL
                </th>
                {/* <th scope="col" className="py-3 px-2">
                  INVOICE
                </th> */}
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((data: any, key: number) => {
                return (
                  <tr
                    className="bg-white border-b bg-gray-900 border-gray-700"
                    key={key}
                  >
                    {/* <td
                      className="px-2 py-3 hover:bg-slate-700 rounded cursor-pointer"
                      onClick={() => handleOrderProducts(data.orderId)}
                    >
                      {data.orderId}
                    </td> */}
                    <td className="px-2 py-3">
                      {data.dateTime?.split("T")[0]}
                    </td>
                    <td className="px-2">
                      {data?.firstName + " " + data?.lastName}
                    </td>
                    <td className="px-2">{data.shippingAddress}</td>
                    <td className="px-2">{data.phone}</td>
                    <td className="px-2">Credit Card</td>
                    <td className="px-2">Rs. {data.orderTotal}</td>

                    <td className="px-2 text-left">
                      {data.orderStatus === "Processing" && (
                        <div className="rounded-xl bg-[#1054B9] text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Delivered" && (
                        <div className="rounded-xl bg-green-600 text-white py-1 text-center">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Ready" && (
                        <div className="rounded-xl bg-[#1054B9] text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Cancel" && (
                        <div className="rounded-xl bg-red-500 text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                      {data.orderStatus === "Shipped" && (
                        <div className="rounded-xl bg-green-500 text-center text-white py-1">
                          {data.orderStatus}
                        </div>
                      )}
                    </td>
                    <td className="px-2">
                      <select
                        defaultValue={data.orderStatus}
                        className="bg-black border border-[#9E9E9E] rounded-md outline-none"
                        onChange={(e) => handleStatusChange(e, data.orderId)}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Ready">Ready</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-2">
                      <FaEye
                        className="text-white h-6 w-6 hover:bg-slate-700 cursor-pointer rounded-full"
                        onClick={() => handleOrderProducts(data.orderId, data)}
                      />
                    </td>
                    {/* <td className="px-2">
                      {/* {data?.supplierInvoice ? (
                        <Link href={data?.supplierInvoice} target="_blank">
                          <a className="hover:underline" target={"_blank"}>
                            <FaDownload className="p-1 h-8 w-8 hover:bg-slate-700 cursor-pointer rounded text-white" />
                          </a>
                        </Link>
                      ) : (
                        <></>
                      )}
                      {data?.supplierInvoice ? (
                        <FaDownload
                          onClick={() => handleInvoiceModal(data)}
                          className="p-1 h-8 w-8 hover:bg-slate-700 cursor-pointer rounded text-white"
                        />
                      ) : (
                        <></>
                      )}
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={allOrders.length}
            paginateBack={paginateBack}
            paginateFront={paginateFront}
            currentPage={currentPage}
          />
        </div>

        <OrderProductsModal
          handleModelShow={handleModelShow}
          modal={showModal}
          orderProducts={orderProducts}
          orderDetail={orderDetail}
          suppliers={suppliers}
          setSupplier={setSupplier}
          supplier={supplier}
        />
      </div>
    </AdminLayout>
  );
};

export default Order;
